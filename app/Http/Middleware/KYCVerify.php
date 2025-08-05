<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class KYCVerify
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!$request->user())
        {
            return redirect()->route('signupsigninwithsocial');
        }

        if(is_null($request->user()->kyc))
        {
            return redirect()->route('kyc.exist');
        }


        return $next($request);
    }
}
