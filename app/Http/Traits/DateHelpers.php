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

    public function formatDateExpiry($expiry)
    {
        
        [$month, $year] = explode('/', $expiry);
        $year = '20' . $year; // convert to 4-digit year
        $expiryDate = DateTime::createFromFormat('Y-m-d', "$year-$month-01");
        $expiryDate->modify('last day of this month');

        $now = new DateTime();

        return $expiryDate;
        
        
    }

    public function isDateExpired($expiry)
    {
        $formatted_expiry = $this->formatDateExpiry($expiry);
        $now = new DateTime();

        if($formatted_expiry < $now)
        {
            return true;
        }
        else{
            
            return false;
        }

    }

    public function isDateFormatValid($expiry)
    {
        if(preg_match('/^(0[1-9]|1[0-2])\/\d{2}$/', $expiry))
        {
            return true;
        }
        return false;
    }
}