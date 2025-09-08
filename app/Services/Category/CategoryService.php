<?php

namespace App\Services\Category;
use App\Models\Detailable;
use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;

class CategoryService 
{
    protected $category_repository;

    public function __construct(CategoryRepositoryInterface $category_repository)
    {
        $this->category_repository = $category_repository;
    }

    public function getServiceFee(int $categoryId)
    {
        return $this->category_repository->serviceFee($categoryId);
    }
    
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

        return Category::select('id', 'name')
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