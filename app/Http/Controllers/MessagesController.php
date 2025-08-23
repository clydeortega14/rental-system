<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Conversation;
use Inertia\Inertia;

class MessagesController extends Controller
{
    public function getConversation($senderId, $receiverId)
    {
        $conversations = Conversation::with(['messages' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }])->get();

        $conversation = $conversations->first();
        $messages = $conversation ? $conversation->messages : [];
        
        return response()->json([
            'messages' => $conversation ? $conversation->messages : [],
            'authUserId' => auth()->id(),
            'shopData' => null // Or actual shop data if needed
        ]);
    }
}
