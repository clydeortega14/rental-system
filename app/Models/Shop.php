<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'lessor_id',
        'name',
        'description',
        'location',
    ];

    public function lessor()
    {
        return $this->belongsTo(Lessor::class);
    }

    public function rentalItems()
    {
        return $this->hasMany(RentalAddItem::class, 'shop_id');
    }
}
