<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Http\Traits\Helper;

class CategoryCustomFieldsSeeder extends Seeder
{
    use Helper;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedCustomFieldsForCategory('vehicle', $this->carCategoryCustomFields());
        $this->seedCustomFieldsForCategory('residential', $this->residentialCategoryCustomFields());
    }

    /**
     * Attach custom fields to a category by name.
     */
    protected function seedCustomFieldsForCategory(string $categoryName, array $customFields): void
    {
        $category = Category::where('name', $categoryName)->first();

        if ($category) {
            foreach ($customFields as $field) {
                $category->createCustomField($field);
            }
        }
    }

    /**
     * Vehicle category custom fields.
     */
    protected function carCategoryCustomFields(): array
    {
        return [
            $this->makeField('Vehicle Type', [
                'Sedan', 'SUV', 'Truck', 'Van', 'Coupe', 'Convertible',
                'Motorcycle', 'Pickup', 'Hatchback', 'Wagon', 'Bus',
                'Minivan', 'Electric Vehicle', 'Hybrid', 'Trailer', 'Commercial', 'Off-road'
            ], 'CATEGORY_CAR_TYPE'),
            $this->makeField('Transmission', ['Manual', 'Automatic'], 'CATEGORY_TRANSMISSION'),
            $this->makeField('Fuel', ['Gasoline', 'Diesel', 'Electric'], 'CATEGORY_FUEL_TYPE'),
            $this->makeField('Manufacturer', ['Toyota', 'Honda', 'Tesla', 'Suzuki', 'Isuzu', 'Nissan'], 'CATEGORY_MANUFACTURER'),
            $this->makeField('Drivetrain', ['FWD', 'RWD', 'AWD', '4WD'], 'CATEGORY_DRIVETRAIN'),
        ];
    }

    /**
     * Residential category custom fields.
     */
    protected function residentialCategoryCustomFields(): array
    {
        return [
            $this->makeField('Residential Type', [
                'House', 'Apartment', 'Condominium', 'Town House', 'Duplex', 'Studio'
            ], 'CATEGORY_RESIDENTIAL_TYPE'),
            $this->makeField('Occupancy', ['Entire Place', 'Private Room', 'Shared Room'], 'CATEGORY_OCCUPANCY'),
            $this->makeField('Furnish Type', ['Semi-furnished', 'Fully Furnished', 'Unfurnished'], 'CATEGORY_FURNISH'),
            $this->makeField('Lease Type', ['Daily', 'Weekly', 'Monthly', 'Short Term', 'Long Term'], 'CATEGORY_LEASE_TYPE'),
        ];
    }

    /**
     * Helper method to build a custom field definition.
     */
    protected function makeField(string $label, array $options): array
    {
        // $slug = strtolower('category_' . str_replace(' ', '_', $label)); // or use cleanSlug helper
        $slug = $this->cleanSlug('Category', $label);
        return [
            'label' => $label,
            'model_type' => 'Category',
            'type' => 'Checkbox',
            'options' => $options,
            'slug' => $slug,
        ];
    }
}
