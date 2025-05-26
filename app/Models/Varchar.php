<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Varchar extends Model
{
    use HasFactory;

    protected $table = 'varchars';

    protected $fillable = ['value'];
}
