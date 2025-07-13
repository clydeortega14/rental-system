import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { AiOutlineLeftCircle, AiOutlineBars, AiOutlineUser, AiOutlineOrderedList, AiFillHome, AiOutlineDown, AiFillProfile } from "react-icons/ai";
import { MdDashboard, MdEventNote } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { CiSettings } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { FaPeopleGroup, FaWpforms } from "react-icons/fa6";
import { LuWorkflow } from "react-icons/lu";
import NavLink from "@/Components/NavLink";
import initialLogo from "@/../../resources/img/initialLogo.png";
import { useState, Fragment } from "react";

interface SidebarProps {
    open: boolean;
}

function Sidebar({ open }: SidebarProps) {
    const menu_items = [
        {
            type: "section",
            name: "MAIN",
        },
        {
            type: "item",
            id: 1,
            name: "Dashboard",
            link: route("dashboard"),
            status: route().current("dashboard"),
            icon: <MdDashboard />,
        },
        {
            type: "section",
            name: "BOOKINGS",
        },
        {
            type: "item",
            id: 3,
            name: "Reservation Items",
            link: route("reservations.index"),
            status: route().current("reservations.index"),
            icon: <MdEventNote />,
        },
        {
            type: "item",
            id: 4,
            name: "Rental Listings",
            link: route("rental.listing"),
            status: route().current("rental.listing"),
            icon: <GiNotebook />,
        },
        {
            type: "section",
            name: "SETTINGS",
        },
        {
            type: "item",
            id: 5,
            name: "Settings",
            link: route(""),
            status: "",
            icon: <CiSettings />,
            submenu: true,
            submenuItems: [
                {
                    id: 31,
                    name: "Categories",
                    link: route("categories.index"),
                    status: route().current("categories.index"),
                    icon: <BiCategoryAlt />,
                },
                {
                    id: 32,
                    name: "Forms",
                    link: route("forms.index"),
                    status: route().current("forms.index"),
                    icon: <FaWpforms />,
                },
                {
                    id: 33,
                    name: "Access Rights",
                    link: route("users.index"),
                    status: route().current("users.index"),
                    icon: <FaPeopleGroup />,
                },
                {
                    id: 34,
                    name: "Workflows",
                    link: route("workflows.index"),
                    status: route().current("workflows.index"),
                    icon: <LuWorkflow />,
                },
            ],
        },
    ];
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const menuLists = menu_items.map((menu, index) => {
        if (menu.type === "section") {
            return (
                <li
                    key={`section-${index}`}
                    className={`text-gray-400 text-xs uppercase mt-6 mb-1 pl-2 ${!open && "hidden"}`}
                >
                    {menu.name}
                </li>
            );
        }

        return (
            <Fragment key={menu.id}>
                <li
                    className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 ${menu.status && "bg-light-white"}`}
                >
                    <span className="text-2xl block float-left">{menu.icon}</span>
                    <NavLink
                        href=""
                        active={false}
                        className={`text-sm font-small flex-1 ${!open && "hidden"} ${menu.status && "font-bold text-lg"} hover:text-base hover:font-bold`}
                    >
                        {menu.name}
                    </NavLink>

                    {menu.submenu && (
                        <AiOutlineDown
                            onClick={() => setSubmenuOpen(!submenuOpen)}
                            className={`${submenuOpen && "rotate-180"} duration-500`}
                        />
                    )}
                </li>

                {menu.submenu && submenuOpen && open && (
                    <ul key={menu.id}>
                        {menu.submenuItems.map((submenuItem, submenuIndex) => (
                            <li
                                key={submenuIndex}
                                className={`text-white text-sm flex items-center duration-500 gap-x-2 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 px-7 ${submenuItem.status && "bg-light-white"}`}
                            >
                                <span className="text-lg block float-left">{submenuItem.icon}</span>
                                <NavLink
                                    href={submenuItem.link}
                                    active={submenuItem.status}
                                    className={`${submenuItem.status && "font-bold text-base"} hover:text-base hover:font-bold`}
                                >
                                    {submenuItem.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )}
            </Fragment>
        );
    });

    return (
        <>
            <div className={`py-0 px-2 bg-gray-900 text-white relative ${open ? "w-72" : "w-20"} duration-300`}>

            <ul className="pt-2">{menuLists}</ul>
            </div>
        </>
    );

}

export default Sidebar;
