<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RentalPricing extends Model
{
    protected $table = 'rental_pricings';
    protected $fillable = ['rental_item_id', 'price_per_unit', 'price_unit', 'security_deposit', 'currency'];
    public $timestamps = false;

    public function rentalItem()
    {
        return $this->belongsTo(RentalAddItem::class, 'rental_item_id');
    }
}
