import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

const About = () => {
    const user = usePage<PageProps>().props.auth.user;
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
                    <p className="text-slate-500 text-sm">
                        {user.company.name}
                    </p>
                </div>
                <div className="py-3 px-5">
                    <div className="text-md font-small text-black">Address</div>
                    <p className="text-slate-500 text-sm">
                        Purok street, Lorega, Cebu City
                    </p>
                </div>
                <div className="py-3 px-5">
                    <div className="text-md font-small text-black">TIN</div>
                    <p className="text-slate-500 text-sm">{user.company.tin}</p>
                </div>
                <div className="py-3 px-5">
                    <div className="text-md font-small text-black">
                        Company Email
                    </div>
                    <p className="text-slate-500 text-sm">
                        {user.company.email}
                    </p>
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
