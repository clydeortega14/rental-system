function ItemScheduleDetail() {
    return (
        <>
            <div className="border border-gray-200 p-4 rounded-lg shadow-xl bg-white mb-4">
                <p className="text-base text-gray-400">Pick Up</p>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    Fri, July 28, 2024 9:00 AM
                </h1>
                <p className="text-base text-lg">Cebu Airport</p>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg shadow-xl bg-white mb-4">
                <p className="text-base text-gray-400">Drop Off</p>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                    Sat, July 29, 2024 12:00 Noon
                </h1>
                <p className="text-base text-lg">Cebu Airport</p>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg shadow-xl bg-white mb-4">
                <h1 className="text-1xl font-extrabold">Summary of Charges</h1>

                <div className="flex justify-between py-4 border-b">
                    <div className="font-bold">Due Now</div>
                    <div>0.00</div>
                </div>

                <div className="flex justify-between py-4 border-b">
                    <div className="font-bold">Due at pick up</div>
                    <div>3, 500.00</div>
                </div>

                <div className="flex justify-between py-4 border-b">
                    <div className="font-bold">Service Fee</div>
                    <div>150.00</div>
                </div>
                <div className="flex justify-between py-4 border-b">
                    <div className="font-bold">Total Cost</div>
                    <div>3, 650.00</div>
                </div>
            </div>
        </>
    );
}

export default ItemScheduleDetail;
