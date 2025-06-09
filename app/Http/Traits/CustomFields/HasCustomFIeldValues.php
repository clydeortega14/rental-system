<?php

namespace App\Http\Traits\CustomFields;

use App\Models\CustomField;
use App\Http\Traits\Helper;
use App\Models\CustomFieldValue;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasCustomFieldValues {

    use Helper;

    public function fields() : MorphMany
    {
        return $this->morphMany(CustomFieldValue::class, 'custom_field_valueable');
    }

    public function getFieldsWithValue()
    {
        return $this->fields()->select(
            'id', 
            'custom_field_id', 
            'type', 
            'string_answer',
            'boolean_answer',
            'decimal_answer', 
            'date_answer',
            'time_answer',
            'date_time_answer',
            'number_answer',
            
        )
        ->with('customField:id,name,label,type,slug,string_answer,boolean_answer,decimal_answer,date_answer,time_answer,number_answer')
        ->get();
    }

    protected static function booted()
    {
        static::deleting(function ($data) {
            if ($data->fields()->exists()) {
                $data->fields()->delete();
            }
        });
    }
    public function addCustomFields($customFields)
    {
        foreach ($customFields as $index => $field) {
            // if (! is_array($field)) {
            //     $field = (array)$field;
            // }

            $customField = CustomField::where('slug', $index)->first();

            $customFieldValue = [
                'type' => $customField->type,
                'custom_field_id' => $customField->id,
                $this->getCustomFieldValueKey($customField->type) => $field,
            ];

            $this->fields()->create($customFieldValue);
        }
    }

    public function updateCustomFields($customFields)
    {
        
        foreach ($customFields as $index => $field) {
            // if (! is_array($field)) {
            //     $field = (array)$field;
            // }

            $customField = CustomField::where('slug', $index)->first();
            $customFieldValue = $this->fields()->firstOrCreate([
                'custom_field_id' => $customField->id,
                'type' => $customField->type,
            ]);

            $type = $this->getCustomFieldValueKey($customField->type);
            $customFieldValue->$type = $field;
            $customFieldValue->save();
        }
    }

    public function getCustomFieldBySlug($slug)
    {
        return $this->fields()
            ->with('customField')
            ->whereHas('customField', function ($query) use ($slug) {
                $query->where('slug', $slug);
            })->first();
    }

    public function getCustomFieldValueBySlug($slug)
    {
        $value = $this->getCustomFieldBySlug($slug);

        if ($value) {
            return $value->defaultAnswer;
        }

        return null;
    }   
}