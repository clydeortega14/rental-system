import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

function ItemScheduleDetail() {
    return (
        <>
            <div className="border border-gray-200 p-4 rounded-lg shadow-xl bg-white mb-4">
                <form className="w-full px-3">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="pick-up-drop-off-location"
                            >
                                Pick-up Drop-off Location
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="pick-up-drop-off-location"
                                type="password"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="pick-u-date"
                            >
                                Pick-up
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name"
                                type="date"
                                placeholder="Jane"
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
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name"
                                type="time"
                                placeholder="Doe"
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
                                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="drop-off-date"
                                type="date"
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
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="drop-off-time"
                                type="time"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <button className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                Reserve Now
                            </button>
                        </div>
                    </div>

                    <p className="text-gray-600 text-md text-center mb-7">
                        You won't be charged yet
                    </p>

                    <div className="flex justify-between py-4 border-b">
                        <p className="text-base text-gray-700">Due Now</p>
                        <p className="font-bold text-base text-gray-600">
                            0.00
                        </p>
                    </div>

                    <div className="flex justify-between py-4 border-b">
                        <p className="text-base text-gray-700">
                            Due at pick up
                        </p>
                        <p className="font-bold text-base text-gray-600">
                            3, 400.00
                        </p>
                    </div>

                    <div className="flex justify-between py-4 border-b">
                        <p className="text-base text-gray-700">Service Fee</p>
                        <p className="font-bold text-base text-gray-600">
                            550.00
                        </p>
                    </div>
                    <div className="flex justify-between py-4">
                        <p className="font-bold text-base text-gray-900">
                            Total Cost
                        </p>
                        <p className="font-bold text-base text-gray-900">
                            3, 650.00
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ItemScheduleDetail;
