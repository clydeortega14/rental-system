<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Biginteger extends Model
{
    use HasFactory;

    protected $table = 'bigintegers';

    protected $fillable = ['value'];
}
