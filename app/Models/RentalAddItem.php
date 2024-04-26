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
        'description',
        'price',
        'quantity',
        'quality',
        'thumbnail_path',
        'updated_at',
        'created_at'
    
       
    ];

    protected $keyType = 'string';

    public $incrementing = false;

   
}
