import { Head, useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import CustomTable from "@/Components/CustomTable";
import SecondaryButton from "@/Components/SecondaryButton";
import BookingAction from "@/Components/Booking/Action";
import Modal from "@/Components/Modal";
import { useState, FormEventHandler, useEffect } from "react";
import { Reservation } from "@/Interface/Reservation";
import ReasonForm from "@/Components/Booking/ReasonForm";
import RescheduleForm from "@/Components/Booking/RescheduleForm";
import {Link} from "@inertiajs/react";
import RenterLayout from "@/Layouts/RenterLayout";
import { AlertCircle, Calendar, CheckCircle, ChevronRight, Clock, XCircle } from "lucide-react";
// import { getItemById } from "@/data/bookingsData";
import { formatDateDisplay, formatPrice } from "@/utils/dateUtils";
import { BookingDetails } from "@/types/rental";
import Button from "@/Components/Renter/ui/Button";
import TabPanel from "@/Components/Renter/ui/TabPanel";


interface Props {
    bookings: BookingDetails[];
    status: string;
}

function Index({ bookings, status }: Props) {
    // Current User state
    const auth = usePage<PageProps>().props.auth;

    // show booking detail modal state

    // on edit booking function
    // const editBooking = (id: number) => {
    //     let find_booking = bookings.find((book) => book.id === id);
    //     setBookingDetail(find_booking);
    // };

    const [activeTab, setActiveTab] = useState<string>('Upcoming');

    const getStatusColor = (status: string) => {
        switch (status) {
        case 'confirmed': return 'bg-green-100 text-green-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'canceled': return 'bg-red-100 text-red-800';
        case 'completed': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed': return <CheckCircle className="h-5 w-5 text-green-600" />;
            case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
            case 'canceled': return <XCircle className="h-5 w-5 text-red-600" />;
            case 'completed': return <CheckCircle className="h-5 w-5 text-blue-600" />;
            default: return null;
        }
    };

    const filterBookings = () => {
        const today = new Date();

        if (activeTab === 'Upcoming') {
            return bookings.filter(
                booking =>
                    booking.endDate && // ✅ ensure it's defined
                    new Date(booking.endDate) >= today &&
                    booking.status !== 'cancelled'
            );
        } else if (activeTab === 'Past') {
            return bookings.filter(
                booking =>
                    !booking.endDate || // if no endDate, treat it as past
                    new Date(booking.endDate) < today ||
                    booking.status === 'cancelled'
            );
        }

        return bookings;
    };

    const filteredBookings = filterBookings();

    return (
        <RenterLayout>
            <Head title="Reservations" />

            {/* <div className="py-12"> */}
                {/* <Link 
                    href={route('booking.calendar')} 
                    
                    className={`py-7 px-7 ${route().current('booking.calendar') ? "text-blue-500" : "text-gray-500"}`}
                >
                    Calendar View
                </Link> */}


                <div className="px-6 lg:px-8 lg:py-8">
                
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
                        <p className="text-gray-600">Manage your rental bookings and view your rental history</p>
                    </div>

                    <TabPanel 
                        tabPanels={["Upcoming", "Past", "All bookings"]} 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab}
                    />

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <CustomTable>
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map(booking => {
                                    // const item = getItemById(Number(booking.itemId));
                                    return (
                                        <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-col md:flex-row items-start md:items-center">
                                            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                                                <img
                                                    src={booking.rentalItem && booking.rentalItem.imageUrl}
                                                    alt={booking.rentalItem && booking.rentalItem.name}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-800">{booking.rentalItem && booking.rentalItem.name}</h3>
                                                    <div className="mt-2 md:mt-0">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                        {getStatusIcon(booking.status)}
                                                        <span className="ml-1 capitalize">{booking.status}</span>
                                                    </span>
                                                    </div>
                                                </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                                                <div className="flex items-center text-gray-600">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                <span>
                                                {booking.startDate && booking.endDate
                                                    ? `${formatDateDisplay(booking.startDate.toString())} - ${formatDateDisplay(booking.endDate.toString())}`
                                                    : 'Date not available'}
                                                </span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                <Clock className="h-4 w-4 mr-2" />
                                                <span>Booking ID: {booking.id}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                <div className="text-gray-800">
                                                    <span className="font-semibold">Total:</span> {formatPrice(booking.totalPrice ?? 0)}
                                                </div>
                                                <div className="flex mt-4 md:mt-0 space-x-2">
                                                    {booking.status === 'confirmed' && (
                                                        <Button variant="outline" size="sm">
                                                            Cancel
                                                        </Button>
                                                    )}
                                                    <Link href={route('booking.view', {
                                                        uuid: booking.uuid
                                                    })}>
                                                        <Button variant="primary" size="sm">
                                                            View Item
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="hidden md:block ml-4">
                                            <ChevronRight className="h-6 w-6 text-gray-400" />
                                            </div>
                                        </div>
                                        </div>
                                    );
                                    })
                                ) : (
                                    <div className="py-16 text-center">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                                        <p className="text-gray-600 mb-6">You don't have any {activeTab} bookings at the moment</p>
                                        <Link href={route('landing.page.index')}>
                                            <Button variant="primary">Browse Rentals</Button>
                                        </Link>
                                    </div>
                                )}
                            </CustomTable>
                        </div>
                    </div>
                </div>
            {/* </div> */}

            {/* Booking Details Modal */}
            
        </RenterLayout>
    );
}

export default Index;
