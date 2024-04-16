<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome1', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/rentalListing', function () {
    return Inertia::render('User/Partials/Rental');
})->middleware(['auth'])->name('rentalListing');

// Route::get('/itemDetails/{id}', function () {
//     return Inertia::render('Item/View');
// })->middleware(['auth'])->name('itemDetails');
Route::get('/itemDetails/{id}', function ($id) {
    // Pass the item ID to the view
    return Inertia::render('Item/View', ['itemId' => $id]);
})->middleware(['auth'])->name('itemDetails');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //User
    Route::delete('/rentalListing')->name('rental.listing');
});

require __DIR__.'/auth.php';
