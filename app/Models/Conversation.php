<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'shop_id',
        'lessee_id',
        'last_message_at',
    ];

    protected static function boot()
    {
        parent::boot();

        // Auto-generate UUID
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    /**
     * Conversation belongs to a Shop
     */
    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    /**
     * Conversation belongs to a Lessee (user who wants to rent)
     */
    public function lessee()
    {
        return $this->belongsTo(User::class, 'lessee_id');
    }

    /**
     * A conversation has many messages
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    /**
     * Shortcut: get the lessor through the shop
     */
    public function lessor()
    {
        return $this->shop->lessor();
    }
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
    
}
