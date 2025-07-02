<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\Uuid;

class Payment extends Model
{
    use Uuid;
    
    protected $table = 'payments';

    protected $fillable = [
        'user_card_detail_id',
        'uuid',
        'rental_listing_id',
        'amount',
        'status'
    ];

    public function userCardDetail():BelongsTo
    {
        return $this->belongsTo(UserCardDetail::class);
    }
    
    public function rentalListing():BelongsTo
    {
        return $this->belongsTo(RentalAddItem::class);
    }
}
