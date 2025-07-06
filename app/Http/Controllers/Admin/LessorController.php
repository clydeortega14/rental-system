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

        $now = Carbon::now();
        $adminId = Auth::guard('admin')->id();
        $companyUuid = $user->company?->uuid ?? Str::uuid();

        $lessorApplication = LessorApplication::updateOrCreate(
            ['lessoruser_id' => $user->id],
            [
                'uuid' => $companyUuid,
                'encodedbyadmin_id' => $adminId,
                'status_id' => 2,
                'approved_by' => $adminId,
                'approved_at' => $now,
            ]
            
        );
        $user->signupForm?->update([
            'status_id' => 2,
        ]);
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
        return back()->with('success', 'Approve!');
    }
}
