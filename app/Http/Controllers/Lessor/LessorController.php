<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LessorController extends Controller
{
    public function dashboard()
    {
        $lessorName = auth()->user()->name;

        // Income summary example
        $incomeSummary = [
            'total' => 12000,
            'monthly' => 2000,
        ];

        // Upcoming reservations example
        $upcomingReservations = [
            ['property' => 'Ocean View Apartment', 'date' => '2025-06-05', 'lessee' => 'John Doe'],
            ['property' => 'Downtown Studio', 'date' => '2025-06-12', 'lessee' => 'Jane Smith'],
        ];

        // Reservations per month for chart (last 6 months)
        $reservationChartData = [
            ['month' => 'Dec', 'reservations' => 8],
            ['month' => 'Jan', 'reservations' => 12],
            ['month' => 'Feb', 'reservations' => 15],
            ['month' => 'Mar', 'reservations' => 10],
            ['month' => 'Apr', 'reservations' => 18],
            ['month' => 'May', 'reservations' => 20],
        ];

        // Ratings distribution for chart
        $ratingsChartData = [
            ['rating' => '5 Stars', 'count' => 30],
            ['rating' => '4 Stars', 'count' => 12],
            ['rating' => '3 Stars', 'count' => 5],
            ['rating' => '2 Stars', 'count' => 3],
            ['rating' => '1 Star',  'count' => 1],
        ];

        return Inertia::render('Lessor/Landing', [
            'lessorName' => $lessorName,
            'incomeSummary' => $incomeSummary,
            'upcomingReservations' => $upcomingReservations,
            'reservationChartData' => $reservationChartData,
            'ratingsChartData' => $ratingsChartData,
        ]);

    }
}
