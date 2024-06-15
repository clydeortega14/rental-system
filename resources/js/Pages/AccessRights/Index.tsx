import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import UserList from "../AccessRights/User/UserList";
import RoleList from "../AccessRights/Role/RoleList";
import PermissionList from "../AccessRights/Permission/PermissionList";

const Index = ({ auth, className }: PageProps<{ className?: string }>) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-base text-gray-800 leading-tight">
                        Access Rights
                    </h2>
                }
            >
                <Head title="Access Rights | Users" />

                <div className="py-2">
                    <div className="p-4 sm:p-8">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                            <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                                <Tabs value={activeTab} onChange={handleChange}>
                                    <Tab label="Users" />
                                    <Tab label="Roles" />
                                    <Tab label="Permissions" />
                                </Tabs>
                            </Box>
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                {activeTab === 0 && (
                                    <UserList className="max-w-xl" />
                                )}
                                {activeTab === 1 && (
                                    <RoleList className="max-w-xl" />
                                )}
                                {activeTab === 2 && (
                                    <PermissionList className="max-w-xl" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};

export default Index;
