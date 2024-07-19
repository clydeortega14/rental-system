export default function LocationForm() {
    return (
        <>
            <div className="sm:col-span-2">
                <label
                    for="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    State / Province
                </label>
                <div class="mt-2">
                    <select
                        id="province"
                        name="province"
                        autocomplete="province-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        <option value="08">Region VII</option>
                        <option value="09">Region VIII</option>
                    </select>
                </div>
            </div>

            <div className="sm:col-span-2">
                <label
                    for="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    City
                </label>
                <div className="mt-2">
                    <select
                        name="city"
                        id="city"
                        autocomplete="city"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        <option>City of Talisay</option>
                        <option>Cebu City</option>
                        <option>Toledo City</option>
                    </select>
                </div>
            </div>
        </>
    );
}
