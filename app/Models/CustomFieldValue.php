<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use App\Http\Traits\Helper;

class CustomFieldValue extends Model
{
    use HasFactory, Helper;

    protected $dates = [
        'date_answer',
        'date_time_answer'
    ];

    protected $guarded = ['id'];

    protected $appends = [
        'defaultAnswer',
    ];


    public function customField()
    {
        return $this->belongsTo(CustomField::class, 'custom_field_id');
    }

    public function getDefaultAnswerAttribute()
    {
        $value_type = $this->getCustomFieldValueKey($this->type);

        return $this->$value_type;
    }

    public function customFieldValueable() : MorphTo
    {
        return $this->morphTo();
    }
}
