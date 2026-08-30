import React, { ReactNode } from "react";

export type NavbarItem = {
    key: string;
    label: string;
    icon: ReactNode;
    link: React.ReactNode;
}

export type INavbar {
    section?: string;
    items: NavbarItem[];
}