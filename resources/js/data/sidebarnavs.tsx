import { NavbarItem } from "@/types/navs";
import { BiSolidDashboard, BiBuildingHouse, BiCalendarCheck } from "react-icons/bi";

export const sidenavs: NavbarItem[] = [
    {
        key: "lessorDashboard",
        label: "Dashboard",
        icon: <BiSolideDashboard />,
        link: route('lessee.profile')
    },
    { key: "lessorProperties", label: "Properties", icon: <BiBuildingHouse/> link: route('lessor.properties') },
    { key: "lessorReservations", label: "Reservations", icon: <BiCalendarCheck/> link: route('reservations.index') },
];