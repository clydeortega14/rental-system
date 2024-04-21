<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class UserContactDetail extends Model
{
    use HasFactory, Uuid;

    protected $fillable = [

        'id',
        'user_id',
        'telephone',
        'mobile'

    ];

    protected $keyType = 'string';

    public $incrementing = false;
}
