<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Filter;
use App\Models\FilterChoice;
use App\Traits\DetailableTraits;

class CategoryFiltersSeeder extends Seeder
{
    use DetailableTraits;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = $this->findCategory();

        if(is_null($category)) throw new Exception("Category not found", 404);

        $filter = $this->createFilter();

        if(is_null($filter)) throw new Exception("Filter not found", 404);

        // add choices to filter
        $this->addChoicesToFilter($filter);

        // add filters to category
        $this->attachFilterToCategory($category, $filter->id);
    }


    public function findCategory()
    {
        return Category::where('name', 'cars')->first();
    }

    public function createFilter()
    {
        $filter =  Filter::firstOrCreate([
            'name' => $this->formatLabel('Car Type')
        ]);

        $this->addModelDetail($filter, [
            'label' => $filter->name,
            'description' => $filter->name
        ]);

        return $filter;
    }

    public function addChoicesToFilter(Filter $filter)
    {
        $choices = [
            ['name' => 'SUV'],
            ['name' => 'Hatchback'],
            ['name' => 'Sports Car'],
            ['name' => 'Convertible'],
            ['name' => 'Minivan'],
            ['name' => 'Station Wagon'],
            ['name' => 'Coupe'],
            ['name' => 'Sedan'],
            ['name' => 'Pickup Truck'],
            ['name' => 'Electric Vehicle'],
            ['name' => 'Crossover'],
        ];

        foreach($choices as $choice)
        {
            $name = $this->formatLabel($choice['name']);

            $filter_choice = $filter->choices()->firstOrCreate([
                'name' => $name
            ]);

            $this->addModelDetail($filter_choice, [
                'label' => $choice['name'], 
                'description' => $choice['name']
            ]);
            
        }
    }

    public function attachFilterToCategory(Category $category, int $filterId)
    {
        $category->filters()->attach($filterId);
    }
}
