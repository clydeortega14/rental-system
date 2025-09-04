<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\CategoryRepositoryInterface;

use App\Models\Category;

class CategoryRepository implements CategoryRepositoryInterface
{
    public function serviceFee(int $categoryId)
    {
        $category = $this->findCategoryById($categoryId);

        return !is_null($category->templateCategory) ? $category->templateCategory->service_free : 0.03;
    }

    public function findCategoryById(int $categoryId): ?Category
    {
        return Category::findOrFail($categoryId);
    }
}