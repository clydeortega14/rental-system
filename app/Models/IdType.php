<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class IdType extends Model
{
    use HasFactory, Uuid;

    protected $table = 'id_types';

    public $timestamps = false;

    protected $fillable = ['name'];

    public function detail() : MorphOne
    {
        return $this->morphOne(Detailable::class, 'detailable');
    }
}
