<?php

namespace App\Traits;

trait CalendarTheme {

    public function formatColorByStatus($status)
    {
        switch($status){
            case "pending":
                $backgroundColor = '#FFD700';
                break;
            case "completed":
                $backgroundColor = '#00FF7F';
                break;
            default :
                $backgroundColor = '#1E90FF';
                break;
        }

        return $backgroundColor;
    }
}