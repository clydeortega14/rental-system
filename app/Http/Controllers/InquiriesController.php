<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lessor;

class InquiriesController extends Controller
{
    //
     public function getLessors()
    {
        $lessors = Lessor::with(['user:id,name,email,avatar'])
            ->whereNotNull('approved_at') // only approved lessors
            ->whereHas('user', function ($query) {
                $query->where('active', true); // only active users
            })
            ->get();
        

        return response()->json([
            'status' => 'success',
            'data' => $lessors
        ]);
    }
    
}
