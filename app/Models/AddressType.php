<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AddressType extends Model
{
    protected $table = 'address_types';
    protected $fillable = ['name'];
    public $timestamps = false;
}
