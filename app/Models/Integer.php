<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Integer extends Model
{
    use HasFactory;

    protected $table = 'integers';

    protected $fillable = ['value'];
}
