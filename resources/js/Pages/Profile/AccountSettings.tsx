import { PageProps } from "@/types";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Head } from "@inertiajs/react";

export default function AccountSettings({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Account Settings
                </h2>
            }
        >
            <Head title="Account Settings" />

            <div className="py-2">
                <div className="p-4 sm:p-8">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={activeTab} onChange={handleChange}>
                                <Tab label="Update Profile" />
                                <Tab label="Update Password" />
                                <Tab label="Delete Account" />
                            </Tabs>
                        </Box>
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            {activeTab === 0 && (
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl mt-9"
                                />
                            )}
                            {activeTab === 1 && (
                                <UpdatePasswordForm className="max-w-xl" />
                            )}
                            {activeTab === 2 && (
                                <DeleteUserForm className="max-w-xl" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
