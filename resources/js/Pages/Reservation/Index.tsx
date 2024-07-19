import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { User } from "@/types";
import CustomTable from "@/Components/CustomTable";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { Fragment } from "react";

function Index({
    auth,
    headerData,
    bodyData,
}: PageProps<{ headerData: string; bodyData: string }>) {
    const user = usePage<PageProps>().props.auth.user;

    const mappedHeader = headerData.map((hdata, index) => (
        <Fragment key={hdata.name}>
            <TableCell>{hdata.name}</TableCell>
            <TableCell align="right">{hdata.date}</TableCell>
            <TableCell align="right">{hdata.bookedby}</TableCell>
            <TableCell align="right">{hdata.action}</TableCell>
        </Fragment>
    ));

    const mappedBody = bodyData.map((bdata, index) => (
        <Fragment key={index}>
            <TableRow
                key={bdata.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell>{bdata.item}</TableCell>
                <TableCell align="right">{bdata.date}</TableCell>
                <TableCell align="right">{bdata.bookedby}</TableCell>
                <TableCell align="right">{bdata.action}</TableCell>
            </TableRow>
        </Fragment>
    ));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-base text-gray-800 leading-tight">
                    Reservations
                </h2>
            }
        >
            <Head title="Reservations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/*<div className="p-6 text-gray-900">Hello, {user.email}</div>*/}
                        <div>
                            <CustomTable>
                                <TableHead>
                                    <TableRow>{mappedHeader}</TableRow>
                                </TableHead>
                                <TableBody>{mappedBody}</TableBody>
                            </CustomTable>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
