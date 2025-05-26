import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import DatePicker from "react-tailwindcss-datepicker";
import { useState } from "react";

function CarRental() {
    const [value, setValue ] = useState({
        startDate: null,
        endDate: null
    });


    return (
        <>
            <div className="flex hover:shadow-xl justify-center py-7 bg-gradient-to-tr from-blue-100 to-green-100">
                <div className="sm:col-span-2 col-start-1 mr-2">
                    <InputLabel
                        htmlFor="pick-up-location"
                        value="Pick up location"
                    />
                    <TextInput
                        id="pick-up-location"
                        name="pick_up_location"
                        className="w-full block"
                    />
                </div>

                <div className="sm:col-span-2 mr-2 mt-5">
                    <DatePicker value={value} onChange={newValue => setValue(newValue)} />
                </div>
                <div className="sm:col-span-2 mr-2">
                    <InputLabel htmlFor="pick-up-date" value="Pick-up date" />
                    <TextInput
                        id="pick-up-date"
                        name="pick_up_date"
                        type="date"
                    />
                </div>

                <div className="sm:col-span-2 mr-2">
                    <InputLabel htmlFor="pick-up-time" value="Pick-up time" />
                    <TextInput
                        id="pick-up-time"
                        name="pick_up_time"
                        type="time"
                    />
                </div>

                <div className="sm:col-span-2 mr-2">
                    <InputLabel htmlFor="drop-off" value="Pick-up time" />
                    <TextInput id="drop-off" name="pick_up_time" type="date" />
                </div>

                <div className="sm:col-span-2 mr-2">
                    <InputLabel htmlFor="drop-off-time" value="Pick-up time" />
                    <TextInput
                        id="drop-off-time"
                        name="pick_up_time"
                        type="time"
                    />
                </div>
                <div className="sm:col-span-2 mt-5">
                    <PrimaryButton>Find Car</PrimaryButton>
                </div>
            </div>
        </>
    );
}

export default CarRental;
