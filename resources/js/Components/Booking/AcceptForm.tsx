import { useForm } from "@inertiajs/react";
import { Reservation } from "@/Interface/Reservation";
import PrimaryButton from "../PrimaryButton";

interface Props {
    bookingDetail: Reservation;
}

export default function AcceptForm({ bookingDetail }: Props) {
    const { post, processing } = useForm({
        action: "accept",
    });

    const submitAccept = (e) => {
        e.preventDefault();

        post(route("reservation.update.status", bookingDetail.uuid));
    };

    return (
        <form onSubmit={submitAccept}>
            <PrimaryButton className="mr-2 block" disabled={processing}>
                Accept
            </PrimaryButton>
        </form>
    );
}
