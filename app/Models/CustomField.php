<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\Helper;
use App\Http\Traits\CustomFields\HasCustomField;

class CustomField extends Model
{
    use HasFactory, Helper;

    protected $guarded = [
        'id'
    ];

    protected $dates = [
        'date_answer',
        'date_time_answer'
    ];

    protected $appends = [
        'defaultAnswer',
    ];

    protected $casts = [
        'options' => 'array',
    ];

    public function getDefaultAnswerAttribute()
    {
        $value_type = $this->getCustomFieldValueKey($this->type);

        return $this->$value_type;
    }

    public function setTimeAnswerAttribute($value)
    {
        if($value && !is_null($value))
        {
            return $this->attribute['time_answer'] = date('H:i:s', strtotime($value));
        }
    }

    public function modelable()
    {
        return $this->morphTo();
    }
}
