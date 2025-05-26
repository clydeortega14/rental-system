<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boolean extends Model
{
    use HasFactory;

    protected $table = 'booleans';

    protected $fillable = ['value'];
}
