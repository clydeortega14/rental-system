<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Support\Facades\Log;

class MessageSent implements ShouldBroadcastNow
{
    use SerializesModels;

    public $conversationId;
    public $message;

    public function __construct($conversationId, $message)
    {
        $this->conversationId = $conversationId;
        $this->message = $message;

        // Log the event creation
        Log::info('MessageSent event constructed', [
            'conversation_id' => $conversationId,
            'message_id' => $message->id ?? null,
            'message' => $message->message ?? null,
            'sender_id' => $message->sender_id ?? null,
            'sender_role' => $message->sender_role ?? null,
        ]);
    }

    public function broadcastOn()
    {
        // Log the channel broadcasting
        Log::info('MessageSent event broadcasting', [
            'channel' => 'conversations.' . $this->conversationId,
        ]);

        return new PrivateChannel('conversations.' . $this->conversationId);
    }
}
