<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Filter;
use App\Traits\DetailableTraits;
use Illuminate\Support\Facades\DB;
use App\Models\Category;

class FilterSeeders extends Seeder
{
    use DetailableTraits;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach($this->filters() as $key => $f){

            DB::transaction(function() use ($f) {

                $name = $this->formatLabel($f['label']);

                $filter = Filter::create(['name' => $name]);

                $this->addModelDetail($filter, [
                    'label' => $f['label'],
                    'description' => $f['description']
                ]);

                foreach($f['choices'] as $ch){

                    $choice_name = $this->formatLabel($ch['label']);
    
                    $filter_choice = $filter->choices()->create([
                        'name' => $choice_name
                    ]);
    
                    $this->addModelDetail($filter_choice, [
                        'label' => $ch['label'],
                        'description' => $ch['description']
                    ]);
                }

                $category = Category::where('name', $f['category'])->first();

                if(!is_null($category)){
                    $filter->categories()->attach($category->id);
                }

                

            });
            
        }
    }

    public function filters()
    {
        return [
            [
                'category' => 'cars',
                'label' => 'Transmission',
                'description' => 'the transmission',
                'choices' => [
                    [
                        'label' => 'Manual',
                        'description' => 'Manual Description',
                        
                    ],
                    [
                        'label' => 'Automatic',
                        'description' => 'the automatic'
                    ]
                ]
            ],
            [
                'category' => 'cars',
                'label' => 'Type of car',
                'description' => 'the type of car',
                'choices' => [
                    [
                        'label' => 'Mini Car',
                        'description' => 'The mini car',
                        
                    ],
                    [
                        'label' => 'Economy',
                        'description' => 'the economy'
                    ],
                    [
                        'label' => 'Compact',
                        'description' => 'the compact'
                    ],
                ]
            ],
        ];
    }
}
