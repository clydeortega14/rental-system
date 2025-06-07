<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentalItem extends Model
{
    use HasFactory; // This connects to your factory
    protected $table = 'rental_items'; 
    protected $fillable = [
        'name',
        'description', 
        'price',
        'user_id',
        'category',
        // Add other fields from your existing table
    ];
    public static $validationRules = [
        'specifications' => 'nullable|array',
        'specifications.color' => 'sometimes|string'
    ];

    // If your table name isn't the Laravel default (rental_items)
    protected $casts = [
    'specifications' => 'json' // Converts array to JSON string automatically
];
}
