<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $permission)
    {
        $user = $request->user();
        if (!$user) {
            abort(403, 'Unauthorized');
        }
        // Check if user has the permission via roles
        if (!$user->roles()->whereHas('permissions', function ($q) use ($permission) {
            $q->where('slug', $permission);
        })->exists()) {
            abort(403, 'Forbidden');
        }
        return $next($request);
    }
    /**
     * Determine whether the user has the given permission.
     *
     * @param  string  $permission
     * @return bool
     */
    public function hasPermission($permission)
    {
        return auth()->user()->permissions->contains('slug', $permission);
    }
}
