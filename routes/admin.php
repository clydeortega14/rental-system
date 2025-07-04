<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\FormController as AdminFormController;
use App\Http\Controllers\Admin\RoleController as AdminRoleController;
use App\Http\Controllers\Admin\PermissionController as AdminPermissionController;
use App\Http\Controllers\Auth\Admin\AdminAuthenticatedSessionController;
use App\Http\Controllers\Admin\LessorController as AdminLessorController;



Route::get('/admin/login', [AdminAuthenticatedSessionController::class, 'create'])->name('admin.create')->middleware('guest:admin');
Route::post('/admin/login', [AdminAuthenticatedSessionController::class, 'store'])->name('admin.store');
Route::post('/admin/logout', [AdminAuthenticatedSessionController::class, 'logout'])->name('admin.logout');

Route::middleware(['auth:admin'])->group(function () {

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

        Route::group(['prefix' => 'users'], function () {
            Route::get('/', [AdminUserController::class, 'index'])->name('users.index');
            Route::get('/{uuid}', [AdminDashboardController::class, 'show'])->name('users.show');
        });

        Route::group(['prefix' => 'access-controls'], function () {
            Route::get('/roles', [AdminRoleController::class, 'index'])->name('access-controls.roles.index');
            Route::get('/permissions', [AdminPermissionController::class, 'index'])->name('access-controls.permissions.index');
        });

        Route::group(['prefix' => 'configurations'], function () {

            Route::group(['prefix' => 'categories'], function () {
                Route::get('/index', [AdminCategoryController::class, 'index'])->name('configurations.categories.index');
            });

            Route::group(['prefix' => 'forms'], function () {
                Route::get('/index', [AdminFormController::class, 'index'])->name('configurations.forms.index');
            });
        });

        Route::prefix('lessors')->name('lessors.')->group(function () {
            Route::get('/', [AdminLessorController::class, 'index'])->name('index');
            Route::get('/applications', [AdminLessorController::class, 'applications'])->name('applications');
            Route::get('/application/approve/{id}', [AdminLessorController::class, 'approveApplication'])->name('application.approve');
        });

    });

});
