<?php

use App\Http\Controllers\BookingController;

Route::post('booking-update-status', [BookingController::class, 'updateStatus'])->name('booking.update.status');