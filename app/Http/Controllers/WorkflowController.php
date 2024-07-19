<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkflowController extends Controller
{
    public function index()
    {
        return Inertia::render('Workflow/Index');
    }
}
