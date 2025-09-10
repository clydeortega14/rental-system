<?php

namespace App\Services\Category;
use App\Models\Detailable;
use App\Models\Category;

class CategoryService 
{
    public function getCategories()
    {
        // return Detailable::where('detailable_type', 'App\Models\Category')
        //                 ->where('active', true)
        //                 ->with('detailable')
        //                 ->get(['detailable_id as category_id', 'label'])
        //                 ->toArray();

        // return Category::select('id', 'name')->with(['detail' => function($query){
        //     $query->select('id', 'label', 'active', 'detailable_id')->where('active', true);
        // }])->get();

        // 'name',
        // 'description',
        // 'status',
        // 'image',
        // 'image_path',
        // 'template_category_id',
        return Category::select('id', 'name', 'image', 'image_path')
        ->withCount('rentalItems') // Adds rental_items_count per category
        ->with(['detail' => function($query) {
            $query->select('id', 'label', 'active', 'detailable_id')
                  ->where('active', true);
        }])
        ->get();
    }

    public function categoryByName($name)
    {
        return Category::where('name', $name)->first();
    }
}