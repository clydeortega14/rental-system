<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Traits\DetailableTraits;

class CategorySeeder extends Seeder
{
    use DetailableTraits;

    public function run(): void
    {
        $data = $this->data();

        foreach($data as $d){
            $name = $this->formatLabel($d['label']);

            $category = Category::create([
                'name' => $name,
                'status' => $d['status'] ?? 'active', // Add default status
                'service_fee' => $d['service_fee'] ?? 0.0 // Add default service fee
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
                'label' => 'vehicle',
                'description' => 'For Vehicles Rentals',
                'status' => 'active',
                'service_fee' => 10.0
            ],
            [
                'label' => 'residential',
                'description' => 'For Residential Rentals',
                'status' => 'active',
                'service_fee' => 5.0
            ],
            [
                'label' => 'event',
                'description' => 'For Event and Party Rentals',
                'status' => 'active',
                'service_fee' => 7.5
            ],
            [
                'label' => 'digital devices',
                'description' => 'For Electronics and Technology Rentals',
                'status' => 'active',
                'service_fee' => 3.0
            ]
        ];
    }
}