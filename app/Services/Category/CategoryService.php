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

        return Category::select('id', 'name')->with(['detail' => function($query){
            $query->select('id', 'label', 'active', 'detailable_id')->where('active', true);
        }])->get();
    }

    public function categoryByName($name)
    {
        return Category::where('name', $name)->first();
    }
}