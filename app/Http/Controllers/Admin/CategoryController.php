<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return inertia('Admin/Configurations/Categories/Index', [
            'categories' => \App\Models\Category::all(),
        ]);
    }
    public function create()
    {
        return inertia('Admin/Configurations/Categories/Categories/CategoryForm');
    }
    public function edit($id)
    {
        return inertia('Admin/Configurations/Categories/Categories/CategoryEdit', [
            'id' => $id
        ]);
    }

}
