<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Form;
use App\Models\FormType;
use App\Traits\DetailableTraits;

class FormSeeder extends Seeder
{
    use DetailableTraits;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = $this->data();

        foreach($data as $d){
            $forms = $d['forms'];
            $form_type = FormType::where('name', $d['type'])->first();

            if(!is_null($form_type)){
                

                foreach($forms as $form){

                    $name = $this->formatLabel($form['label']);

                    $create_form = Form::create(['form_type_id' => $form_type->id,'name' => $name]);

                    $this->addModelDetail($create_form, [
                        'label' => $form['label'],
                        'description' => $form['description']
                    ]);
                }
            }
        }
    }

    protected function data()
    {
        return [

            [
                'type' => 'transactional',
                'forms' => [
                    ['label' => 'Rental Information', 'description' => 'Gather information on renting an item'],
                    ['label' => 'Customer Detail', 'description' => 'Collect Customer Detail']
                ]
            ],
            [
                'type' => 'setup',
                'forms' => [

                    ['label' => 'Car Rental', 'description' => 'Rent a car form'],
                    ['label' => 'Motorcycle Rental', 'description' => 'Rent a Motorcycle form'],
                    ['label' => 'Properties Rental', 'description' => 'Rent a Properties form'],
                ],
            ],
        ];
    }
}
