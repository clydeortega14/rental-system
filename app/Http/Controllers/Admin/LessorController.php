<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SignUpForm;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\LessorApplication;
use App\Models\Lessor;
use App\Models\RecentActivity;

class LessorController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $lessors = Lessor::with([
                'user.contact',
                'user.company',
                'status',
            ])
            ->whereHas('user', function ($query) use ($search) {
                if ($search) {
                    $query->where('name', 'like', '%' . $search . '%')
                        ->orWhereHas('company', function ($q) use ($search) {
                            $q->where('name', 'like', '%' . $search . '%');
                        });
                }
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return inertia('Admin/Lessors/Lists/Index', [
            'lessors' => $lessors,
            'filters' => [
                'search' => $search,
            ],
        ]);
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
        $user = User::with([
            'contact',
            'company.documents',
            'signupForm.status',
        ])->where('uuid', $uuid)->firstOrFail();

        $now = now();
        $adminId = Auth::guard('admin')->id();

        $companyUuid = $user->company?->uuid ?? (string) Str::uuid();

        // Update or create lessor_application row for this user
        $lessorApplication = LessorApplication::updateOrCreate(
            ['lessoruser_id' => $user->id],
            [
                'encodedbyadmin_id' => $adminId,
                'status_id' => 2,  // approved
                'approved_by' => $adminId,
                'approved_at' => $now,
            ]
        );

        // Update signupForm status if applicable
        $user->signupForm?->update(['status_id' => 2]);

        // Update or create Lessor related record
        Lessor::updateOrCreate(
            ['lessorapplication_id' => $lessorApplication->id],
            [
                'uuid' => $companyUuid,
                'lessoruser_id' => $lessorApplication->lessoruser_id,
                'status_id' => 2,
                'approvedbyuser_id' => $adminId,
                'approved_at' => $now,
            ]
        );

        RecentActivity::create([
            'user_id' => $user->id,
            'message' => 'Your lessor application has been approved.',
            'status' => 1,
        ]);

        return back()->with('success', 'Application approved successfully!');
    }
}
