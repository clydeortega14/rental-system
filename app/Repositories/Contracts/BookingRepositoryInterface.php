<?php

namespace App\Repositories\Contracts;
use Illuminate\Support\Collection;

use App\Models\Booking;

interface BookingRepositoryInterface
{
    public function store(array $data): Booking;

    public function updateStatus(int $bookingId, string $action) : void;

    public function bookings(int $userId) : Collection;
}