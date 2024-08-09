import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

interface IAction {
    onAcceptBooking: (e) => void;
    processing: boolean;
    setShowTextBox: (status: boolean) => void;
}

export default function Action({
    onAcceptBooking,
    processing,
    setShowTextBox,
}: IAction) {
    return (
        <div className="mb-7">
            <PrimaryButton
                className="mr-2 block"
                disabled={processing}
                onClick={onAcceptBooking}
            >
                Accept
            </PrimaryButton>

            <SecondaryButton className="mr-2 block">Reschedule</SecondaryButton>

            <DangerButton
                className="mr-2 block"
                onClick={() => {
                    setShowTextBox(true);
                }}
            >
                Cancel
            </DangerButton>
        </div>
    );
}
