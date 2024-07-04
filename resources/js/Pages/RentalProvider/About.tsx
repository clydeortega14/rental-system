const About = () => {
    return (
        <div className="px-3">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 p-5">
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    About
                </h5>
                <div className="py-3 px-5">
                    <div className="text-md font-small text-black">
                        Company Name
                    </div>
                    <p className="text-slate-500 text-sm">ABC Company</p>
                </div>
                <div className="py-3 px-5">
                    <div className="text-md font-small text-black">Address</div>
                    <p className="text-slate-500 text-sm">
                        Purok street, Lorega, Cebu City
                    </p>
                </div>
                <div className="py-3 px-5">
                    <div className="text-md font-small text-black">TIN</div>
                    <p className="text-slate-500 text-sm">0394-23394-23</p>
                </div>
                <div className="py-3 px-5">
                    <div className="text-md font-small text-black">Email</div>
                    <p className="text-slate-500 text-sm">abc@comp.ph</p>
                </div>
                <div className="py-3 px-5">
                    <div className="text-md font-small text-black">
                        Years in the industry
                    </div>
                    <p className="text-slate-500 text-sm">8</p>
                </div>
            </div>
        </div>
    );
};

export default About;
