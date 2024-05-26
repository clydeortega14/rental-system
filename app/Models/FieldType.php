<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class FieldType extends Model
{
    use HasFactory, Uuid;

    protected $table = 'field_types';

    public function detail() : MorphOne
    {
        return $this->morphOne(Detailable::class, 'detailable');
    }
}
