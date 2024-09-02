<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class DataType extends Model
{
    use HasFactory;

    protected $table = 'data_types';

    protected $fillable = ['name'];

    public $timestamps = false;

    public function detail() : MorphOne
    {
        return $this->morphOne(Detailable::class, 'detailable');
    }
}
