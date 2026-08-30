import { INavbar } from "@/types/navs";
import { NavbarItem } from "@/types/navs";
import { BiSolidDashboard, BiBuildingHouse, BiCalendarCheck } from "react-icons/bi";

export const sidenavs: NavbarItem[] = [
    {
        key: "lessorDashboard",
        label: "Dashboard",
        icon: <BiSolidDashboard />,
        link: route('lessee.profile'),
        active: route().current('lessee.*')
    },
    { 
        key: "lessorProperties", 
        label: "Properties", 
        icon: <BiBuildingHouse/>, 
        link: route('lessor.properties'),
        active: route().current('lessor.*') 
    },
    { 
        key: "lessorReservations", 
        label: "Reservations", 
        icon: <BiCalendarCheck/>,
        link: route('reservations.index'),
        active: route().current('reservations.*') 
    },
];

export const sidebarTabs: INavbar[] = [
    {section: "Main", items: sidenavs}
]