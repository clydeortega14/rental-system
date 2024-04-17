<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCompanyInformation extends Model
{
    use HasFactory;

    protected $fillable = [

        'id',
        'user_id',
        'email',
        'tin'

    ];

    protected $keyType = 'string';

    public $incrementing = false;
}
