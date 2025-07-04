<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LessorController extends Controller
{
    public function index()
    {
        return inertia('Admin/Lessors/Index');
    }

    public function applications()
    {
        return inertia('Admin/Lessors/Applications/Index');
    }

    public function approveApplication($id)
    {
        // Logic to approve the application
        return response()->json(['message' => 'Application approved successfully']);
    }
}
