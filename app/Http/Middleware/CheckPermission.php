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
    public function handle(Request $request, Closure $next, $permission): Response
    {
        if (!auth()->check() || !optional(auth()->user())->hasPermission($permission)) {
            abort(403, 'Unauthorized action.');
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
