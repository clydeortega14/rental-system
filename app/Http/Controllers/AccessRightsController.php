<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AccessRightsController extends Controller
{
    public function index()
    {
        return Inertia::render('AccessRights/Index');
    }
}
