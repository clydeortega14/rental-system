<?php

namespace App\Services\Category;
use App\Models\Detailable;
use App\Models\Category;

class CategoryService 
{
    public function getCategories()
    {
        return Detailable::where('detailable_type', 'App\Models\Category')
                        ->where('active', true)
                        ->get(['detailable_id as category_id', 'label'])
                        ->toArray();
    }

    public function categoryByName($name)
    {
        return Category::where('name', $name)->first();
    }
}