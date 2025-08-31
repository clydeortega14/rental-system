<?php

namespace App\Repositories\Contracts;
use Illuminate\Support\Collection;

interface BookingRepositoryInterface
{
    public function store(array $data): void;

    public function bookings(int $userId) : Collection;
}