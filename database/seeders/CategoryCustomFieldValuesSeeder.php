<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RentalAddItem;
use App\Models\User;
use App\Models\Category;

class CategoryCustomFieldValuesSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('name', 'Administrator')->firstOrFail();

        $categories = [
            'vehicle' => Category::where('name', 'vehicle')->firstOrFail(),
            'residential' => Category::where('name', 'residential')->firstOrFail(),
        ];

        foreach ($this->carRentalData() as $data) {
            $this->createRentalItem($admin, $categories['vehicle'], $data);
        }

        foreach ($this->residentialRentalData() as $data) {
            $this->createRentalItem($admin, $categories['residential'], $data);
        }
    }

    protected function createRentalItem(User $user, Category $category, array $data): void
    {
        // $item = RentalAddItem::firstOrCreate([
        //     'itemName'    => $data['itemName'],
        //     'description' => $data['description'],
        //     'user_id'     => $user->id,
        //     'company_id'  => $user->company->id,
        //     'category_id' => $category->id,
        //     'price'       => $data['price'],
        //     'quantity'    => $data['quantity'] ?? 1,
        // ]);

        // if (!empty($data['custom_fields'])) {
        //     $item->addCustomFields($data['custom_fields']);
        // }
    }

    protected function carRentalData(): array
    {
        return [
            [
                'itemName' => 'Toyota Vios',
                'description' => 'The Toyota Vios is a subcompact sedan known for its practicality and fuel efficiency...',
                'price' => 1500,
                'custom_fields' => [
                    'CATEGORY_CAR_TYPE'     => 'Sedan',
                    'CATEGORY_TRANSMISSION' => 'Automatic',
                    'CATEGORY_FUEL_TYPE'    => 'Gasoline',
                    'CATEGORY_MANUFACTURER' => 'Toyota',
                    'CATEGORY_DRIVETRAIN'   => 'FWD',
                ],
            ],
            [
                'itemName' => 'Suzuki Dzire',
                'description' => 'The Suzuki Dzire is a subcompact notchback sedan manufactured since 2008...',
                'price' => 1000,
                'custom_fields' => [
                    'CATEGORY_CAR_TYPE'     => 'Sedan',
                    'CATEGORY_TRANSMISSION' => 'Automatic',
                    'CATEGORY_FUEL_TYPE'    => 'Gasoline',
                    'CATEGORY_MANUFACTURER' => 'Suzuki',
                    'CATEGORY_DRIVETRAIN'   => 'FWD',
                ],
            ],
            [
                'itemName' => 'Fortuner',
                'description' => 'The Toyota Fortuner is a mid-size SUV by Toyota since 2004...',
                'price' => 2500,
                'custom_fields' => [
                    'CATEGORY_CAR_TYPE'     => 'SUV',
                    'CATEGORY_TRANSMISSION' => 'Automatic',
                    'CATEGORY_FUEL_TYPE'    => 'Gasoline',
                    'CATEGORY_MANUFACTURER' => 'Toyota',
                    'CATEGORY_DRIVETRAIN'   => '4WD',
                ],
            ],
            [
                'itemName' => 'Toyota Avanza',
                'description' => 'The Toyota Avanza is a 3-row MPV developed by Daihatsu...',
                'price' => 3000,
                'custom_fields' => [
                    'CATEGORY_CAR_TYPE'     => 'MPV',
                    'CATEGORY_TRANSMISSION' => 'Manual',
                    'CATEGORY_FUEL_TYPE'    => 'Diesel',
                    'CATEGORY_MANUFACTURER' => 'Toyota',
                    'CATEGORY_DRIVETRAIN'   => 'RWD',
                ],
            ],
            [
                'itemName' => 'Honda Civic',
                'description' => 'The Honda Civic is a reliable compact car with sedan and hatchback styles...',
                'price' => 2000,
                'custom_fields' => [
                    'CATEGORY_CAR_TYPE'     => 'Hatchback',
                    'CATEGORY_TRANSMISSION' => 'Manual',
                    'CATEGORY_FUEL_TYPE'    => 'Diesel',
                    'CATEGORY_MANUFACTURER' => 'Honda',
                    'CATEGORY_DRIVETRAIN'   => 'FWD',
                ],
            ],
        ];
    }

    protected function residentialRentalData(): array
    {
        return [
            [
                'itemName' => 'Palm Grove APT 201',
                'description' => 'Offers cozy, affordable units in a low-rise building with convenient access to transit and schools.',
                'price' => 1500,
                'custom_fields' => [
                    'CATEGORY_RESIDENTIAL_TYPE' => 'Apartment',
                    'CATEGORY_OCCUPANCY'        => 'Private Room',
                    'CATEGORY_FURNISH'          => 'Unfurnished',
                    'CATEGORY_LEASE_TYPE'       => 'Long Term',
                ],
            ],
            [
                'itemName' => 'Skyline Vista Condo Unit 3304',
                'description' => 'A modern high-rise condominium with panoramic city views, security, fitness centers, and rooftop pool.',
                'price' => 3000,
                'custom_fields' => [
                    'CATEGORY_RESIDENTIAL_TYPE' => 'Condominium',
                    'CATEGORY_OCCUPANCY'        => 'Entire Place',
                    'CATEGORY_FURNISH'          => 'Semi-furnished',
                    'CATEGORY_LEASE_TYPE'       => 'Daily',
                ],
            ],
            [
                'itemName' => 'Maple Res Camella',
                'description' => 'Maple Town Residences offers multi-level townhouses perfect for families, with modern comfort and privacy.',
                'price' => 5000,
                'custom_fields' => [
                    'CATEGORY_RESIDENTIAL_TYPE' => 'Town House',
                    'CATEGORY_OCCUPANCY'        => 'Entire Place',
                    'CATEGORY_FURNISH'          => 'Fully Furnished',
                    'CATEGORY_LEASE_TYPE'       => 'Daily',
                ],
            ],
        ];
    }
}
