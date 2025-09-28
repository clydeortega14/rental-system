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
use App\Events\MessageSent;


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
    public function getUserConversations(Request $request)
    {
        $userId = $request->user()->id;
        $lessor = Lessor::where('lessoruser_id', $userId)->first();

        // Determine the base query depending on user type
        if ($lessor) {
            $shopIds = Shop::whereHas('lessor', fn($q) => $q->where('lessoruser_id', $userId))->pluck('id');
            $query = Conversation::with([
                'messages' => fn($q) => $q->latest()->with('attachments'),
                'lessee',
                'shop'
            ])->whereIn('shop_id', $shopIds);
        } else {
            $query = Conversation::with([
                'messages' => fn($q) => $q->latest()->with('attachments'),
                'shop',
                'lessee'
            ])->where('lessee_id', $userId);
        }

        $conversations = $query->latest('last_message_at')->get()->map(function ($conversation) use ($userId) {
            $latestMessage = $conversation->messages->first();
             $lessorOwnsShop = optional($conversation->shop->lessor)->lessoruser_id === $userId;

            
            return [
                'id'              => $conversation->id,
                'uuid'            => $conversation->uuid,
                'shop'            => $conversation->shop->name ?? null,
                'shopId'          => $conversation->shop->id ?? null,
                'shopLocation'    => $conversation->shop->location ?? null,
                'is_owned_by_user'    => $lessorOwnsShop,
                'lessee'          => $conversation->lessee ? [
                    'id'    => $conversation->lessee->id,
                    'name'  => $conversation->lessee->name,
                    'email' => $conversation->lessee->email,
                ] : null,
                'last_message_at' => $conversation->last_message_at,
                'messages'        => $conversation->messages->map(fn($msg) => [
                    'id'          => $msg->id,
                    'sender_id'   => $msg->sender_id,
                    'sender_role' => $msg->sender_role,
                    'message'     => $msg->message,
                    'is_read'     => $msg->is_read,
                    'created_at'  => $msg->created_at,
                    'attachments' => $msg->attachments->map(fn($att) => [
                        'id'          => $att->id,
                        'display_name'=> $att->display_name,
                        'storage_disk'=> $att->storage_disk,
                        'path'        => $att->path,
                        'type'        => $att->type,
                        'filename'    => $att->filename,
                    ]),
                ]),
                'latest_message' => $latestMessage ? $latestMessage->message : null,
                'latest_sender'  => $latestMessage ? $latestMessage->sender_role : null,
                'lessor_id'      => $latestMessage ? $latestMessage->sender_id : null,
            ];
        });

        return response()->json([
            'success'       => true,
            'conversations' => $conversations,
        ]);
    }

    public function storeMessageSent(Request $request)
    {
  
        $validated = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'sender_id'       => 'required|exists:users,id',
            'sender_role'     => 'required|in:lessee,lessor',
            'message'         => 'nullable|string',
            'type'            => 'required|in:text,image,pdf',
            'file'            => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $userId = $request->user()->id;

        // Determine sender role
        $lessor = Lessor::where('lessoruser_id', $userId)->first();
        $senderRole = $lessor ? 'lessor' : $validated['sender_role'];

        // Use message text or null for attachments-only
        $messageText = $validated['message'] ?? null;

        // Create the message
        $message = Message::create([
            'conversation_id' => $validated['conversation_id'],
            'sender_id'       => $validated['sender_id'],
            'sender_role'     => $senderRole,
            'message'         => $messageText,
            'type'            => $validated['type'],
            'has_attachment'  => false,
            'is_read'         => null,
        ]);

        // Handle file attachment
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

            $message->update([
                'has_attachment' => true,
                'message'        => $file->getClientOriginalName(),
            ]);
        }
        $conversation = Conversation::find($validated['conversation_id']);
        $conversation->update([
            'latest_message'  => $message->message ?? '📎 Attachment',
            'last_message_at' => now(),
        ]);

       broadcast(new MessageSent($conversation->id, $message))->toOthers();
    }
}
