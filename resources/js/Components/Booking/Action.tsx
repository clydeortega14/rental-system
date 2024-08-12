import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { Reservation } from "@/Interface/Reservation";
import SuccessButton from "../SuccessButton";
import CompleteBookingForm from "./CompleteForm";
import AcceptForm from "./AcceptForm";

interface IAction {
    bookingDetail: Reservation;
    onAcceptBooking: (e) => void;
    setShowTextBox: (status: boolean) => void;
    setIsRescheduled: (status: boolean) => void;
}

export default function Action({
    bookingDetail,
    onAcceptBooking,
    setShowTextBox,
    setIsRescheduled,
}: IAction) {
    return (
        <div className="mb-7 flex">
            {bookingDetail.status.name === "pending" && (
                <AcceptForm bookingDetail={bookingDetail} />
            )}

            {bookingDetail.status.name == "reserved" && (
                <CompleteBookingForm bookingDetail={bookingDetail} />
            )}

            {bookingDetail.status.name === "reserved" && (
                <SecondaryButton
                    className="mr-2 block"
                    onClick={() => {
                        setIsRescheduled(true);
                    }}
                >
                    Reschedule
                </SecondaryButton>
            )}

            {bookingDetail.status.name === "reserved" && (
                <DangerButton
                    className="mr-2 block"
                    onClick={() => {
                        setShowTextBox(true);
                    }}
                >
                    Cancel
                </DangerButton>
            )}
        </div>
    );
}
