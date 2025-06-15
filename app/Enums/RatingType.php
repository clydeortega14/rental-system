<?php

namespace App\Enums;

enum RatingType: string
{
    case RENTER_TO_HOST = 'renter_to_host';  // renter rates a host
    case HOST_TO_RENTER = 'host_to_renter';  // host rates a renter
    case SERVICE = 'service';                // For platform/service ratings
    case PRODUCT = 'product';                // For specific product ratings
    
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}