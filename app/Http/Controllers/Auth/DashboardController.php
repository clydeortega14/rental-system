<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\Permission;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(): Response
    {
        return Inertia::render('Dashboard', [
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Redirect to the dashboard.
     */
    public function redirectToDashboard(): RedirectResponse
    {
        return redirect()->route('dashboard');
    }
}
