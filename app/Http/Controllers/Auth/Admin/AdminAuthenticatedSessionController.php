<?php

namespace App\Http\Controllers\Auth\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthenticatedSessionController extends Controller
{
    public function create()
    {
        return inertia('Auth/Admin/Login');
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $credentials = $request->only('email', 'password');

      

        if (Auth::guard('admin')->attempt($credentials, $request->filled('remember'))) {

          
            if(!Auth::guard('admin')->user()->hasRole('admin')) {
                return redirect()->route('admin.create')->withErrors([
                    'email' => 'You do not have permission to access this area.',
                ])->withInput($request->only('email'));
            }

            return redirect()->intended(route('admin.dashboard'));
        }

        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ])->withInput($request->only('email'));
    }

    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect('/admin/login');
    }
}
