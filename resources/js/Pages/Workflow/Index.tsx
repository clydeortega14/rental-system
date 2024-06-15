import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

const Index = ({ auth }: PageProps) => {
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-base text-gray-800 leading-tight">
                        Workflows
                    </h2>
                }
            >
                <Head title="Workflows" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="flex justify-end mt-0">
                                    <PrimaryButton>New Workflow</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};

export default Index;
