import ItemScheduleDetail from "./ItemScheduleDetail";
import RenteeInfo from "./RenteeInfo";
import ContactInformation from "./Contact";
import PrimaryButton from "@/Components/PrimaryButton";

function ItemImage() {
    return (
        <>
            <div className="p-12 flex flex-col lg:flex-row">
                <div className="lg:w-2/3 mb-7 lg:mb-0 lg:mr-12">
                    <img
                        src="https://content2.kawasaki.com/ContentStorage/KMC/Products/8797/b1200891-3315-46af-9575-185aed6b2892.png?w=675"
                        className="mb-4 w-full lg:w-auto lg:max-h-96"
                    />

                    {/* Small images below the main image */}
                    <div className="flex flex-wrap justify-center">
                        <img
                            src="https://content2.kawasaki.com/ContentStorage/KMC/Products/8797/b1200891-3315-46af-9575-185aed6b2892.png?w=675"
                            alt="Small Image 1"
                            className="w-1/3 sm:w-1/4 md:w-1/5 h-auto mb-2"
                        />
                        <img
                            src="https://content2.kawasaki.com/ContentStorage/KMC/Products/8797/b1200891-3315-46af-9575-185aed6b2892.png?w=675"
                            alt="Small Image 2"
                            className="w-1/3 sm:w-1/4 md:w-1/5 h-auto mb-2"
                        />
                        <img
                            src="https://content2.kawasaki.com/ContentStorage/KMC/Products/8797/b1200891-3315-46af-9575-185aed6b2892.png?w=675"
                            alt="Small Image 3"
                            className="w-1/3 sm:w-1/4 md:w-1/5 h-auto mb-2"
                        />
                    </div>
                    <div className="p-4 ml-4 text-center">
                        <div className="mb-4">
                            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                                Kawasaki Ninja 400
                            </h1>
                            <p className="text-base text-gray-400">
                                Kawasaki Ninja 400 Power-trains. The Ninja 400
                                is powered by a Liquid Cooled Fuel Injection 399
                                cc 2 Cylinder engine that gives 48.9hp of power
                                at 10000 rpm and 38 Nm Torque at 8000 rpm. It
                                comes with the option of a 6-Speed transmission
                                gearbox. The Ninja 400 has a seat height of 785
                                mm.
                            </p>
                        </div>
                    </div>

                    <RenteeInfo />

                    <ContactInformation />

                    <div className="p-4 ml-4 shadow-lg bg-white rounded-lg mb-4 flex items-center">
                        <PrimaryButton className="block w-full">
                            Book Now
                        </PrimaryButton>
                    </div>
                </div>

                <div className="lg:w-2/4 flex flex-col ml-12 top-0">
                    <ItemScheduleDetail />
                </div>
            </div>
        </>
    );
}

export default ItemImage;
