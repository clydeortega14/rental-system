import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

const Profile = ({ auth }: PageProps) => {
    const asset = () => {
        return `${window.location.origin}/images/company-logo.jpg`;
    };
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Rental Provider Profile
                    </h2>
                }
            >
                <Head title="Rental Provider Profile" />
                <div className="py-4">
                    <div className="max-w-md sm:px-3 lg:px-5">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 px-7 py-7">
                            <img
                                className="w-96 h-64 mb-3 sm:rounded-md shadow-lg"
                                src={asset("images/company-logo.jpg")}
                                alt="Bonnie image"
                            />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                Bonnie Green
                            </h5>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Voluptatibus quia, nulla!
                                Maiores et perferendis eaque, exercitationem
                                praesentium nihil.
                            </p>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Profile;
