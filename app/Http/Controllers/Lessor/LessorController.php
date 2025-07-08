<?php

namespace App\Http\Controllers\Lessor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Lessor;
use App\Models\Booking;

class LessorController extends Controller
{
    public function dashboard()
    {
        $lessor = Lessor::with(['shops', 'user'])
            ->where('lessoruser_id', auth()->id())
            ->first();
            
        if (!$lessor) {
            abort(403, 'Lessor not found for this user.');
        }

        // Example: Get income data
        $totalIncome = Booking::whereHas('rentalListing', fn($q) => $q->where('user_id', $lessor->user->id))
            ->where('status', 2) // assuming 2 = reserved/completed
            ->sum('total_cost');

        $monthlyIncome = Booking::whereHas('rentalListing', fn($q) => $q->where('user_id', $lessor->user->id))
            ->where('status', 2)
            ->whereMonth('start_date', now()->month)
            ->whereYear('start_date', now()->year)
            ->sum('total_cost');

        // Example: Upcoming reservations
        $upcoming = Booking::with(['bookedBy', 'rentalListing'])
            ->whereHas('rentalListing', fn($q) => $q->where('user_id', $lessor->user->id))
            ->whereDate('start_date', '>=', now())
            ->orderBy('start_date')
            ->limit(5)
            ->get()
            ->map(fn($b) => [
                'property' => $b->rentalListing?->itemName,
                'date' => $b->start_date,
                'lessee' => $b->bookedBy?->name,
            ]);

        // Example: Reservation trend (past 6 months)
        $reservationChartData = Booking::selectRaw('DATE_FORMAT(start_date, "%b") as month, COUNT(*) as reservations')
            ->whereHas('rentalListing', fn($q) => $q->where('user_id', $lessor->user->id))
            ->whereBetween('start_date', [now()->subMonths(5)->startOfMonth(), now()])
            ->groupByRaw('MONTH(start_date), DATE_FORMAT(start_date, "%b")')
            ->orderByRaw('MIN(start_date)')
            ->get();

        return inertia('Lessor/Dashboard', [
            'lessorName' => $lessor->user->name,
            'incomeSummary' => [
                'total' => $totalIncome,
                'monthly' => $monthlyIncome,
            ],
            'upcomingReservations' => $upcoming,
            'reservationChartData' => $reservationChartData,
        ]);

    }
}
