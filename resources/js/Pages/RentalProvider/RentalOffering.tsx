import SecondaryButton from "@/Components/SecondaryButton";

const RentalOffering = () => {
    return (
        <div className="px-3 py-3">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 p-5">
                <h5 className="mb-8 text-xl font-medium text-gray-900 dark:text-white">
                    Rental Offerings
                </h5>
                <div className="flex justify-between border-solid border-2 border-gray-200 px-3 py-2">
                    <div className="text-md font-small text-black">
                        Bags <small className="text-gray-600"> (20)</small>
                    </div>
                    <SecondaryButton>View Items</SecondaryButton>
                </div>

                <div className="flex justify-between border-solid border-2 border-gray-200 px-3 py-2">
                    <div className="text-md font-small text-black">
                        Cars<small className="text-gray-600"> (7)</small>
                    </div>
                    <SecondaryButton>View Items</SecondaryButton>
                </div>
                <div className="flex justify-between border-solid border-2 border-gray-200 px-3 py-2">
                    <div className="text-md font-small text-black">
                        Camping Items
                        <small className="text-gray-600"> (10)</small>
                    </div>
                    <div>
                        <SecondaryButton>View Items</SecondaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentalOffering;
