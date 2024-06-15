import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import CustomTable from "@/Components/CustomTable";

const Index = ({ auth }: PageProps) => {
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-base text-gray-800 leading-tight">
                        Categories
                    </h2>
                }
            >
                <Head title="Categories" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="flex justify-end mt-0">
                                    <PrimaryButton>New Category</PrimaryButton>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <CustomTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Label</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow></TableRow>
                                </TableBody>
                            </CustomTable>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};

export default Index;
