<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TemplateCategory extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'service_fee',
        'mode_of_payment',
        'pricing_duration',
    ];

     protected $casts = [
        'mode_of_payment' => 'array',
        'pricing_duration' => 'array',
    ];
}
