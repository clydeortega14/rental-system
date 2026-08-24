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

        // 'name',
        // 'description',
        // 'status',
        // 'image',
        // 'image_path',
        // 'template_category_id',
        return Category::select('id', 'name', 'image', 'image_path')
        ->whereIn('name', ['car', 'property', 'item'])
        ->orWhereIn('description', ['Car', 'Property', 'Item'])
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