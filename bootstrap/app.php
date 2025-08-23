<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->appendToGroup('kyc-verified', [\App\Http\Middleware\KYCVerify::class]);

        $middleware->appendToGroup('check-user-info', [

            \App\Http\Middleware\CheckUserInfo::class

        ]);

        $middleware->appendToGroup('auth:admin', [
            \App\Http\Middleware\AuthenticateAdmin::class,
        ]);

        $middleware->appendToGroup('guest:admin', [
            \App\Http\Middleware\RedirectAdminIfAuthenticated::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
