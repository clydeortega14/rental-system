import Checkbox from "@/Components/Checkbox";
import { useForm, usePage } from "@inertiajs/react";
import { Iitem } from "@/Interface/Item";
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import { PageProps } from "@/types";

function ItemScheduleDetail({ item }: Iitem) {
    const false_error_message = usePage<PageProps>().props.flash.error_message;

    const { data, setData, post, processing, errors, reset } = useForm({
        item_uuid: item.uuid,
        drop_off_diff_loc: false,
        pick_up_location: "",
        drop_off_location: "",
        pick_up_date: "",
        pick_up_time: "",
        drop_off_date: "",
        drop_off_time: "",
        partial_total: 0,
        service_fee: 450,
        total_cost: 0,
        duration: 0
    });

    const [ numOfDays, setNumOfDays ] = useState<number>(0);

    useEffect(() => {
        calculateTotalCost();
    }, [item.price, data.total_cost, data.duration, data.partial_total]);

    const calculateTotalCost = () => {

        let partial = Number(item.price) * data.duration;
        let overall_total = partial + data.service_fee;

        data.partial_total = partial;
        data.total_cost = overall_total;

        setData("partial_total", partial);
        setData("total_cost", overall_total);
    };

    const bookingSubmit = (e) => {
        e.preventDefault();

        post(route("booking.store"));
    };

    // calculate 2 days between two days
    const calculateDays = (start_date, end_date) => {
        let value = Math.round((end_date - start_date) / (1000 * 60 * 60 * 24) );

        data.duration = value;
        setData("duration", value);
    }

    useEffect(() => {
        if(data.pick_up_date !== "" && data.drop_off_date !== "")
        {
            calculateDays(new Date(data.pick_up_date), new Date(data.drop_off_date))
        }
        
    }, [data.pick_up_date, data.drop_off_date, data.duration])

    return (
        <>
            <div className="border border-gray-200 p-4 rounded-lg shadow-xl bg-white mb-4">
                <div className="border-gray-900">
                    {false_error_message && (
                        <p className="p-4 border-2 border-red-300 bg-red-50 rounded-xl mb-4">
                            {false_error_message}
                        </p>
                    )}
                </div>
                <form className="w-full px-3" onSubmit={bookingSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="block mb-4 ml-4">
                            <label
                                className="flex items-center"
                                htmlFor="drop-off-diff-loc"
                            >
                                <Checkbox
                                    id="drop-off-diff-loc"
                                    name="drop_off_diff_loc"
                                    checked={data.drop_off_diff_loc}
                                    onChange={(e) =>
                                        setData(
                                            "drop_off_diff_loc",
                                            e.target.checked,
                                        )
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Drop off to different location
                                </span>
                            </label>
                        </div>

                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="pick-up-drop-off-location"
                            >
                                Pick-up/Drop-off Location
                            </label>
                            <input
                                onChange={(e) =>
                                    setData("pick_up_location", e.target.value)
                                }
                                className={`${errors.pick_up_location && "border-red-400"} appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                id="pick-up-drop-off-location"
                            />

                            <InputError
                                message={errors.pick_up_location}
                                className="mt-2"
                            />
                        </div>
                        {data.drop_off_diff_loc && (
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="pick-up-drop-off-location"
                                >
                                    Drop-off Location
                                </label>
                                <input
                                    onChange={(e) =>
                                        setData(
                                            "drop_off_location",
                                            e.target.value,
                                        )
                                    }
                                    value={
                                        data.drop_off_diff_loc
                                            ? data.drop_off_location
                                            : data.pick_up_location
                                    }
                                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="pick-up-drop-off-location"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="pick-up-date"
                            >
                                Pick-up
                            </label>
                            <input
                                name="pick_up_date"
                                onChange={(e) =>
                                    setData("pick_up_date", e.target.value)
                                }
                                className={`${errors.pick_up_date ? "border-red-400" : ""} appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                                id="pick-up-date"
                                type="date"
                                value={data.pick_up_date}
                            />

                            <InputError
                                message={errors.pick_up_date}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="pick-up-time"
                            >
                                Pick-up time
                            </label>
                            <input
                                name="pick_up_time"
                                onChange={(e) =>
                                    setData("pick_up_time", e.target.value)
                                }
                                value={data.pick_up_time}
                                className={`${errors.pick_up_time ? "border-red-400" : ""} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                id="pick-up-time"
                                type="time"
                            />

                            <InputError
                                message={errors.pick_up_time}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="drop-off-date"
                            >
                                Drop off
                            </label>
                            <input
                                name="drop_off_date"
                                value={data.drop_off_date}
                                onChange={(e) =>
                                    setData("drop_off_date", e.target.value)
                                }
                                className={`${errors.drop_off_date ? "border-red-400" : ""} appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                                id="drop-off-date"
                                type="date"
                            />

                            <InputError
                                message={errors.drop_off_date}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="pick-up-time"
                            >
                                Drop-off time
                            </label>
                            <input
                                name="drop_off_time"
                                value={data.drop_off_time}
                                onChange={(e) =>
                                    setData("drop_off_time", e.target.value)
                                }
                                className={`${errors.drop_off_time ? "border-red-400" : ""} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                id="drop-off-time"
                                type="time"
                            />

                            <InputError
                                message={errors.drop_off_time}
                                className="mt-4"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <button
                                disabled={processing}
                                className={`${processing && "opacity-25 cursor-not-allowed"} block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
                            >
                                Reserve Now
                            </button>
                        </div>
                    </div>

                    <p className="text-gray-600 text-md text-center mb-7">
                        You won't be charged yet
                    </p>

                    <div className="flex justify-between py-4 border-b">
                        <p className="text-base text-gray-700">Price for {data.duration} day/s</p>
                        <p className="font-bold text-base text-gray-600">
                            {data.partial_total.toFixed(2)}
                        </p>
                    </div>

                    <div className="flex justify-between py-4 border-b">
                        <p className="text-base text-gray-700">Service Fee</p>
                        <p className="font-bold text-base text-gray-600">
                            {data.service_fee.toFixed(2)}
                        </p>
                    </div>
                    
                    <div className="flex justify-between py-4   ">
                        <p className="font-bold text-base text-gray-900">
                            Total Cost
                        </p>
                        <p className="font-bold text-base text-gray-900">
                            {data.total_cost.toFixed(2)}
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ItemScheduleDetail;
