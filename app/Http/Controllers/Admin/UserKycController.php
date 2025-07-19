<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

use App\Models\User;
use App\Models\UserKYCVerification;

class UserKycController extends Controller
{
    public function index(Request $request)
    {

        $users = User::with([
                'contact',
                'company',
                'kyc',
            ])
            ->whereHas('kyc')
            ->paginate(10);
        
        /** @var LengthAwarePaginator $users */
        $users->withQueryString();

        return Inertia::render('Admin/User/KYC/Index', [
            'users' => $users
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $user = User::with('kyc')->findOrFail($id);

        if (!$user->kyc) {
            return response()->json(['message' => 'KYC record not found.'], 404);
        }

        $user->kyc->kyc_status = ucfirst($request->status);
        $user->kyc->kyc_verified_at = Carbon::now();
        $user->kyc->kyc_verified = true;
        $user->kyc->save();

        return back()->with('success', 'KYC status updated successfully.');
    }

}
