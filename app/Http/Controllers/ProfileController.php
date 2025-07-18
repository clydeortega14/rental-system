<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\UserKYCVerification;

class ProfileController extends Controller
{
    /**
     * Display the user's profile.
     */
    public function profile(Request $request): Response
    {
        $user = Auth::user()->load(['company', 'contact', 'billingAddress', 'cardDetail', 'kyc']);

        return Inertia::render('User/Profile', [
            'user' => $user
        ]);
    }

    /**
     * Store user kyc for verification.
     */
    public function userKYC(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'document_type' => 'required|string|max:100',
            'document_number' => 'required|string|max:100',
            'document_image' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'selfie' => 'required|string',
        ]);

        // Check if KYC exists
        $kyc = UserKycVerification::where('user_id', auth()->id())->first();

        // Delete old files if resubmitting
        if ($kyc) {
            if ($kyc->document_path && Storage::disk('public')->exists($kyc->document_path)) {
                Storage::disk('public')->delete($kyc->document_path);
            }

            if ($kyc->selfie_path && Storage::disk('public')->exists($kyc->selfie_path)) {
                Storage::disk('public')->delete($kyc->selfie_path);
            }
        }

        // Store new document file
        $documentPath = $request->file('document_image')->store('kyc_ids', 'public');

        // Decode base64 selfie
        $selfiePath = null;
        if (!empty($validated['selfie'])) {
            $image = preg_replace('/^data:image\/\w+;base64,/', '', $validated['selfie']);
            $image = str_replace(' ', '+', $image);
            $imageData = base64_decode($image);

            if ($imageData === false) {
                return redirect()->back()->withErrors(['selfie' => 'Invalid selfie image data.']);
            }

            $selfieFilename = 'selfies/' . uniqid('selfie_', true) . '.jpg';
            Storage::disk('public')->put($selfieFilename, $imageData);
            $selfiePath = $selfieFilename;
        }

        // Create or update the KYC record
        UserKycVerification::updateOrCreate(
            ['user_id' => auth()->id()],
            [
                'full_name' => $validated['full_name'],
                'document_number' => $validated['document_number'],
                'document_type' => $validated['document_type'],
                'document_path' => $documentPath,
                'selfie_path' => $selfiePath,
                'kyc_status' => 'Pending',
            ]
        );

        return redirect()->back()->with('success', 'KYC submitted successfully.');
    }
    
    /**
     * Edit the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Account Settings 
     */

    public function accountSettings(Request $request) : Response
    {
        return Inertia::render('Profile/AccountSettings', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
}
