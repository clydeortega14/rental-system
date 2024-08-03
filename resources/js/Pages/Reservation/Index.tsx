import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import CustomTable from "@/Components/CustomTable";
import SecondaryButton from "@/Components/SecondaryButton";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

type Header = {
    name: string;
};

type Body = {
    id: number;
    item_name: string;
    reservation_date: string;
    status: string;
    booked_by: string;
    action: string;
};

function Index({
    auth,
    headerData,
    bodyData,
}: PageProps<{ headerData: Header[]; bodyData: Body[] }>) {
    const user = usePage<PageProps>().props.auth.user;

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
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <CustomTable headerData={headerData}>
                                {bodyData.map((body) => (
                                    <tr key={body.id} className="text-center">
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                            {body.item_name}
                                        </td>
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                            {body.reservation_date}
                                        </td>
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                            {body.status}
                                        </td>
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                            {body.booked_by}
                                        </td>
                                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                            <SecondaryButton className="mr-2">
                                                <FaEdit />
                                            </SecondaryButton>
                                            <SecondaryButton className="mr-2">
                                                <FaEye />
                                            </SecondaryButton>
                                            <SecondaryButton>
                                                <FaTrashAlt />
                                            </SecondaryButton>
                                        </td>
                                    </tr>
                                ))}
                            </CustomTable>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
