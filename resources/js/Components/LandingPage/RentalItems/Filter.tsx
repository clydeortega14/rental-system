import { useState } from "react";
import LocationForm from "./LocationForm";

export default function Filter() {
    const [isSearchLocation, setIsSearchLocation] = useState<boolean>(false);
    return (
        <div className="pb-12">
            <div className="border-gray-100 pb-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                        <div className="mt-2">
                            <input
                                id="search"
                                name="search"
                                rows="3"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Search Ex: Name of Item or Name of company / rental provider"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-x-3 sm:col-span-2 col-start-1">
                        <input
                            id="search-location"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onClick={() => {
                                setIsSearchLocation(true);
                            }}
                        />
                        <label
                            htmlFor="search-location"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Search By Location
                        </label>
                    </div>

                    {isSearchLocation && <LocationForm />}
                </div>
            </div>
        </div>
    );
}
