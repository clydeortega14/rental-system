import TextArea from "@/Components/TextArea";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import { useForm } from "@inertiajs/react";
import { Reservation } from "@/Interface/Reservation";
import InputError from "../InputError";

interface IReasonForm {
    setShowTextBox: (status: boolean) => void;
    bookingDetail: Reservation;
}

export default function ReasonForm({
    setShowTextBox,
    bookingDetail,
}: IReasonForm) {
    const { data, setData, post, processing, errors, reset } = useForm({
        reason: "",
        action: "cancelled",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("reservation.update.status", bookingDetail.uuid), {
            onSuccess: () => {
                reset("reason");
                setShowTextBox(false);
            },
        });
    };

    return (
        <div className="mb-12">
            <form onSubmit={submit}>
                <div className="px-6">
                    <TextArea
                        className={`block w-full ${errors.reason && "border-red-400"}`}
                        placeholder="Reason for cancelling..."
                        value={data.reason}
                        onChange={(e) => setData("reason", e.target.value)}
                    />

                    <InputError message={errors.reason} className="mb-4" />
                </div>
                <div className="pl-6">
                    <SecondaryButton className="mr-2" type="submit">
                        Submit
                    </SecondaryButton>
                    <PrimaryButton
                        className="pl-6"
                        onClick={() => {
                            setShowTextBox(false);
                        }}
                    >
                        Return
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
}
