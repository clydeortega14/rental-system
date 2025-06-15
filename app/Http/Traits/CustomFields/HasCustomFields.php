<?php

namespace App\Http\Traits\CustomFields;

use App\Models\CustomField;
use App\Http\Traits\Helper;

trait HasCustomFields
{
    use Helper;

    public function customFields()
    {
        return $this->morphMany(CustomField::class, 'modelable');
    }

    public function getModelLatestField()
    {
        return $this->customFields()->orderBy('order', 'desc')->first();
    }

    public function manageSequence(): int
    {
        $lastField = $this->getModelLatestField();
        return $lastField ? $lastField->order + 1 : 1;
    }

    public function createCustomField(array $d)
    {
        // Use the passed slug if available, otherwise generate it
        $slug = $d['slug'] ?? $this->cleanSlug($d['model_type'], $d['label']);

        $custom_field = $this->customFields()->firstOrCreate(
            ['slug' => $slug],
            [
                'name'        => $slug,
                'label'       => $d['label'],
                'order'       => $this->manageSequence(),
                'model_type'  => $d['model_type'],
                'type'        => $d['type'],
                'is_required' => $d['is_required'] ?? false,
            ]
        );

        if (!empty($d['options']) && is_array($d['options'])) {
            $custom_field->options = $d['options'];
            $custom_field->save();
        }
    }

    public function getCustomFields(string $model_type)
    {
        return $this->customFields()
            ->select(
                'id',
                'name',
                'label',
                'order',
                'slug',
                'type',
                'placeholder',
                'options',
                'is_required'
            )
            ->where('model_type', $model_type)
            ->with(['modelable'])
            ->orderBy('order', 'asc')
            ->get();
    }
}
