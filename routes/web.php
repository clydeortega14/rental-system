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

use Illuminate\Foundation\Application;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingPageController::class, 'index'])->name('landing.page.index');

Route::get('rental-browser/{category}', [RentalItemController::class, 'rentalBrowserIndex'])->name('rental.browser.index');
Route::group(['prefix' => 'admin'], function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard.index');

    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [AdminUserController::class, 'index'])->name('admin.users.index');
        Route::get('/{uuid}', [AdminDashboardController::class, 'show'])->name('admin.users.show');
    });
});

Route::get('/itemDetails/{uuid}', [RentalItemController::class, 'itemDetails'])->name('itemDetails');

/* -- Submit for reservation -- */
Route::post('booking/store', [BookingController::class, 'bookingStore'])->name('booking.store');

Route::get('/item/checkout', [RentalItemController::class, 'checkoutItem'])->name('itemCheckout');

Route::middleware([
    'auth',
    'verified'
])->group(function () {

    Route::get('/completing/user/{uuid}', [UserController::class, 'getUserInfoPage'])->name('completing.user');

    // user must redirect to this route if first time using the platform.
    Route::post('/completing/user', [UserController::class, 'store'])->name('store.completing.user');

    Route::get('/rentalListing', function () {
        return Inertia::render('User/Partials/Rental');
    })->middleware(['auth'])->name('rentalListing');

    // Route::get('/itemDetails/{id}', function () {
    //     return Inertia::render('Item/View');
    // })->middleware(['auth'])->name('itemDetails');

    Route::get('/lessor', function () {
        return Inertia::render('Lessor/Landing', [
            'lessorName' => auth()->user()->name,
        ]);
    });

    Route::get('/lessee', function () {
        return Inertia::render('Lessee/Landing');
    })->name('lessee.profile');



    Route::get('/lessee', function () {
        return Inertia::render('Lessee/Landing');
    })->name('lessee.profile');
});

Route::middleware([
    'auth', // auth middleware
    'verified', // email verification middleware
    'check-user-info' // completed information details
])->group(function () {







    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');

    Route::post('checkout/booking', [BookingController::class, 'checkOutBooking'])->name('checkout.booking');

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
    Route::prefix('categories')->group(function () {

        Route::get('/', [CategoryController::class, 'index'])->name('categories.index');
    });

    /* -- Forms Routes -- */
    Route::prefix('forms')->group(function () {

        Route::get('/', [FormController::class, 'index'])->name('forms.index');
    });

    /* -- Access Rights Routes -- */
    Route::prefix('access-rights')->group(function () {

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

    // Route::get('/rentalListing', function () {
    //     return Inertia::render('User/Partials/Rental');
    // })->middleware(['auth'])->name('rentalListing');


    Route::get('UserProfile', [UserController::class, 'index'])->name('user.profile');
    Route::get('/RolesTest', function () {
        return Inertia::render('RolesTest');
    })->name('roles.test');
    Route::get('/access-rights/roles', [RoleController::class, 'index']);
    Route::get('/PermissionTest', function () {
        return Inertia::render('PermissionTest');
    })->name('permissions.test');
    Route::get('/access-rights/permissions/all', [PermissionController::class, 'all']);
    // Get all users (for the dropdown)
    Route::get('/access-rights/users/all', [UserController::class, 'all']);
    // Assign roles to user
    Route::put('/access-rights/users/{user}/roles', [UserController::class, 'assignRoles']);
    Route::get('/ManageUserTest', function () {
        return Inertia::render('ManageUserTest');
    });
    Route::get('/access-rights/my-permissions', [UserController::class, 'myPermissions']);
});

require __DIR__ . '/auth.php';
