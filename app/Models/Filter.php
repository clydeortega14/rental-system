<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filter extends Model
{
    use HasFactory;

    protected $table = 'filters';

    protected $fillable = ['name'];

    public $timestamps = false;

    public function detail()
    {
        return $this->morphOne(Detailable::class, 'detailable');
    }
}
