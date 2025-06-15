<?php


namespace App\Http\Traits;

use DateTime;

trait DateHelpers {

    public function getDurationByDay($start, $end)
    {
        return $this->handleDateDifference($start, $end)->d;
    }

    protected function handleDateDifference($start, $end)
    {
        $start_date = new DateTime($start);
        $end_date = new DateTime($end);

        return $start_date->diff($end_date);
    }
}