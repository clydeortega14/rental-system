<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use App\Models\Category;
use App\Models\Detailable;
use App\Models\RentalAddItem;
use App\Services\Category\CategoryService;
use App\Services\RentalItem\RentalItemService;

class LandingPageController extends Controller
{

    protected $category_service;
    protected $rental_items_service;

    public function __construct(
        
        CategoryService $category_service,
        RentalItemService $rental_items_service
    )
    {
        $this->category_service = $category_service;
        $this->rental_items_service = $rental_items_service;
    }


    public function index()
    {
        $categories = $this->category_service->getCategories();

        $rental_items = RentalAddItem::with(['attachment', 'user'])->get();
        
        $rental_items = $this->rental_items_service->formattedRentalItems();
        return Inertia::render('Welcome1', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'categories' => $categories,
            'rental_items' => $rental_items
        ]);
    }
}
