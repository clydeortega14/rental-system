import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import ProfileInformationForm from './Partials/ProfileInformation';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {

    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <ProfileInformationForm  className="max-w-xl"/>

                       
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={activeTab} onChange={handleChange}>
                                    
                                    <Tab label="Update Profile" />
                                    <Tab label="Update Password" />
                                    <Tab label="Delete Account" />
                                </Tabs>
                            </Box>
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                               
                                {activeTab === 0 && <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl mt-9" />}
                                {activeTab === 1 && <UpdatePasswordForm className="max-w-xl" />}
                                {activeTab === 2 && <DeleteUserForm className="max-w-xl" />}
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
