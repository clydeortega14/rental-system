<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    public function index()
    {
        return inertia('Admin/AccessControls/Roles/Index');
    }

    public function create()
    {
        return inertia('Admin/AccessControls/Roles/RoleForm/Index');
    }

    public function edit($id)
    {
        return inertia('Admin/AccessControls/Roles/RoleEdit/Index', [
            'id' => $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        return response()->json(['message' => 'Role updated successfully']);
    }
}
