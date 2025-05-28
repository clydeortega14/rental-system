<?php

namespace App\Http\Controllers\Lessor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessorController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Lessor/Dashboard');
    }
}

