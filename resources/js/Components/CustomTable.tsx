import { Link } from "@inertiajs/react";
import Button from "./Renter/ui/Button";
import { AlertCircle, Calendar, CheckCircle, ChevronRight, Clock, XCircle } from "lucide-react";
import { formatDateDisplay } from "@/utils/dateUtils";
import { useState } from "react";
import { bookings, getItemById } from "@/data/bookingsData";
interface CustomTableProps {
    className?: string;
    children: React.ReactNode;
}

function CustomTable({ children }: CustomTableProps) {
    
    return (
        <>
            {/* <table className="border-collapse table-auto w-full shadow-xl">
                <thead className="bg-gradient-to-tr from-blue-500 to-green-500 text-white text-md">
                    <tr>
                        {headerData.map((head, index) => (
                            <th
                                key={index}
                                className="border-b dark:border-slate-600 p-4 font-medium dark:text-slate-200 text-center"
                            >
                                {head.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm">{children}</tbody>
            </table> */}

            <div className="px-4 py-5">
                <div className="overflow-hidden mb-8">

                    <div className="divide-y divide-gray-200">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomTable;
