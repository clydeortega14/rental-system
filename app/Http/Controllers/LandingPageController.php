<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
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
        $categories = $this->category_service->getCategories()->toArray();

 
        // $price_ranges = [
        //     ['id' => '0-50', 'label' => '0 - 50'],
        //     ['id' => '50-100', 'label' => '50 - 100'],
        //     ['id' => '100-200', 'label' => '100 - 200'],
        //     ['id' => '200-500', 'label' => '20 - 500'],
        //     ['id' => '500+', 'label' => '500+']
        // ];

        // $rental_items = RentalAddItem::with(['attachment', 'user'])->get();
        
        // $rental_items = $this->rental_items_service->formattedRentalItems();

        // return inertia('Renter/RentalItemBrowser', [
        //     'categories' => $categories,
        //     'priceRanges' => $price_ranges
        // ]);

        return Inertia::render('LandingPage', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'categories' => $categories,
            // 'rental_items' => $rental_items
        ]);
    }
}
