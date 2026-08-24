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

            $category = Category::firstOrCreate(['id' => $d['id']],
                [
                    'name' => $name,
                    'description' => $d['label']
                ]
            );

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
                'id' => 1,
                'label' => 'Car',
                'description' => 'Car Rentals'
            ],
            [
                'id' => 2,
                'label' => 'Property',
                'description' => 'Property Rentals'
            ],
            [
                'id' => 3,
                'label' => 'Item',
                'description' => 'Item Rentals',
            ],
        ];
    }
}
