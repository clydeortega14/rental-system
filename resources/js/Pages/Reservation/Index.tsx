import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import CustomTable from "@/Components/CustomTable";
import SecondaryButton from "@/Components/SecondaryButton";
import BookingAction from "@/Components/Booking/Action";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "@/Components/Modal";
import { useState, FormEventHandler, useEffect } from "react";
import { Reservation } from "@/Interface/Reservation";
import ReasonForm from "@/Components/Booking/ReasonForm";
import RescheduleForm from "@/Components/Booking/RescheduleForm";

type Header = {
    name: string;
};

function Index({ headerData, bodyData, status }) {
    // Current User state
    const auth = usePage<PageProps>().props.auth;

    // show booking detail modal state
    const [showBookingDetailModal, setShowBookingDetailModal] = useState(false);

    // Reason form cancelling state
    const [showTextBox, setShowTextBox] = useState<boolean>(false);

    // Reschedule State
    const [isRescheduled, setIsRescheduled] = useState<boolean>(false);

    // selected booking detail state
    const [bookingDetail, setBookingDetail] = useState<Reservation | null>(
        null,
    );

    // bookings list state
    const [bookings, setBookings] = useState<Reservation[]>(bodyData);

    // on close modal function
    const onCloseBookingModal = () => {
        setShowBookingDetailModal(false);
    };

    // on edit booking function
    const editBooking = (id: number) => {
        let find_booking = bookings.find((book) => book.id === id);
        setBookingDetail(find_booking);
    };

    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-base text-gray-800 leading-tight">
                    Reservations
                </h2>
            }
        >
            <Head title="Reservations" />

            <div className="py-12">
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <CustomTable headerData={headerData}>
                                {bodyData.map((body) => (
                                    <tr key={body.id} className="text-center">
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center">
                                                <img
                                                    src={
                                                        body.rental_item
                                                            .images[0].src
                                                    }
                                                    className="h-12 w-24 object-contain"
                                                />
                                                {body.rental_item.itemName}
                                            </div>
                                        </td>
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                            <p>
                                                <b>From:</b> {body.pick_up_date}
                                            </p>
                                            <p>
                                                <b>To:</b> {body.drop_off_date}
                                            </p>
                                        </td>
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                            <span className={`p-1 ${body.status.className} rounded-lg`}>
                                                {body.status.name}
                                            </span>
                                        </td>
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                            {body.booked_by.name}
                                        </td>
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                            <SecondaryButton
                                                className="mr-2"
                                                onClick={() => {
                                                    setShowBookingDetailModal(
                                                        true,
                                                    );

                                                    editBooking(body.id);
                                                }}
                                            >
                                                <FaEdit />
                                            </SecondaryButton>

                                            <SecondaryButton>
                                                <FaTrashAlt />
                                            </SecondaryButton>
                                        </td>
                                    </tr>
                                ))}
                            </CustomTable>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Details Modal */}
            <Modal show={showBookingDetailModal} onClose={onCloseBookingModal}>
                <div className="p-6">
                    <p>{status}</p>

                    {!showTextBox && !isRescheduled && (
                        <BookingAction
                            bookingDetail={bookingDetail}
                            setShowTextBox={setShowTextBox}
                            setIsRescheduled={setIsRescheduled}
                        />
                    )}

                    {/* Reason for Rescheduling */}
                    {isRescheduled && (
                        <RescheduleForm
                            bookingDetail={bookingDetail}
                            setIsRescheduled={setIsRescheduled}
                        />
                    )}

                    {/* Reason for cancelling component */}
                    {showTextBox && (
                        <ReasonForm
                            setShowTextBox={setShowTextBox}
                            bookingDetail={bookingDetail}
                        />
                    )}

                    <div className="mb-7 border-b border-gray-300 pb-4">
                        <img
                            src={bookingDetail?.rental_item.images[0].src}
                            className="h-48 w-48 object-contain"
                        />
                    </div>

                    <div className="mb-7 border-b border-gray-300 pb-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            Pick-up date / time
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            {bookingDetail?.pick_up_date}{" "}
                            {bookingDetail?.pick_up_time}
                        </p>
                    </div>

                    <div className="mb-7 border-b border-gray-300 pb-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            Pick-up location
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            {bookingDetail?.pick_up_location}
                        </p>
                    </div>

                    <div className="mb-7 border-b border-gray-300 pb-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            Drop-off date / time
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            {bookingDetail?.drop_off_date}{" "}
                            {bookingDetail?.drop_off_time}
                        </p>
                    </div>

                    <div className="mb-7 border-b border-gray-300 pb-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            Drop-off location
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            {bookingDetail?.drop_off_location}
                        </p>
                    </div>

                    <div className="mb-7 border-b border-gray-300 pb-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            Item Description
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            {bookingDetail?.rental_item.itemName}
                        </p>
                    </div>

                    <div className="mb-7 border-b border-gray-300 pb-4">
                        <h2 className="text-lg font-medium text-gray-900 mb-2">
                            Status
                        </h2>
                        <span className={`p-1 ${bookingDetail?.status.className} rounded-md`}>
                            {bookingDetail?.status.name}
                        </span> <br />
                        <small className="text-slate-500 text-xs">Completed at { bookingDetail?.status.name === 'completed' && bookingDetail?.completed_at}</small>
                    </div>

                    <div className="mb-7 border-b border-gray-300 pb-4">
                        <h2 className="text-lg font-medium text-gray-900 mb-2">
                            Booked By
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            {bookingDetail?.booked_by.name}
                        </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={onCloseBookingModal}>
                            close
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

export default Index;
