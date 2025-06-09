<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->orderBy('name')->get();
        return response()->json($roles);
    }

    public function create()
    {
        $permissions = Permission::all();
        return view('roles.test', compact('permissions'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:roles',
            'slug' => 'required|unique:roles',
            'description' => 'nullable',
            'active' => 'boolean',
            'permissions' => 'array',
        ]);

        $role = Role::create($validated);
        if ($request->has('permissions')) {
            $role->permissions()->sync($request->input('permissions'));
        }

        if ($request->has('permissions')) {
            $role->permissions()->sync($request->input('permissions'));
        } else {
            $role->permissions()->detach();
        }

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'role' => $role->load('permissions')]);
        }

        return redirect()->route('roles.test')->with('success', 'Role created successfully.');
    }

    public function edit(Role $role)
    {
        $permissions = Permission::all();
        $rolePermissions = $role->permissions->pluck('id')->toArray();
        return view('roles.test', compact('role', 'permissions', 'rolePermissions'));
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => 'required|unique:roles,name,' . $role->id,
            'slug' => 'required|unique:roles,slug,' . $role->id,
            'description' => 'nullable',
            'active' => 'boolean',
            'permissions' => 'array',
        ]);

        $role->update($validated);
        if ($request->has('permissions')) {
            $role->permissions()->sync($request->input('permissions'));
        } else {
            $role->permissions()->detach();
        }

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'role' => $role->load('permissions')]);
        }

        return redirect()->route('roles.test')->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('roles.test')->with('success', 'Role deleted successfully.');
    }
}
