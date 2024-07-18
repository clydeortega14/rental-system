<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use App\Models\Category;
use App\Models\Detailable;

class LandingPageController extends Controller
{
    public function index()
    {
        $categories = Detailable::where('detailable_type', 'App\Models\Category')
                        ->where('active', true)
                        ->get(['detailable_id as category_id', 'label'])
                        ->toArray();

        return Inertia::render('Welcome1', [

            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'categories' => $categories

        ]);
    }
}
