<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use App\Models\Category;
use App\Models\Detailable;
use App\Models\RentalAddItem;

class LandingPageController extends Controller
{
    public function index()
    {
        $categories = Detailable::where('detailable_type', 'App\Models\Category')
                        ->where('active', true)
                        ->get(['detailable_id as category_id', 'label'])
                        ->toArray();

        $rental_items = RentalAddItem::with(['attachment', 'user'])->get();

        $map_rental_items = $rental_items->map(function($rentItem, $index){

            $images = [];
            foreach ($rentItem->attachment as $attachment) {
                $images[] = $attachment->path . '/' . $attachment->filename . '.' . $attachment->type;
            }
            return [

                'id' => $rentItem->uuid,
                'name' => $rentItem->itemName,
                'role' => 'View More Details',
                'category' => $rentItem->category,
                'image' => $images,
            ];
        })->toArray();

       

        return Inertia::render('Welcome1', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'categories' => $categories,
            'rental_items' => $map_rental_items
        ]);
    }
}
