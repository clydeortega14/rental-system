import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import About from "./About";
import Summary from "./Summary";
import RentalOffering from "./RentalOffering";

const Profile = ({ auth }: PageProps) => {
    const asset = () => {
        return `${window.location.origin}/images/compA.jpeg`;
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
                    <div className="flex">
                        <div className="basis-1/4">
                            <Summary asset={asset} />
                        </div>
                        <div className="grow min-h-screen">
                            <About />

                            <RentalOffering />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Profile;
