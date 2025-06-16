import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import FileUploader from "@/Components/FileUploader";
import motorcycle from '@/../../resources/img/banner/2.png'
import banner from '@/../../resources/img/banner/banner1.png'
import icon from '@/../../resources/img/notVerifiedv1.png'

export default function Dashboard({ auth }: PageProps) {

    console.log(auth)

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            {/* <button
                onClick={() => (window.location.href = "/UserProfile")}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Go to User Profile
            </button> */}
            <div className="py-12 min-h-screen">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-start">
                        {/* Welcome Card */}
                        <div className="flex flex-col gap-6 h-full">
                            <div className="bg-white shadow rounded-lg p-6 flex flex-col-reverse lg:flex-row items-center min-h-[300px]">
                                <div className="flex-1">
                                <h4 className="text-2xl font-bold text-gray-900 mb-1">
                                    Welcome, {auth.user.name}
                                </h4>
                                <p className="text-gray-600 mb-4">
                                    I offer rent options for gadgets, houses, apartments, hotels, and all kinds of rentals across the Philippines.
                                </p>

                                <div className="flex flex-wrap items-center gap-8 mb-6">
                                    <div>
                                    <p className="text-sm text-gray-500 mb-1">Total No of Items</p>
                                    <h3 className="text-3xl font-bold text-gray-900">564</h3>
                                    </div>
                                    <div>
                                    <p className="flex items-center text-sm text-gray-500 mb-2">
                                        <span className="w-2 h-2 bg-violet-500 rounded-full inline-block mr-2"></span>
                                        <span className="font-semibold text-gray-900 mr-1">80</span> In Rental Gadgets
                                    </p>
                                    <p className="flex items-center text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full inline-block mr-2"></span>
                                        <span className="font-semibold text-gray-900 mr-1">96</span> Upcoming Pending
                                    </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <a
                                    href="/reservations"
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
                                    >
                                    <i className="ti ti-eye mr-2" /> Reservations
                                    </a>
                                    <a
                                    href="/add-car"
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-900 transition"
                                    >
                                    <i className="ti ti-plus mr-2" /> Become a Lessor !
                                    </a>
                                </div>
                                </div>

                                <div className="w-full max-w-xs mt-6 lg:mt-0 lg:ml-4">
                                <img
                                    src={icon}
                                    alt="Welcome Illustration"
                                    className="object-contain w-full h-full"
                                />
                                </div>
                            </div>

                            {/* Cards below Welcome card */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
                                <img src="/path-to-gadgets-icon.svg" alt="Gadgets" className="mb-4 w-12 h-12" />
                                <h5 className="text-lg font-semibold mb-2">Gadgets</h5>
                                <p className="text-sm text-gray-600">Rent gadgets including cameras, laptops, and more.</p>
                                </div>
                                <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
                                <img src="/path-to-house-icon.svg" alt="House" className="mb-4 w-12 h-12" />
                                <h5 className="text-lg font-semibold mb-2">House & Apartment</h5>
                                <p className="text-sm text-gray-600">Affordable houses and apartments for rent.</p>
                                </div>
                                <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
                                <img src="/path-to-hotel-icon.svg" alt="Hotel" className="mb-4 w-12 h-12" />
                                <h5 className="text-lg font-semibold mb-2">Hotels</h5>
                                <p className="text-sm text-gray-600">Comfortable hotels across the Philippines.</p>
                                </div>
                            </div>
                            </div>
                        

                        {/* Right Column - Newly Added Cars */}
                        <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                                <h5 className="text-lg font-semibold text-gray-900">Newly Added Cars! Rent mo na yan!</h5>
                                <a href="/cars" className="text-blue-600 underline text-sm font-medium hover:text-blue-800 transition">
                                    View All
                                </a>
                            </div>

                            <div className="mb-4">
                                <img
                                    src={banner}
                                    alt="New Car"
                                    className="rounded w-full object-cover"
                                />
                            </div>

                            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Sedan</p>
                                    <h6 className="text-base font-semibold text-gray-900">1.5 Eco Sports ST-Line 115CV</h6>
                                </div>
                                <h6 className="text-base font-semibold text-gray-900">
                                    $280 <span className="font-normal text-gray-400">/day</span>
                                </h6>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="bg-gray-50 border rounded-lg p-2 text-center">
                                    <h6 className="text-sm font-semibold text-gray-900">Fuel Type</h6>
                                    <span className="text-xs text-gray-600">Petrol</span>
                                </div>
                                <div className="bg-gray-50 border rounded-lg p-2 text-center">
                                    <h6 className="text-sm font-semibold text-gray-900">Passengers</h6>
                                    <span className="text-xs text-gray-600">03</span>
                                </div>
                                <div className="bg-gray-50 border rounded-lg p-2 text-center">
                                    <h6 className="text-sm font-semibold text-gray-900">Driving Type</h6>
                                    <span className="text-xs text-gray-600">Self</span>
                                </div>
                            </div>

                            <a
                                href="/car-details"
                                className="bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-800 text-sm font-medium flex items-center justify-center hover:bg-gray-100 transition"
                            >
                                View Details
                                <i className="ti ti-chevron-right ml-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
