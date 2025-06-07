<?php


namespace App\Http\Traits\CustomFields;
use App\Models\CustomField;
use App\Http\Traits\Helper;

trait HasCustomFields {

    use Helper;

    public function customFields()
    {
        return $this->morphMany(CustomField::class, 'modelable');
    }

    public function getModelLatestField()
    {
        return $this->customFields()->orderBy('order', 'desc')->first();
    }

    public function manageSequence()
    {
        $template_field = $this->getModelLatestField();

        if(is_null($template_field)) {
            $sequence = 1;
        }else{
            $template_field->sequence++;
            $sequence = $template_field->sequence;
        }

        return $sequence;
    }

    public function createCustomField($d)
    {
        // $custom_field = $this->customFields()->firstOrCreate([
        //     'name' => $this->cleanSlug($d['model_type'], $d['label']),
        //     'label' => $d['label'],
        //     'sequence' => $this->manageSequence(),
        //     'is_required' => $d['is_required'],
        //     'model_type'=> $d['model_type'],
        //     'type' => $d['type'],
        //     'slug' => $this->cleanSlug($d['model_type'], $d['label'])
        // ]);

        $custom_field = $this->customFields()->firstOrCreate($d + [
            'name' => $this->cleanSlug($d['model_type'], $d['label']),
            'order' => $this->manageSequence(),
            'slug' => $this->cleanSlug($d['model_type'], $d['label'])
        ]);

        if(array_key_exists('options', $d))
        {
            if(!is_array($d))
            {
                $fields[] = array($d);
            }

            $fields[] = $d;

            foreach($fields as $field)
            {
                $custom_field->options = $field['options'];
            }

            $custom_field->save();
        }
    }

    public function getCustomFields($model_type)
    {
        return CustomField::select(
                'id', 
                'name', 
                'label', 
                'sequence', 
                'slug', 
                'type', 
                'placeholder',
                'options', 
                'is_required'
            )
            ->where('model_type', $model_type)
            ->with(['modelable'])
            ->orderBy('sequence', 'asc')
            ->get();

    }
}