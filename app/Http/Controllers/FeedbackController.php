<?php
namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Rating;
use Illuminate\Http\Request;
Use Illuminate\Support\Facades\Auth;
use App\Models\Feedback;
use Illuminate\Validation\Rule;
use App\Enums\FeedbackType;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => [
                'required',
                Rule::in(
                    array_column(FeedbackType::cases(), 'value') // Proper enum value extraction
                )
            ],
            'message' => 'required|string|max:2000',
            'contact_email' => 'nullable|email|max:255'
        ]);

        if (Auth::check()) {
            $data = [
            'user_id' => Auth::id(),
            'type' => $validated['type'],
            'message' => $validated['message'],
            'contact_email' => $validated['contact_email'] ?? null
            ];
        }

        Feedback::create($data);

        return back()->with('success', 'Feedback submitted!');
    }
}