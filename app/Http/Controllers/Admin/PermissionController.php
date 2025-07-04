<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PermissionController extends Controller
{
    public function index()
    {
        return inertia('Admin/AccessControls/Permissions/Index');
    }

    public function create()
    {
        return inertia('Admin/AccessControls/Permissions/PermissionForm/Index');
    }

    public function edit($id)
    {
        return inertia('Admin/AccessControls/Permissions/PermissionEdit/Index', [
            'id' => $id,
        ]);
    }

    public function update(Request $request, $id)
    {
        return response()->json(['message' => 'Permission updated successfully']);
    }
}
