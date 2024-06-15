<?php


namespace App\Traits;

trait DetailableTraits {

    public function formatLabel($string)
    {
        // remove special character and replace spaces with hyphen
        $sanitize = preg_replace('/[^A-Za-z0-9-]/', '', str_replace(' ', '-', $string));

        // remove multipe consecutive dot(.)
        $clean_string = preg_replace('/-{2,}/', '-', $sanitize);

        // format string
        return strtolower($clean_string);

    }

    public function addModelDetail($model, array $data)
    {
        $model->detail()->create([
            'label' => $data['label'],
            'description' => $data['description'],
        ]);
    }
}