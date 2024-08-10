import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { Reservation } from "@/Interface/Reservation";
import SuccessButton from "../SuccessButton";
import CompleteBookingForm from "./CompleteForm";

interface IAction {
    bookingDetail: Reservation;
    onAcceptBooking: (e) => void;
    processing: boolean;
    setShowTextBox: (status: boolean) => void;
}

export default function Action({
    bookingDetail,
    onAcceptBooking,
    processing,
    setShowTextBox,
}: IAction) {
    return (
        <div className="mb-7 flex">
            {bookingDetail.status.name !== "reserved" && (
                <PrimaryButton
                    className="mr-2 block"
                    disabled={processing}
                    onClick={onAcceptBooking}
                >
                    Accept
                </PrimaryButton>
            )}

            <CompleteBookingForm bookingDetail={bookingDetail} />

            <SecondaryButton className="mr-2 block" disabled={processing}>
                Reschedule
            </SecondaryButton>

            <DangerButton
                className="mr-2 block"
                onClick={() => {
                    setShowTextBox(true);
                }}
                disabled={processing}
            >
                Cancel
            </DangerButton>
        </div>
    );
}
