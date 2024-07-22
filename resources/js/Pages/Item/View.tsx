import { useState } from "react";
import { PageProps } from "@/types";
import ItemDetail from "./ItemDetail";
import NavHeader from "@/Components/Header";

const navigation = {
    categories: [],
};

export default function View({
    itemId,
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11),
    });

    return (
        <>
            <div className="bg-white">
                <NavHeader setOpen={setOpen} />

                {/* Card section */}
                <div>
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                        {/* Card content goes here */}

                        <ItemDetail />
                    </div>
                </div>
            </div>
        </>
    );
}
