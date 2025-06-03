<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'permissions' => \App\Models\Permission::all(), // Ensure to import the model
        ]);
    }
}
