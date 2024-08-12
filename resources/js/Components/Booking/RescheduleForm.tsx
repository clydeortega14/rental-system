import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import InputError from "../InputError";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import { useForm } from "@inertiajs/react";
import { Input } from "@mui/material";

export default function RescheduleForm({ bookingDetail, setIsRescheduled }) {
    const { data, setData, post, processing, errors } = useForm({
        action: "rescheduled",
        pick_up_date: "",
        pick_up_time: "",
        drop_off_date: "",
        drop_off_time: "",
    });

    const submitReschedule = (e) => {
        e.preventDefault();

        post(route("reservation.update.status", bookingDetail.uuid));
    };

    return (
        <form onSubmit={submitReschedule} className="p-6">
            <div className="flex">
                <div className="w-3/5 mb-4 mr-1">
                    <InputLabel htmlFor="pick-up-date" value="Pick-up date" />

                    <TextInput
                        value={data.pick_up_date}
                        name="pick_up_date"
                        className={`mt-1 w-full block ${errors.pick_up_date && "border-1 border-red-500"}`}
                        type="date"
                        onChange={(e) =>
                            setData("pick_up_date", e.target.value)
                        }
                    />

                    <InputError message={errors.pick_up_date} />
                </div>
                <div className="w-2/5 mb-4">
                    <InputLabel htmlFor="pick-up-time" value="Pick-up time" />

                    <TextInput
                        className={`mt-1 w-full block ${errors.pick_up_time && "border border-red-500"}`}
                        type="time"
                        value={data.pick_up_time}
                        name="pick_up_time"
                        onChange={() => setData("pick_up_time", e.target.value)}
                    />

                    <InputError message={errors.pick_up_time} />
                </div>
            </div>
            <div className="flex">
                <div className="w-3/5 mb-4 mr-1">
                    <InputLabel htmlFor="drop-off-date" value="Drop-off date" />

                    <TextInput
                        className={`mt-1 w-full block ${errors.drop_off_date && "border border-red-500"}`}
                        type="date"
                        value={data.drop_off_date}
                        name="drop_off_date"
                        onChange={() =>
                            setData("drop_off_date", e.target.value)
                        }
                    />

                    <InputError message={errors.drop_off_date} />
                </div>
                <div className="w-2/5 mb-4">
                    <InputLabel htmlFor="drop-off-time" value="Drop-off time" />

                    <TextInput
                        className={`mt-1 w-full block ${errors.drop_off_time && "border border-red-500"}`}
                        type="time"
                        value={data.drop_off_time}
                        name="drop_off_time"
                        onChange={() =>
                            setData("drop_off_time", e.target.value)
                        }
                    />

                    <InputError message={errors.drop_off_time} />
                </div>
            </div>
            <div className="mt-3 flex justify-end">
                <PrimaryButton className="mr-2" disabled={processing}>
                    Rescehdule Now
                </PrimaryButton>
                <SecondaryButton onClick={() => setIsRescheduled(false)}>
                    Cancel
                </SecondaryButton>
            </div>
        </form>
    );
}
