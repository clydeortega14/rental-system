import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const ProfileList = ({ auth }: PageProps) => {
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Rental Provider Profile Lists
                    </h2>
                }
            >
                <Head title="Rental Provider Profile Lists" />

                <div className="py-7 px-3 min-h-screen">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 p-5">
                        <h5 className="mb-8 text-xl font-medium text-gray-900 dark:text-white">
                            Profiles
                        </h5>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default ProfileList;
