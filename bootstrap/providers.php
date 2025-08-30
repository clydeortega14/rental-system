<?php

return [
    App\Providers\AppServiceProvider::class,
    App\Providers\EventServiceProvider::class,
    Yajra\Address\AddressServiceProvider::class,
    Renthive\PaymentGateway\PaymentGatewayServiceProvider::class,
    // Custom Service Providers
    App\Providers\BookingServiceProvider::class
];
