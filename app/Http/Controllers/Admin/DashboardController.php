<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return inertia('Admin/Dashboard', [
            'title' => 'Admin Dashboard',
            'description' => 'Welcome to the admin dashboard. Here you can manage all aspects of the application.',
        ]);
    }
}
