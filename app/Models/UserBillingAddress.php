<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserBillingAddress extends Model
{
    protected $table = 'user_billing_addresses';
    protected $fillable = [
        'user_id',
        'street',
        'postal_code',
        'region',
        'province',
        'city',
        'barangay',
        'country'
    ];


    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
