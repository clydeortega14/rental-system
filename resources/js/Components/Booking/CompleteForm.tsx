import SuccessButton from "../SuccessButton";
import { useForm } from "@inertiajs/react";
import { Reservation } from "@/Interface/Reservation";

interface Props {
    bookingDetail: Reservation;
}
export default function CompleteBookingForm({ bookingDetail }: Props) {
    const { post, processing } = useForm({
        action: "completed",
    });

    const submitComplete = (e) => {
        e.preventDefault();

        post(route("reservation.update.status", bookingDetail.uuid));
    };

    return (
        <form onSubmit={submitComplete}>
            <SuccessButton className="mr-2" type="submit" disabled={processing}>
                Complete
            </SuccessButton>
        </form>
    );
}
