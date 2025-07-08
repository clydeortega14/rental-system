<?php

namespace Renthive\PaymentGewateway;

use Illuminate\Support\ServiceProvider;

class PaymentGatewayServiceProvier extends ServiceProvider
{
    public function boot()
    {
        // $this->loadRoutesFrom(__DIR__.'routes/web.php');

        dd('works');
    }

    public function register()
    {
        //
    }
}