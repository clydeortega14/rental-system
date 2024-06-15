import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import Paper from "@mui/material/Paper";

interface CustomTableProps {
    children: ReactNode;
}

function CustomTable({ children, className = "", ...props }: CustomTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {children}
            </Table>
        </TableContainer>
    );
}

export default CustomTable;
