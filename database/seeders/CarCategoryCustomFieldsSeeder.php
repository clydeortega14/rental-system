<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CarCategoryCustomFieldsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->carCategory();
    }



    public function carCategory()
    {
        $car = Category::where('name', 'cars')->first();

        if(!is_null($car))
        {
            foreach($this->carCategoryCustomFields() as $custom)
            {
                $car->createCustomField($custom);
            }
        }
    }


    public function carCategoryCustomFields()
    {
        return [

            [
                'label' => 'Car Type',
                'model_type' => 'Category',
                'type' => 'Checkbox',
                'options' => [
                    'SUV',
                    'Hatchback',
                    'Sports Car',
                    'Convertible',
                    'Minivan',
                    'Static Wagon',
                    'Sedan',
                    'MPV'
                ]
            ],
            [
                'label' => 'Transmission',
                'model_type' => 'Category',
                'type' => 'Checkbox',
                'options' => [
                    'Manual', 'Automatic'
                ]
            ],
        ];
    }
}
