<?php

namespace App\Repositories\Contracts;
use App\Models\Category;

interface CategoryRepositoryInterface
{
    public function serviceFee(int $categoryId);
    
    public function findCategoryById(int $categoryId): ?Category;
}