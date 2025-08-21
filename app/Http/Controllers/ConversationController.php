<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Shop;
use App\Models\Attachment;
use App\Models\Lessor;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Inertia\Inertia;


class ConversationController extends Controller
{
    public function store(Request $request)
    {
        // Validate nested JSON fields
        $validated = $request->validate([
            'userId'                => 'required|integer|exists:users,id',
            'rentalItem.shopId'     => 'required|integer|exists:shops,id',
            'rentalItem.name'       => 'required|string',
            'rentalItem.description'=> 'required|string',
        ]); 

        $lesseeId   = $request->input('userId');
        $shopId     = $request->input('rentalItem.shopId');
        $itemName   = $request->input('rentalItem.name');
        $itemDesc   = $request->input('rentalItem.description');

        // Check if conversation already exists
        $conversation = Conversation::firstOrCreate(
            ['shop_id' => $shopId, 'lessee_id' => $lesseeId],
            ['uuid' => Str::uuid(), 'last_message_at' => Carbon::now()]
        );

        // Always update last_message_at
        $conversation->update(['last_message_at' => Carbon::now()]);

        // Add new message for the item (even if conversation already has messages)
        Message::create([
            'conversation_id' => $conversation->id,
            'sender_id'       => $lesseeId,
            'sender_role'     => 'lessee',
            'message'         => $itemName . ' - ' . $itemDesc,
            'is_read'         => null, // leave null until read
        ]);

    }

    // public function store(Request $request)
    // {

    //      // Validate nested JSON fields
    //     $validated = $request->validate([
    //         'userId'                => 'required|integer|exists:users,id',
    //         'rentalItem.shopId'     => 'required|integer|exists:shops,id',
    //         'rentalItem.name'       => 'required|string',
    //         'rentalItem.description'=> 'required|string',
    //     ]);

    //     $lesseeId   = $request->input('userId');
    //     $shopId     = $request->input('rentalItem.shopId');
    //     $itemName   = $request->input('rentalItem.name');
    //     $itemDesc   = $request->input('rentalItem.description');

    //     // Check if conversation already exists
    //     $conversation = Conversation::where('shop_id', $shopId)
    //         ->where('lessee_id', $lesseeId)
    //         ->first();

    //       if (!$conversation) {
    //         $conversation = Conversation::create([
    //             'uuid'            => Str::uuid(),
    //             'shop_id'         => $shopId,
    //             'lessee_id'       => $lesseeId,
    //             'last_message_at' => Carbon::now(),
    //         ]);
    //     } else {
    //         $conversation->update([
    //             'last_message_at' => Carbon::now(),
    //         ]);
    //     }

        
    //     // If no messages yet, create the first one
    //     if ($conversation->messages()->count() === 0) {
    //         Message::create([
    //             'conversation_id' => $conversation->id,
    //             'sender_id'       => $lesseeId,
    //             'sender_role'     => 'lessee',
    //             'message'         => $itemName . ' - ' . $itemDesc,
    //             'is_read'         => Carbon::now()  ,
    //         ]);
    //     }

    //     // return response()->json([
    //     //     'success'      => true,
    //     //     'conversation' => $conversation->load('messages'),
    //     //     'message'      => 'Conversation created/updated successfully with first message.',
    //     // ]);
    //     // return Inertia::location(route('lessee.profile', ['tab' => 'lessorInquiries']));
    // }
    public function getUserConversations(Request $request)
    {
        $userId = $request->user()->id; // logged-in user ID
        $lessor = Lessor::where('lessoruser_id', $userId)->first();

        if (!$lessor) {
            $conversations = Conversation::with([
                'messages' => fn($q) => $q->latest()->with('attachments'), // latest messages first
                'shop',
                'lessee'
            ])
            ->where('lessee_id', $userId)
            ->latest('last_message_at')
            ->get()
            ->map(function ($conversation) {
                // get latest message model safely
                $latestMessageModel = $conversation->messages->first();

                return [
                    'id'              => $conversation->id,
                    'uuid'            => $conversation->uuid,
                    'shop'            => $conversation->shop->name,
                    'shopId'          => $conversation->shop->id,
                    'last_message_at' => $conversation->last_message_at,

                    // return messages collection transformed into array
                    'messages' => $conversation->messages->map(function ($msg) {
                        return [
                            'id'          => $msg->id,
                            'sender_id'   => $msg->sender_id,
                            'sender_role' => $msg->sender_role,
                            'message'     => $msg->message,
                            'is_read'     => $msg->is_read,
                            'created_at'  => $msg->created_at,
                            'attachments' => $msg->attachments->map(function ($att) {
                                    return [
                                        'id'       => $att->id,
                                        'display_name'=> $att->display_name,
                                        'storage_disk'=> $att->storage_disk,
                                        'path'      => $att->path,   // assuming you store file path
                                        'type'     => $att->type,  // e.g., image/pdf/video
                                        'filename' => $att->filename,
                                    ];
                            }),
                        ];
                    }),
                    // just take the latest message text
                    'latest_message' => $latestMessageModel ? $latestMessageModel->message : null,
                ];
            });
           
            return response()->json([
                'success' => true,
                'conversations' => $conversations,
            ]);
        }
        else{

            $shopIds = \App\Models\Shop::whereHas('lessor', function ($query) use ($userId) {
                        $query->where('lessoruser_id', $userId);
                    })->pluck('id');

           
            $conversations = \App\Models\Conversation::with([
                    'messages' => fn($q) => $q->latest()->with('attachments'), // latest first
                    'lessee', // fetch user info of sender
                    'shop'
                ])
                ->whereIn('shop_id', $shopIds)
                ->latest('last_message_at')
                ->get()
                ->map(function ($conversation) {
                    $latestMessage = $conversation->messages->first();

                    return [
                        'id'              => $conversation->id,
                        'uuid'            => $conversation->uuid,
                        'shop'            => $conversation->shop->name,
                        'shopId'          => $conversation->shop->id,
                        'lessee'          => $conversation->lessee ? [
                            'id'    => $conversation->lessee->id,
                            'name'  => $conversation->lessee->name,
                            'email' => $conversation->lessee->email,
                        ] : null,
                        'last_message_at' => $conversation->last_message_at,

                        // map all messages
                        'messages' => $conversation->messages->map(function ($msg) {
                            return [
                                'id'          => $msg->id,
                                'sender_id'   => $msg->sender_id,
                                'sender_role' => $msg->sender_role,
                                'message'     => $msg->message,
                                'is_read'     => $msg->is_read,
                                'created_at'  => $msg->created_at,
                                'attachments' => $msg->attachments->map(function ($att) {
                                    return [
                                        'id'       => $att->id,
                                        'display_name'=> $att->display_name,
                                        'storage_disk'=> $att->storage_disk,
                                        'path'      => $att->path,   // assuming you store file path
                                        'type'     => $att->type,  // e.g., image/pdf/video
                                        'filename' => $att->filename,
                                    ];
                                }),
                            ];
                        }),
                        'latest_message' => $latestMessage ? $latestMessage->message : null,
                        'latest_sender'  => $latestMessage ? $latestMessage->sender_role : null,
                    ];
                });
           
            return response()->json([
                'success' => true,
                'conversations' => $conversations,
            ]);
        }
        
    }
    public function storeLesseeMessage(Request $request)
    {
       
        $validated = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'sender_id'       => 'required|exists:users,id',
            'sender_role'     => 'required|in:lessee,lessor',
            'message'         => 'nullable|string',
            'type'            => 'required|in:text,image,pdf',
            'file'            => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $userId = $request->user()->id; // logged-in user ID
        $lessor = Lessor::where('lessoruser_id', $userId)->first();
       
        if (!$lessor) {
            // Allow NULL or empty string when only sending an attachment
            $messageText = $validated['message'] ?? null;
            if ($request->hasFile('file') && empty($messageText)) {
                $messageText = null; // ensure it's stored as NULL in DB
            }

            $message = Message::create([
                'conversation_id' => $validated['conversation_id'],
                'sender_id'       => $validated['sender_id'],
                'sender_role'     => $validated['sender_role'],
                'message'         => $messageText, // this can be null
                'type'            => $validated['type'],
                'has_attachment'  => false,
                'is_read'         => null,
            ]);

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filePath = $file->store('messages', 'public');

                Attachment::create([
                    'attachable_type' => Message::class,
                    'attachable_id'   => $message->id,
                    'display_name'    => $file->getClientOriginalName(),
                    'filename'        => pathinfo($file->hashName(), PATHINFO_FILENAME),
                    'path'            => $filePath,
                    'storage_disk'    => 'public',
                    'type'            => $file->extension(),
                    'size'            => $file->getSize(),
                    'size_type'       => 'bytes',
                ]);

                // update message record
                $message->update([
                    'has_attachment' => true,
                    // store original filename as message so conversation preview works
                    'message'        => $file->getClientOriginalName(),
                ]);
            }

            // update conversation
            $conversation = Conversation::find($validated['conversation_id']);
            $conversation->update([
                'latest_message'  => $message->message ?? '📎 Attachment',
                'last_message_at' => now(),
            ]);
        }else{
            // Allow NULL or empty string when only sending an attachment
            $messageText = $validated['message'] ?? null;
            if ($request->hasFile('file') && empty($messageText)) {
                $messageText = null; // ensure it's stored as NULL in DB
            }

            $message = Message::create([
                'conversation_id' => $validated['conversation_id'],
                'sender_id'       => $validated['sender_id'],
                'sender_role'     => "lessor",
                'message'         => $messageText, // this can be null
                'type'            => $validated['type'],
                'has_attachment'  => false,
                'is_read'         => null,
            ]);

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filePath = $file->store('messages', 'public');

                Attachment::create([
                    'attachable_type' => Message::class,
                    'attachable_id'   => $message->id,
                    'display_name'    => $file->getClientOriginalName(),
                    'filename'        => pathinfo($file->hashName(), PATHINFO_FILENAME),
                    'path'            => $filePath,
                    'storage_disk'    => 'public',
                    'type'            => $file->extension(),
                    'size'            => $file->getSize(),
                    'size_type'       => 'bytes',
                ]);

                // update message record
                $message->update([
                    'has_attachment' => true,
                    // store original filename as message so conversation preview works
                    'message'        => $file->getClientOriginalName(),
                ]);
            }

            // update conversation
            $conversation = Conversation::find($validated['conversation_id']);
            $conversation->update([
                'latest_message'  => $message->message ?? '📎 Attachment',
                'last_message_at' => now(),
            ]);
        }
        
    }
    // public function markRead($conversationId, $userId)
    // {
    //     $conversation = Conversation::findOrFail($conversationId);
       
    //     $currentRole = $conversation->lessee_id == $userId ? 'lessee' : 'lessor';
    //     // Update unread messages for the opposite role
    //     $data = $updatedMessages = Message::where('conversation_id', $conversationId)
    //         ->where('sender_id', '!=', $userId)
    //         ->where('sender_role', '!=', $currentRole)
    //         ->where('is_read', 0)
    //         ->get();
       
    //     // Mark them as read
    //     $updatedMessages->each(function ($msg) {
    //         $msg->is_read = 1;
    //         $msg->save();
    //     });
      
    //     // Fetch all conversations for the user after updating
    //     $conversations = Conversation::with(['messages' => function($q) {
    //             $q->latest();
    //         }, 'lessee', 'shop'])
    //         ->get();

    //     return Inertia::render('LessorInquiries', [
    //         'conversations' => $conversations,
    //     ]);
    // }
}
