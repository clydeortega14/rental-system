<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Decimal extends Model
{
    use HasFactory;

    protected $table = 'decimals';

    protected $fillable = ['value'];
}
