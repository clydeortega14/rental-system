<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
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
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\Admin\LoginController;

use App\Http\Controllers\Lessor\RentalController;
use App\Http\Controllers\Lessor\LessorController;
use App\Http\Controllers\Lessor\ShopController;
use App\Http\Controllers\Lessor\ReservationController as ProperReserveController;

use App\Http\Controllers\LesseeController;

use Illuminate\Foundation\Application;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// Google OAuth routes
Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

//ladingpage
Route::get('/', [LandingPageController::class, 'index'])->name('landing.page.index');

Route::get('rental-browser/{category}', [RentalItemController::class, 'rentalBrowserIndex'])->name('rental.browser.index');
Route::group(['prefix' => 'admin'], function () {
    // Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [AdminUserController::class, 'index'])->name('admin.users.index');
        Route::get('/{uuid}', [AdminDashboardController::class, 'show'])->name('admin.users.show');
    });
});


Route::get('/itemDetails/{uuid}', [RentalItemController::class, 'itemDetails'])->name('itemDetails');

/* -- Submit for reservation -- */
Route::post('booking/store', [BookingController::class, 'bookingStore'])->name('booking.store');

Route::get('/item/checkout', [RentalItemController::class, 'checkoutItem'])->name('checkout.item');

Route::get('shopping-cart', [CartController::class, 'index'])->name('cart.index');

Route::post('checkout/booking', [BookingController::class, 'checkOutBooking'])->name('checkout.booking');


// Route Group for lessee
Route::middleware(['auth'])->group(function(){
    Route::get('booking/details/{uuid}', [BookingController::class, 'bookingView'])->name('booking.view');
});

Route::middleware([
    'auth',
    'verified'
])->group(function () {

    Route::get('/completing/user/{uuid}', [UserController::class, 'getUserInfoPage'])->name('completing.user');

    // user must redirect to this route if first time using the platform.
    Route::post('/completing/user', [UserController::class, 'store'])->name('store.completing.user');

    /* -- Reservations -- */
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');

    // Route::get('/rentalListing', function () {
    //     return Inertia::render('User/Partials/Rental');
    // })->middleware(['auth'])->name('rentalListing');

    // Route::get('rental-listings', [RentalItemController::class, 'rentalListings'])->name('rentalListing');

    Route::group(['prefix' => 'lessor'], function () {

        Route::get('/', [LessorController::class, 'dashboard'])->name('lessor.dashboard');
        
        Route::get('/properties', [RentalController::class, 'index'])->name('lessor.properties');
        Route::post('/properties', [RentalController::class, 'store'])->name('lessor.properties.store');
        Route::put('/properties/{rental}', [RentalController::class, 'update'])->name('lessor.properties.update');

        Route::get('/shop', [ShopController::class, 'index'])->name('lessor.shop');
        Route::post('/shop', [ShopController::class, 'store'])->name('lessor.shop.store');
        Route::put('/lessor/shop/{shop}', [ShopController::class, 'update'])->name('lessor.shop.update');

        Route::get('/property-reserve', [ProperReserveController::class, 'index'])->name('lessor.property-reserve');
        Route::put('/property-reserve/{booking}/status', [ProperReserveController::class, 'updateStatus'])->name('lessor.property-reserve.updateStatus');
    
    });

    // Route::get('/lessee', function () {
    //     return Inertia::render('Lessee/Landing');
    // })->name('lessee.profile');
    Route::get('/lessee', [LesseeController::class, 'index'])->name('lessee.profile');
    Route::post('/lessor/signUserup', [LesseeController::class, 'store'])->name('lessor.signup.store');
});

Route::middleware([
    'auth', // auth middleware
    'verified', // email verification middleware
    'check-user-info' // completed information details
])->group(function () {


    Route::get('/itemDetails/{uuid}/checkout', [RentalItemController::class, 'checkoutItem'])->name('itemCheckout');

    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');

    // Route::post('checkout/booking', [BookingController::class, 'checkOutBooking'])->name('checkout.booking');

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

    /* -- Booking Calendar -- */
    Route::get('/booking/calendar', [BookingController::class, 'calendar'])->name('booking.calendar');

    /* -- Accepting Reservation -- */
    Route::post('/reservation/update-status/{uuid}', [ReservationController::class, 'update'])->name('reservation.update.status');

    /* -- Cancel Reservation --*/
    Route::post('/reservation/cancel/{uuid}', [ReservationController::class, 'cancel'])->name('reservation.cancel');

    /* -- Complete Reservation -- */
    Route::post('/reservation/complete/uuid', [ReservationController::class, 'complete'])->name('reservation.complete');

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
        Route::prefix('users')->group(function () {
            Route::get('/', [UserController::class, 'index'])->name('users.index');
        });

        // Roles
        Route::prefix('roles')->name('roles.')->group(function () {
            Route::get('/', [RoleController::class, 'index'])->name('index');
            Route::get('/create', [RoleController::class, 'create'])->name('create');
            Route::post('/', [RoleController::class, 'store'])->name('store');
            Route::get('/{role}/edit', action: [RoleController::class, 'edit'])->name('edit');
            Route::put('/{role}', [RoleController::class, 'update'])->name('update');
            Route::patch('/{role}/toggle', [RoleController::class, 'toggle'])->name('toggle');
            Route::delete('/{role}', [RoleController::class, 'destroy'])->name('destroy');
        });

        // Permissions
        Route::prefix('permissions')->group(function () {
            Route::get('/', [PermissionController::class, 'index']);
        });

        Route::prefix('permissions')->name('permissions.')->group(function () {
            Route::get('/', [PermissionController::class, 'index'])->name('index');
            Route::get('/create', [PermissionController::class, 'create'])->name('create');
            Route::post('/', [PermissionController::class, 'store'])->name('store');
            Route::get('/{permission}/edit', [PermissionController::class, 'edit'])->name('edit');
            Route::put('/{permission}', [PermissionController::class, 'update'])->name('update');
            Route::patch('/{permission}/toggle', [PermissionController::class, 'toggle'])->name('toggle');
            Route::delete('/{permission}', [PermissionController::class, 'destroy'])->name('destroy');
        });
    });

    /* -- Workflows --*/
    Route::prefix('workflows')->group(function () {
        Route::get('/', [WorkflowController::class, 'index'])->name('workflows.index');
    });

    Route::delete('/rentalListing')->name('rental.listing');

    Route::post('/rentalListing/add-item', [RentalItemController::class, 'create'])->name('store.rentalListing.add.item');
    Route::get('/rentalListing', [RentalItemController::class, 'index'])->name('rentalListing');
    Route::get('/rentalListing/items/{id}', [RentalItemController::class, 'show'])->name('rentalListingView');
    Route::put('/rentalListing/items/update/{id}', [RentalItemController::class, 'update'])->name('rental.update');

    /*-- Ratings --*/
    Route::middleware(['web', 'auth'])->group(function () {
    // Rating creation form
    Route::get('/rating', [RatingController::class, 'create'])
        ->name('ratings.create');

    // Handle form submission
    Route::post('/bookings/{booking}/rate', [RatingController::class, 'store'])
        ->name('ratings.store');
    });

    // Public confirmation
    Route::get('/ratings/confirmation', [RatingController::class, 'confirmation'])
        ->name('ratings.confirmation');

    /*-- Feedback --*/
    Route::middleware(['web'])->group(function () {
    // Feedback form (public or auth)
    Route::get('/feedback', [FeedbackController::class, 'create'])
        ->name('feedback.create');

    // Form submission
    Route::post('/feedback', [FeedbackController::class, 'store'])
        ->name('feedback.store');
    });

    // Public confirmation
    Route::get('/feedback/confirmation', [FeedbackController::class, 'confirmation'])
        ->name('feedback.confirmation');
    });

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
