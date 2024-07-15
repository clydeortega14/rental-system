import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CustomTable from "@/Components/CustomTable";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { Fragment } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

const ProfileList = ({ auth }: PageProps) => {
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Profiles
                    </h2>
                }
            >
                <Head title="Rental Provider Profile Lists" />

                <div className="py-7 px-3 min-h-screen">
                    <CustomTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Profile ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Pr001-20</TableCell>
                                <TableCell>Carimovers</TableCell>
                                <TableCell>Offers multipurpose items</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>
                                    <PrimaryButton className="mr-2">
                                        <a
                                            href={route(
                                                "rental.provider.profile",
                                                "20d0c86e-e8b5-4355-89bd-8e9ba32c1f15",
                                            )}
                                        >
                                            View
                                        </a>
                                    </PrimaryButton>
                                    <SecondaryButton className="mr-2">
                                        Edit
                                    </SecondaryButton>
                                    <DangerButton className="mr-2">
                                        Delete
                                    </DangerButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </CustomTable>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default ProfileList;
