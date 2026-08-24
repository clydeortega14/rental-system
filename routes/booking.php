<?php

use App\Http\Controllers\BookingController;

Route::prefix('booking')->group(function(){
    Route::post(`update-status`, [BookingController::class, 'updateStatus'])->name('booking.update.status');
});