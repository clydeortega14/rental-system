<?php

namespace App\Http\Traits\CustomFields;

use App\Models\CustomField;
use App\Models\CustomFieldValue;
use App\Http\Traits\Helper;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Log;

trait HasCustomFieldValues
{
    use Helper;

    public function fields(): MorphMany
    {
        return $this->morphMany(CustomFieldValue::class, 'custom_field_valueable');
    }

    public function getFieldsWithValue()
    {
        return $this->fields()
            ->select(
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
            ->with('customField:id,name,label,type,slug')
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
        foreach ($customFields as $slug => $value) {
            $customField = CustomField::where('slug', $slug)->first();

            if (!$customField) {
                Log::warning("Custom field with slug '{$slug}' not found. Skipping...");
                continue;
            }

            $customFieldValue = [
                'type' => $customField->type,
                'custom_field_id' => $customField->id,
                $this->getCustomFieldValueKey($customField->type) => $value,
            ];

            $this->fields()->create($customFieldValue);
        }
    }

    public function updateCustomFields($customFields)
    {
        foreach ($customFields as $slug => $value) {
            $customField = CustomField::where('slug', $slug)->first();

            if (!$customField) {
                Log::warning("Custom field with slug '{$slug}' not found during update. Skipping...");
                continue;
            }

            $customFieldValue = $this->fields()->firstOrCreate([
                'custom_field_id' => $customField->id,
                'type' => $customField->type,
            ]);

            $typeKey = $this->getCustomFieldValueKey($customField->type);
            $customFieldValue->$typeKey = $value;
            $customFieldValue->save();
        }
    }

    public function getCustomFieldBySlug($slug)
    {
        return $this->fields()
            ->with('customField')
            ->whereHas('customField', fn($query) => $query->where('slug', $slug))
            ->first();
    }

    public function getCustomFieldValueBySlug($slug)
    {
        $value = $this->getCustomFieldBySlug($slug);

        return $value ? $value->defaultAnswer : null;
    }
}
