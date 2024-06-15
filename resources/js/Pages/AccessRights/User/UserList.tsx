import PrimaryButton from "@/Components/PrimaryButton";
import CustomTable from "@/Components/CustomTable";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { Fragment } from "react";

const UserList = () => {
    return (
        <>
            <div className="flex justify-end">
                <PrimaryButton>Create User</PrimaryButton>
            </div>
            <div className="py-3">
                <CustomTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow></TableRow>
                    </TableBody>
                </CustomTable>
            </div>
        </>
    );
};

export default UserList;
