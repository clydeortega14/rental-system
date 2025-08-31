<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'conversation_id',
        'sender_id',
        'sender_role',
        'message',
        'is_read',
        'has_attachment',
    ];

    protected $casts = [
        'is_read' => 'datetime', // since DB is timestamp
    ];

    /**
     * A message belongs to a conversation
     */
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    /**
     * A message belongs to a sender (User)
     */
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
    public function hasAttachments(): bool
    {
        return $this->attachments()->exists();
    }
}
