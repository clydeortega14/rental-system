<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
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
     * Fetch user kyc exists.
     */
    public function showKYC(Request $request)
    {
        $kyc = $request->user()->kyc;

        return response()->json($kyc);
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
            // 'selfie' => 'required|string',
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
                'kyc_verified' => false
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

    public function updateProfile(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            
            // Profile image
            'profile_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],

            // Contact fields
            'contact.mobile' => ['nullable', 'string', 'max:20'],

            // Billing address fields
            'billing_address.street'      => ['nullable', 'string', 'max:255'],
            'billing_address.barangay'    => ['nullable', 'string', 'max:255'],
            'billing_address.city'        => ['nullable', 'string', 'max:255'],
            'billing_address.region'      => ['nullable', 'string', 'max:255'],
            'billing_address.province'    => ['nullable', 'string', 'max:255'],
            'billing_address.country'     => ['nullable', 'string', 'max:255'],
            'billing_address.postal_code' => ['nullable', 'string', 'max:20'],
        ]);

        if ($request->hasFile('profile_image')) {
            // delete existing (strip /storage/ prefix)
            if ($user->avatar && Storage::disk('public')->exists(str_replace('/storage/', '', $user->avatar))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->avatar));
            }

            // store new & save public URL
            $imagePath = $request->file('profile_image')->store('profile_images', 'public');
            $user->avatar = Storage::url($imagePath);
        }

        $user->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        // Reset email verification if email changes
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // update contact info (if exists)
        if ($request->filled('contact')) {
            $user->contact()->updateOrCreate([], $request->input('contact'));
        }

        // update billing address (if exists)
        if ($request->filled('billing_address')) {
            $user->billingAddress()->updateOrCreate([], $request->input('billing_address'));
        }

        return Redirect::back()->with('success', 'Profile updated successfully!');
    }

    public function changePassword(Request $request): RedirectResponse
    {
        $request->validate([
            'current_password' => ['required'],
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        // Check if current password is correct
        if (!Hash::check($request->current_password, $request->user()->password)) {
            return back()->withErrors(['current_password' => 'The current password is incorrect.']);
        }

        // Update password
        $request->user()->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Password changed successfully.');
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
