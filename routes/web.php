<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RentalItemController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\RentalProviderController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\WorkflowController;
use App\Http\Controllers\LandingPageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingPageController::class, 'index'])->name('landing.page.index');

Route::get('/itemDetails/{uuid}', [RentalItemController::class, 'itemDetails'])->name('itemDetails');

Route::get('/itemDetails/{uuid}/checkout', [RentalItemController::class, 'checkoutItem'])->name('itemCheckout');

Route::middleware([
    'auth',
    'verified'
])->group(function(){

    Route::get('/completing/user/{uuid}', [UserController::class, 'getUserInfoPage'])->name('completing.user');
    
    // user must redirect to this route if first time using the platform.
    Route::post('/completing/user', [UserController::class, 'store'])->name('store.completing.user');
    
    Route::get('/rentalListing', function () {
        return Inertia::render('User/Partials/Rental');
    })->middleware(['auth'])->name('rentalListing');

    // Route::get('/itemDetails/{id}', function () {
    //     return Inertia::render('Item/View');
    // })->middleware(['auth'])->name('itemDetails');


    
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

    /* -- Rental Provider Profile Show -- */
    Route::get('rental-provider/profile/{uuid}', [RentalProviderController::class, 'profile'])->name('rental.provider.profile');

    /* -- Profile -- */
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    /* -- Profile Update -- */
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    /* -- Profile Delete -- */
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /* -- Reservations -- */
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');

    /* -- Upload Valid ID -- */
    Route::post('/upload/valid-id', [FileUploadController::class, 'uploadFile'])->name('upload.valid-id');

    /* -- Categories Routes -- */
    Route::prefix('categories')->group(function(){

        Route::get('/', [CategoryController::class, 'index'])->name('categories.index');

    });

    /* -- Forms Routes -- */
    Route::prefix('forms')->group(function(){

        Route::get('/', [FormController::class, 'index'])->name('forms.index');
    });

    /* -- Access Rights Routes -- */
    Route::prefix('access-rights')->group(function(){

        // Users
        Route::prefix('users')->group(function(){
            Route::get('/', [UserController::class, 'index'])->name('users.index');
        });

        // Roles
        Route::prefix('roles')->group(function(){
            Route::get('/', [RoleController::class, 'index']);
        });

        // Permissions
        Route::prefix('permissions')->group(function(){
            Route::get('/', [PermissionController::class, 'index']);
        });
    });

    /* -- Workflows --*/
    Route::prefix('workflows')->group(function(){
        Route::get('/', [WorkflowController::class, 'index'])->name('workflows.index');
    });

    Route::delete('/rentalListing')->name('rental.listing');
  
    Route::post('/rentalListing/add-item', [RentalItemController::class, 'create'])->name('store.rentalListing.add.item');
    Route::get('/rentalListing', [RentalItemController::class, 'index'])->name('rentalListing');
    Route::get('/rentalListing/items/{id}', [RentalItemController::class, 'show'])->name('rentalListingView');
    Route::put('/rentalListing/items/update/{id}', [RentalItemController::class, 'update'])->name('rental.update');

    // Route::get('/rentalListing', function () {
    //     return Inertia::render('User/Partials/Rental');
    // })->middleware(['auth'])->name('rentalListing');

    

});

require __DIR__.'/auth.php';
