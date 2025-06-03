<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\FeedbackType;

class Feedback extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'message',
        'contact_email'
    ];
    protected $casts = [
            'type' => FeedbackType::class, // <-- THIS GOES HERE
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault([
            'name' => 'Anonymous'
        ]);
    }
}