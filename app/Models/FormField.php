<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class FormField extends Model
{
    use HasFactory, Uuid;

    protected $table = 'form_fields';

    protected $fillable = ['label', 'name', 'form_id', 'data_type_id', 'field_type_id', 'size', 'sequence'];

    public $timestamps = false;

    public function detail() : MorphOne
    {
        return $this->morphOne(Detailable::class, 'detailable');
    }
}
