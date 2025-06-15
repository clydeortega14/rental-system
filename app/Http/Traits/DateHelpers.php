<?php


namespace App\Http\Traits;

use DateTime;

trait DateHelpers {

    public function getDateDuration($start, $end)
    {
        $start_date = new DateTime($start);
        $end_date = new DateTime($end);

        $diff = $start_date->diff($end_date);

        return $diff;
        
    }
}