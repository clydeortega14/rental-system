<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $headersData = [
            ['name' => 'Item', 'date' => 'Reservation Date', 'bookedby' => 'BookedBy', 'action' => 'Action']
        ];

        $bodyData = [
            ['item' => 'Toyota Vios 5 Seaters', 'date' => 'Weds, April 10, 2024', 'bookedby' => 'Jhon Doe', 'action' => 'Action'],
            ['item' => 'Toyota Vios 5 Seaters', 'date' => 'Weds, April 10, 2024', 'bookedby' => 'Jhon Doe', 'action' => 'Action'],
            ['item' => 'Toyota Vios 5 Seaters', 'date' => 'Weds, April 10, 2024', 'bookedby' => 'Jhon Doe', 'action' => 'Action'],
            ['item' => 'Toyota Vios 5 Seaters', 'date' => 'Weds, April 10, 2024', 'bookedby' => 'Jhon Doe', 'action' => 'Action'],

        ];

        return Inertia::render('Reservation/Index', [

            'headerData' => $headersData,
            'bodyData' => $bodyData

        ]);
    }
}
