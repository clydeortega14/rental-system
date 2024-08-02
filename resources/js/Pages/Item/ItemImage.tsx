import ItemScheduleDetail from "./ItemScheduleDetail";
import RenteeInfo from "./RenteeInfo";
import ContactInformation from "./Contact";
import PrimaryButton from "@/Components/PrimaryButton";

import { Iitem } from "@/Interface/Item";
function ItemImage({ item }: Iitem) {
    return (
        <>
            <div className="p-12 flex flex-col lg:flex-row">
                <div className="lg:w-2/3 mb-7 lg:mb-0 lg:mr-12">
                    <img
                        src={item.src[0].link}
                        className="mb-7 w-3/5 mx-auto"
                    />

                    {/* Small images below the main image */}
                    <div className="flex flex-wrap justify-center">
                        {item.src.map((x, i) => (
                            <img
                                key={i}
                                src={x.link}
                                alt={x.name}
                                className="w-1/3 sm:w-1/4 md:w-1/5 h-auto mb-2"
                            />
                        ))}
                    </div>
                    <div className="p-4 ml-4 text-center">
                        <div className="mb-4">
                            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                                {item.name}
                            </h1>
                            <p className="text-base text-gray-600 mt-4">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:w-2/4 flex flex-col ml-12 top-0">
                    <ItemScheduleDetail item={item} />
                </div>
            </div>
        </>
    );
}

export default ItemImage;
