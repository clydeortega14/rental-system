<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index()
    {
        return Inertia::render('AccessRights/Permission/ManagePermissions', [
            'permissions' => Permission::orderBy('name')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('AccessRights/Permission/CreatePermission');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions',
            'slug' => 'required|string|max:255|unique:permissions',
            'description' => 'nullable|string',
            'active' => 'boolean'
        ]);

        Permission::create($validated);

        return redirect()->route('permissions.index')->with('success', 'Permission created successfully.');
    }

    public function edit(Permission $permission)
    {
        return Inertia::render('AccessRights/Permission/EditPermission', [
            'permission' => $permission
        ]);
    }

    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $permission->id,
            'slug' => 'required|string|max:255|unique:permissions,slug,' . $permission->id,
            'description' => 'nullable|string',
            'active' => 'boolean'
        ]);

        $permission->update($validated);

        return redirect()->route('permissions.index')->with('success', 'Permission updated successfully.');
    }

    public function toggle(Request $request, Permission $permission)
    {
        $permission->update(['active' => $request->active]);
        return back()->with('success', 'Permission status updated.');
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();
        return redirect()->route('permissions.index')->with('success', 'Permission deleted successfully.');
    }
}
