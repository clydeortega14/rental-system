<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SignupForm;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\LessorApplication;
use App\Models\Lessor;

class LessorController extends Controller
{
    public function index()
    {
        return inertia('Admin/Lessors/Index');
    }

    public function applications()
    {
        $applications = SignUpForm::with(['user.contact', 'user.company.documents', 'status'])
            ->whereHas('user', function ($query) {
                $query->where('submitForm', 1);
            })
            ->latest()
            ->latest()
            ->paginate(10)
            ->withQueryString();
        

        return inertia('Admin/Lessors/Applications/Index', [
            'applications' => $applications
        ]);
    }

    public function approveApplication($uuid)
    {
        // Find the user using UUID with related contact, company, and status
         $user = User::with([
            'contact',
            'company.documents',
            'signupForm.status',
        ])->where('uuid', $uuid)->firstOrFail();

        $now = Carbon::now();
        $adminId = Auth::guard('admin')->id();
        $lessorApplication = LessorApplication::updateOrCreate(
            ['lessoruser_id' => $user->id],
            [
                'uuid' => Str::uuid(),
                'encodedbyadmin_id' => $adminId,
                'status_id' => 2, // approved status id, adjust accordingly
                'approved_by' => $adminId,
                'approved_at' => $now,
            ]
            
        );
        $user->signupForm?->update([
            'status_id' => 2,
        ]);

        return back()->with('success', 'Approve!');
    }
}
