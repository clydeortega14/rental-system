<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;


class RentalAddItem extends Model
{
    use HasFactory, Uuid;

    protected $table = 'rental_listings';

    protected $fillable = [
        'id',
        'user_id', 
        'itemID', 
        'itemName', 
        'category',
        'description',
        'price',
        'quantity',
        'quality',
        'image',
        'updated_at',
        'created_at'
    
       
    ];

    protected $keyType = 'string';

    public $incrementing = false;

   
}
