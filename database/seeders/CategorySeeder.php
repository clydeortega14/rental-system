<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Traits\DetailableTraits;

class CategorySeeder extends Seeder
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

            $category = Category::create([
                'name' => $name
            ]);

            $this->addModelDetail($category, [
                'label' => $d['label'],
                'description' => $d['description']
            ]);
        }
    }

    public function data()
    {
        return [

            [
                'label' => 'Cars',
                'description' => 'For Car Rentals'
            ],
            [
                'label' => 'Hotels',
                'description' => 'For Hotel Rentals'
            ],
            [
                'label' => 'Motorcycles',
                'description' => 'For Motorcycle Rentals',
            ],
            [
                'label' => 'Phones and Bags',
                'description' => 'For Phones and Bags'
            ]
        ];
    }
}
