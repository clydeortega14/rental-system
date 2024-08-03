type TableHeader = {
    name: string;
};

interface CustomTableProps {
    className: string;
    headerData: TableHeader[];
    children: React.ReactNode;
}

function CustomTable({ children, headerData }: CustomTableProps) {
    return (
        <>
            <table className="border-collapse table-auto w-full shadow-xl">
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
            </table>
        </>
    );
}

export default CustomTable;
