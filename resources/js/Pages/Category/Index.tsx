import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import CustomTable from "@/Components/CustomTable";
import { Fragment } from "react";

const Index = ({ auth, categories }: PageProps<{ categories: array }>) => {
    const mapped_categories = categories.map((category, index) => (
        <Fragment key={index}>
            <TableRow
                key={category.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell>{category.detail.label}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                    {category.detail.active ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                    <SecondaryButton className="mr-2">View</SecondaryButton>
                    <SecondaryButton className="mr-2">Edit</SecondaryButton>
                    <SecondaryButton className="mr-2">
                        Attach Form
                    </SecondaryButton>
                </TableCell>
            </TableRow>
        </Fragment>
    ));
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
                                <TableBody>{mapped_categories}</TableBody>
                            </CustomTable>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
};

export default Index;
