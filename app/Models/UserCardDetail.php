<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserCardDetail extends Model
{
    protected $table = 'user_card_details';

    protected $fillable = [
        'user_id',
        'card_number',
        'card_expiry',
        'card_cvv'
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'user_card_detail_id');
    }
}
