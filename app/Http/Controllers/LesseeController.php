<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\UserCompanyInformation;
use App\Models\User;
use App\Models\SignUpForm;
use App\Models\UserContactDetail;
use App\Services\BookingService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Lessor;
use App\Models\BusinessDocument;
use App\Models\LessorApplication;



class LesseeController extends Controller
{

    protected $booking_service;

    public function __construct(BookingService $booking_service)
    {
        $this->booking_service = $booking_service;
    }
    public function index()
    {
        $headersData = [
            ['name' => 'Item'],
            ['name' => 'Reservation Detail'],
            ['name' => 'Status'],
            ['name' => 'Booked By'],
            ['name' => 'Action']
        ];
        $user = Auth::user()?->loadMissing(['company', 'contact']);
        $isApprovedLessor = false;
        $lessorApplicationStatus = null;
        $shops = [];
        if ($user) {
            // Check approval
            $isApprovedLessor = Lessor::where('lessoruser_id', $user->id)
                ->whereHas('status', fn($query) => $query->where('name', 'approved'))
                ->exists();
            // Application status
            $application = \App\Models\LessorApplication::where('lessoruser_id', $user->id)->first();
            if ($application) {
                $lessorApplicationStatus = optional($application->status)->name;
            }
            // Get lessor
            $lessor = Lessor::where('lessoruser_id', $user->id)->first();
            if ($lessor) {
                // Paginate shops
                $shops = $lessor->shops()
                    ->select('id', 'lessor_id', 'name', 'description', 'location', 'created_at')
                    ->latest()
                    ->paginate(4) // change as needed
                    ->withQueryString();
            }
        }
        $bookings = $this->booking_service->formatBookings();
        return Inertia::render('Lessee/Landing', [
            'auth' => [
                'user' => $user,
            ],
            'bookings' => $bookings,
            'headerData' => $headersData,
            'isApprovedLessor' => $isApprovedLessor,
            'lessorApplicationStatus' => $lessorApplicationStatus,
            'shops' => $shops, // now paginated
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fullname' => 'required|string',
            'business_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'type' => 'nullable|string',
            'business_reg_number' => 'nullable|string',
            'business_address' => 'nullable|string',
            'street' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'region' => 'nullable|string',
            'province' => 'nullable|string',
            'city' => 'nullable|string',
            'barangay' => 'nullable|string',
            'country' => 'nullable|string',
            'tin' => 'nullable|string',
            'business_documents' => 'nullable|array',
            'business_documents.*' => 'file|mimes:pdf,jpg,jpeg,png|max:2048',
            'document_names' => 'nullable|array',
            'document_names.*' => 'string',
        ]);

        $userId = auth()->id();

        // ✅ Update User
        User::where('id', $userId)->update([
            'name' => $validated['fullname'],
            'email' => $validated['email'],
            'submitForm' => 1
        ]);

        // ✅ Update or create Company Info
        $company = UserCompanyInformation::updateOrCreate(
            ['user_id' => $userId],
            [
                'name' => $validated['business_name'],
                'tin' => $validated['tin'],
                'business_type' => $validated['type'],
                'business_reg_number' => $validated['business_reg_number'],
                'business_address' => $validated['business_address'],
                'street' => $validated['street'],
                'postal_code' => $validated['postal_code'],
                'region' => $validated['region'],
                'province' => $validated['province'],
                'city' => $validated['city'],
                'barangay' => $validated['barangay'],
                'country' => $validated['country'],
            ]
        );

        // ✅ Update or create Contact Info
        UserContactDetail::updateOrCreate(
            ['user_id' => $userId],
            ['mobile' => $validated['phone']]
        );

        // ✅ Save uploaded business documents
        $lastDocumentId = null;

        if ($request->hasFile('business_documents')) {
            $files = $request->file('business_documents');
            $names = $request->input('document_names', []);

            foreach ($files as $index => $file) {
                if ($file instanceof \Illuminate\Http\UploadedFile) {
                    $originalName = $file->getClientOriginalName();
                    $customName = $names[$index] ?? $originalName;

                    $filename = uniqid() . '_' . $originalName;
                    $path = $file->storeAs('business_documents', $filename, 'public');

                    $document = BusinessDocument::create([
                        'company_id'    => $company->id,
                        'document_name' => $customName,
                        'file_name'     => $originalName,
                        'file_path'     => $path,
                        'file_type'     => $file->getClientMimeType(),
                        'file_size'     => $file->getSize(),
                    ]);

                    $lastDocumentId = $document->id;
                }
            }
          
            // ✅ Update company with last uploaded document ID
            if ($lastDocumentId) {
                $documentCount = BusinessDocument::where('company_id', $company->id)->count();
                $company->update(['documents_total' => $documentCount]);
            }
        }

        // ✅ Update SignUpForm status
        $user = User::where('id', $userId)->first();

        SignUpForm::updateOrCreate(
            ['user_uuid' => $user->uuid],
            ['status_id' => $user->submitForm]
        );

        // ✅ Store in lessor_applications table
        LessorApplication::updateOrCreate(
            ['lessoruser_id' => $userId],
            [
                'uuid' => $company->uuid,
                'status_id' => 1, // e.g. pending
            ]
        );

        return back()->with('success', 'Company information has been saved.');
    }
}
