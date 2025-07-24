<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
       $admin = Auth::guard('admin')->user(); 

        return inertia('Admin/Dashboard', [
            'title' => 'Admin Dashboard',
            'description' => 'Welcome to the admin dashboard. Here you can manage all aspects of the application.',
            'auth' => [
                'user' => $admin,
            ],
        ]);
    }
}
