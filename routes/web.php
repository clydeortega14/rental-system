<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
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

Route::middleware([
    'auth',
    'verified'
])->group(function(){

    Route::get('/completing/user/{user}', [UserController::class, 'getUserInfoPage'])->name('completing.user');
    
    // user must redirect to this route if first time using the platform.
    Route::post('/completing/user', [UserController::class, 'store'])->name('store.completing.user');
    

    Route::get('/rentalListing', function () {
        return Inertia::render('User/Partials/Rental');
    })->middleware(['auth'])->name('rentalListing');

    // Route::get('/itemDetails/{id}', function () {
    //     return Inertia::render('Item/View');
    // })->middleware(['auth'])->name('itemDetails');
    Route::get('/itemDetails/{id}', function ($id) {
        // Pass the item ID to the view
        return Inertia::render('Item/View', ['itemId' => $id]);
    })->name('itemDetails');

    Route::get('/itemDetails/{id}/checkout', function ($id) {
        // Pass the item ID to the view
        return Inertia::render('Item/CheckoutItem', ['itemId' => $id]);
    })->name('itemCheckout');
});

Route::middleware([
    'auth', // auth middleware
    'verified', // email verification middleware
    'check-user-info'// completed information details

])->group(function(){

    /* -- Account Settings -- */
    Route::get('/account-settings', [ProfileController::class, 'accountSettings'])->name('account.settings');

    /* -- Dashboard -- */
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    /* -- Profile -- */
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /* -- Reservations -- */
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');

    
    Route::delete('/rentalListing')->name('rental.listing');

});

require __DIR__.'/auth.php';
