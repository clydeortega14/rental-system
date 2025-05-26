<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormFieldValueable extends Model
{
    use HasFactory;

    protected $table = 'form_field_valueables';

    protected $fillable = [
        'form_id',
        'form_field_id',
        'fieldable_id',
        'fieldable_type',
        'valueable_type',
        'valueable_id',
        'stored_by'
    ];

    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    public function formField()
    {
        return $this->belongsTo(FormField::class);
    }

    public function storeBy()
    {
        return $this->belongsTo(User::class, 'stored_by');
    }

    public function fieldable()
    {
        return $this->morphTo();
    }

    public function valueable()
    {
        return $this->morphTo();
    }
}
