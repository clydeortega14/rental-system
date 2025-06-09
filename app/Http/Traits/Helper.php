<?php

namespace App\Http\Traits;
use Illuminate\Support\Str;
use App\Models\CustomField;

trait Helper {

    public function cleanSlug($model, $title, $id = 0)
    {
        // Normalize the title
        $slug = Str::upper($model.'_'.Str::slug($title, '_'));

        // Get any that could possibly be related.
        // This cuts the queries down by doing it once.
        $allSlugs = $this->relatedSlug($model, $slug, $id);

        // If we haven't used it before then we are all good.
        if (! $allSlugs->contains('slug', $slug)) {
            return $slug;
        }

        // Just append numbers like a savage until we find not used.
        for ($i = 1; $i <= 10; $i++) {
            $newSlug = $slug.'_'.$i;
            if (! $allSlugs->contains('slug', $newSlug)) {
                return $newSlug;
            }
        }

        throw new \Exception('Can not create a unique slug');
    }

    public function relatedSlug($type, $slug, $id=0)
    {
        return CustomField::select('slug')->where('slug', 'like', $slug.'%')
        ->where('model_type', $type)
        ->where('id', '<>', $id)
        ->get();
    }

    /**
     * @param string $type
     * @return string
     */
    public function getCustomFieldValueKey(string $type)
    {
        switch ($type) {
            case 'Input':
                return 'string_answer';

            case 'TextArea':
                return 'string_answer';

            case 'Phone':
                return 'number_answer';

            case 'Url':
                return 'string_answer';

            case 'Number':
                return 'number_answer';

            case 'Dropdown':
                return 'string_answer';

            case 'Switch':
                return 'boolean_answer';

            case 'Date':
                return 'date_answer';

            case 'Time':
                return 'time_answer';

            case 'DateTime':
                return 'date_time_answer';

            default:
                return 'string_answer';
        }
    }
}