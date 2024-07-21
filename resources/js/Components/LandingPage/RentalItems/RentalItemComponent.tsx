import { IRentalItems } from "@/Interface/RentalItems";
import StarRating from "@/Components/LandingPage/StarRating";
import NavLink from "@/Components/NavLink";
import { useState } from "react";
import FilterComponent from "./Filter";

export default function RentalItemComponent({ items }: IRentalItems) {
    console.log(items);
    const [isActive, setIsActive] = useState<boolean>(false);
    return (
        <div className="md:w-3/4 p-6 bg-gray-100 border-l">
            {/* Filter Rental Items Component */}

            {/* Rental Items Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Contact Cards */}
                {items.map((item, index) => (
                    <NavLink
                        href={route("itemDetails", item.id)}
                        active={isActive}
                        key={index}
                    >
                        <div
                            key={index}
                            className="relative rounded-lg shadow-md cursor-pointer bg-white p-2"
                        >
                            {/* Image */}

                            <div
                                className="relative"
                                style={{ width: "100%", paddingTop: "75%" }}
                            >
                                <img
                                    className="absolute inset-0 w-full h-full rounded-lg object-cover"
                                    src={`/storage/${item.image}`}
                                    alt={item.name}
                                />
                            </div>
                            {/* Details */}
                            <div className="flex flex-col justify-between bg-white bg-opacity-5 rounded-b-lg">
                                <div className="p-4">
                                    <div className="flex items-center">
                                        <div>
                                            <h5 className="text-lg font-medium text-gray-900">
                                                {item.name}
                                            </h5>
                                            <p className="text-sm text-gray-500">
                                                {item.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-white rounded-b-lg">
                                    <div>
                                        {/* Category Tag */}
                                        <span
                                            className="px-1 py-1 bg-gray-200 text-gray-800 text-xs uppercase font-semibold rounded"
                                            style={{ fontSize: "10px" }}
                                        >
                                            {item.category}
                                        </span>
                                    </div>
                                    {/* Star Rating (hidden on small screens) */}
                                    <StarRating rating={3.4} />
                                </div>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
