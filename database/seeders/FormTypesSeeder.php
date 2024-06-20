<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FormType;
use App\Traits\DetailableTraits;

class FormTypesSeeder extends Seeder
{
    use DetailableTraits;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = $this->data();

        foreach($data as $d){

            $name = $this->formatLabel($d['label']);

            $form_type = FormType::create(['name' => $name]);

            $this->addModelDetail($form_type, [
                'label' => $d['label'],
                'description' => $d['description']
            ]);
        }
    }

    public function data()
    {
        return [

            [
                'label' => 'Transactional',
                'description' => 'Form for transactions'
            ],
            [
                'label' => 'Setup',
                'description' => 'Form for setup'
            ]
        ];
    }
}
