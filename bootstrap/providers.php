<?php

return [
    App\Providers\AppServiceProvider::class,
    App\Providers\BroadcastServiceProvider::class,
    App\Providers\EventServiceProvider::class,
    App\Providers\BroadcastServiceProvider::class,
    Renthive\PaymentGateway\PaymentGatewayServiceProvider::class,

    // Yajra Address Service Provider
    Yajra\Address\AddressServiceProvider::class,
    // Custom Service Providers
    App\Providers\BookingServiceProvider::class
];
