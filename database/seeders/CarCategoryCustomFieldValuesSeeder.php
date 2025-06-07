<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RentalAddItem;
use App\Models\User;
use App\Models\Category;

class CarCategoryCustomFieldValuesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach($this->data() as $d)
        {

            $admin = User::where('name', 'Administrator')->first();

            if(is_null($admin)) 
            {
                throw new Exception("User not found!", 404);
                
            }

            $car_category = Category::where('name', 'cars')->first();

            if(is_null($car_category)) 
            {
                throw new Exception("Category not found!", 404);
                
            }

           
            $item = RentalAddItem::firstOrCreate([
                'itemName' => $d['itemName'], 
                'description' => $d['Description'],
                'user_id' => $admin->id,
                'category_id' => $car_category->id,
                'price' => $d['price'],
                'quantity' => array_key_exists('quantity', $d) ?? 1
            ]);
            
            if(array_key_exists('custom_fields', $d))
            {
                $item->addCustomFields($d['custom_fields']);
            }
        }
    }

    public function data()
    {
        return [

            [
                'itemName' => 'Toyota Vios', 
                'Description' => 'The Toyota Vios is a subcompact sedan known for its practicality and fuel efficiency, often used in urban areas and popular in Southeast Asia and China.',
                'price' => 1500,
                'custom_fields' => [
                    'CATEGORY_CAR_TYPE' => 'Sedan',
                    'CATEGORY_TRANSMISSION' => 'Automatic'
                ]
            ],
            [
                'itemName' => 'Suzuki Dzire', 
                'Description' => 'The Suzuki Dzire is a subcompact notchback sedan manufactured and marketed by Suzuki since 2008, primarily for India',
                'price' => 1000,
                'custom_fields' => [
                    'CATEGORY_CAR_TYPE' => 'Sedan',
                    'CATEGORY_TRANSMISSION' => 'Automatic'
                ]
            ],
            [
                'itemName' => 'Fortuner', 
                'Description' => 'The Toyota Fortuner, also known as the Toyota SW4, is a mid-size SUV manufactured by the Japanese automaker Toyota since 2004',
                'price' => 2500,
                'custom_fields' => [
                    'CATEGORY_CAR_TYPE' => 'SUV',
                    'CATEGORY_TRANSMISSION' => 'Automatic'
                ]
            ],
            [
                'itemName' => 'Toyota Avanza', 
                'Description' => 'The Toyota Avanza and Daihatsu Xenia are a series of multi-purpose vehicles (MPV) developed by Daihatsu and marketed by both Toyota and Daihatsu, mainly sold with three-row seating',
                'price' => 3000,
                'custom_fields' => [
                    'CATEGORY_CAR_TYPE' => 'MPV',
                    'CATEGORY_TRANSMISSION' => 'Manual'
                ]
            ],
            [
                'itemName' => 'Honda Civic', 
                'Description' => 'The Honda Civic is a popular and reliable compact car available in various trims and body styles, including sedan and hatchback.',
                'price' => 2000,
                'custom_fields' => [
                    'CATEGORY_CAR_TYPE' => 'Hatchback',
                    'CATEGORY_TRANSMISSION' => 'Manual'
                ]
            ],
        ];
    }
}
