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
        $hasPermission = $user->roles()
            ->whereHas('permissions', function ($q) use ($permission) {
                $q->where('slug', $permission);
            })->exists();

        if (!$hasPermission) {
            abort(403, 'You do not have permission to access this page.');
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
