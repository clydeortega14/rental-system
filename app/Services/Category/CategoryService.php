<?php

namespace App\Services\Category;
use App\Models\Detailable;

class CategoryService 
{
    public function getCategories()
    {
        return Detailable::where('detailable_type', 'App\Models\Category')
                        ->where('active', true)
                        ->get(['detailable_id as category_id', 'label'])
                        ->toArray();
    }
}