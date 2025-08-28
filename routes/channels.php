<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Conversation;

Broadcast::channel('conversations.{conversationId}', function ($user, $conversationId) {
    return \App\Models\Conversation::where('id', $conversationId)
        ->where(function ($q) use ($user) {
            $q->where('lessee_id', $user->id)
              ->orWhereHas('shop.lessor', fn($q) => $q->where('lessoruser_id', $user->id));
        })->exists();
});
