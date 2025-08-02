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
use App\Models\Category;
use App\Services\Category\CategoryService;
use App\Services\RentalItem\RentalItemService;
use App\Models\RentalAddItem as RentalListing;
use App\Models\Shop;
use App\Models\RecentActivity;


use Illuminate\Support\Facades\DB;
use App\Http\Traits\DateHelpers;
use App\Models\Booking;




class LesseeController extends Controller
{
    protected $booking_service;
    protected $category_service;
    protected $rental_items_service;

    public function __construct(
        BookingService $booking_service,
        CategoryService $category_service,
        RentalItemService $rental_items_service
    ) {
        $this->booking_service = $booking_service;
        $this->category_service = $category_service;
        $this->rental_items_service = $rental_items_service;
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

        $user = Auth::user()?->loadMissing(['company', 'contact', 'kyc', 'billingAddress']);
        $isApprovedLessor = false;
        $lessorApplicationStatus = null;
        $shops = [];
        $rentals = collect(); // Default rentals

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
            $lessor = Lessor::with('user')->where('lessoruser_id', $user->id)->first();

            if ($lessor) {
                $shops = $lessor->shops()
                    ->select('id', 'lessor_id', 'name', 'description', 'location', 'created_at')
                    ->latest()
                    ->paginate(10)
                    ->withQueryString();

                // Rentals logic added here
                $rawRentals = RentalListing::with(['toCategory', 'toShop'])
                    ->where('user_id', $lessor->user->id)
                    ->get();


                    $rentals = $rawRentals->map(function ($rental) {
                        return [
                            'id' => $rental->id,
                            'uuid' => $rental->uuid,
                            'name' => $rental->itemName,
                            'description' => $rental->description ?? '',
                            'categoryId' => $rental->category_id,
                            'categoryType' => optional($rental->toCategory)->name ?? '',
                            'reservationAmt' => $rental->price,
                            'media_paths' => $rental->media_paths ?? '',
                            'customFieldAnswers' => $rental->customFieldAnswers ?? [],
                            'address' => optional($rental->toShop)->location ?? '',
                            'shopId' => optional($rental->toShop)->id ?? null, // Keep null for type clarity
                        ];
                    });

            }
        }

        $categories = Category::with('customFields')->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'custom_fields' => $category->custom_fields, // Must exist
            ];
        });
        $bookings = $this->booking_service->getBookingsByUser(auth()->id());

        $lessorReservations = $this->getLessorReservations($user->id);
        $lessorDashboard = $this->getLessorDashboardData($user->id);
        $recentActivities = $this->getRecentActivities($user->id);

        return Inertia::render('Lessee/Landing', [
            'auth' => [
                'user' => $user,
            ],
            'bookings' => $bookings,
            'headerData' => $headersData,
            'isApprovedLessor' => $isApprovedLessor,
            'lessorApplicationStatus' => $lessorApplicationStatus,
            'lessorReservations' => $lessorReservations,
            'lessorDashboard' => $lessorDashboard,
            'shops' => $shops,
            'categories' => $categories,
            'rentals' => $rentals,
            'recentActivities' => $recentActivities,
            'user' => $user,
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

        RecentActivity::create([
            'user_id' => $userId,
            'message' => 'You applied to become a Lessor',
            'status' => '1',
        ]);

        return back()->with('success', 'Company information has been saved.');
    }

    private function getLessorReservations($userId)
    {
        $lessor = Lessor::with(['shops', 'user'])
            ->where('lessoruser_id', $userId)
            ->first();

        if (!$lessor) {
            return []; // Return empty array if not a lessor
        }

        $bookings = Booking::with(['bookedBy', 'rentalListing.toShop', 'bookingStatus'])
            ->whereHas('rentalListing', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->get();

        $grouped = $bookings->groupBy('rentalListing.id');

        return $bookings->map(function ($booking) use ($grouped) {
            $conflicts = $grouped[$booking->rentalListing->id]->filter(function ($other) use ($booking) {
                return $other->id !== $booking->id &&
                    $booking->start_date < $other->end_date &&
                    $booking->end_date > $other->start_date;
            });
            
            return [
                'id' => $booking->id,
                'customerName' => $booking->bookedBy?->name ?? 'N/A',
                'itemName' => $booking->rentalListing?->itemName ?? '',
                'status' => strtoupper($booking->bookingStatus?->name ?? 'PENDING'),
                'startDate' => $booking->start_date,
                'startTime' => $booking->start_time,
                'endDate' => $booking->end_date,
                'endTime' => $booking->end_time,
                'totalPrice' => $booking->total_cost,
                'hasConflict' => $conflicts->isNotEmpty(),
                'rentalItem' => [
                    'name' => $booking->rentalListing?->itemName ?? '',
                    'media_paths' => $booking->rentalListing?->media_paths ?? '',
                    'location' => $booking->rentalListing?->toShop?->location ?? '',
                    'description' => $booking->rentalListing?->description ?? '',
                ],
                'contactInfo' => $booking->bookedBy?->email ?? '',
            ];
        });
    }

    private function getLessorDashboardData($userId)
    {
        $lessor = Lessor::with(['shops', 'user'])
            ->where('lessoruser_id', $userId)
            ->first();

        if (!$lessor) {
            return null;
        }

        $lessorUserId = $lessor->user->id;

        $totalIncome = Booking::whereHas('rentalListing', fn($q) =>
            $q->where('user_id', $lessorUserId))
            ->where('status', 2) // Assuming 2 = completed/reserved
            ->sum('total_cost');

        $monthlyIncome = Booking::whereHas('rentalListing', fn($q) =>
            $q->where('user_id', $lessorUserId))
            ->where('status', 2)
            ->whereMonth('start_date', now()->month)
            ->whereYear('start_date', now()->year)
            ->sum('total_cost');

        $upcoming = Booking::with(['bookedBy', 'rentalListing'])
            ->whereHas('rentalListing', fn($q) =>
                $q->where('user_id', $lessorUserId))
            ->whereDate('start_date', '>=', now())
            ->orderBy('start_date')
            ->limit(5)
            ->get()
            ->map(fn($b) => [
                'property' => $b->rentalListing?->itemName,
                'date' => $b->start_date,
                'lessee' => $b->bookedBy?->name,
            ]);

        $chartData = Booking::selectRaw('DATE_FORMAT(start_date, "%b") as month, COUNT(*) as reservations')
            ->whereHas('rentalListing', fn($q) =>
                $q->where('user_id', $lessorUserId))
            ->whereBetween('start_date', [now()->subMonths(5)->startOfMonth(), now()])
            ->groupByRaw('MONTH(start_date), DATE_FORMAT(start_date, "%b")')
            ->orderByRaw('MIN(start_date)')
            ->get();

        return [
            'lessorName' => $lessor->user->name,
            'incomeSummary' => [
                'total' => $totalIncome,
                'monthly' => $monthlyIncome,
            ],
            'upcomingReservations' => $upcoming,
            'reservationChartData' => $chartData,
        ];
    }

    private function getRecentActivities($userId)
    {
        return RecentActivity::where('user_id', $userId)
            ->latest()
            ->take(10)
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'message' => $activity->message,
                    'status' => $activity->status,
                    'date' => $activity->created_at->format('Y-m-d'),
                ];
            });
    }
}
