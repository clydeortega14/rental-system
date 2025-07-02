<?php

namespace App\Traits;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

trait DateTraits {


    public function itemUnavailableDates($item)
    {
        $item_reserved_dates = $item->bookings()->select('start_date', 'end_date')->get();
        
        $reserved_date_periods = [];
        
        foreach($item_reserved_dates as $reserved_date)
        {

            $startDate = Carbon::parse($reserved_date->start_date);

            $endDate = Carbon::parse($reserved_date->end_date);
            
            $period = CarbonPeriod::create($startDate, $endDate);

            foreach ($period as $p_date) {
                $reserved_date_periods[$p_date->toDateString()] = false; // format: 'Y-m-d'
            }
        }

        return $reserved_date_periods;
    }
}