import React, { ReactNode } from "react";

export type NavbarItem = {
    key: string;
    label: string;
    icon: ReactNode;
    link: React.ReactNode;
    active: boolean;
}

export type INavbar {
    section?: string;
    items: NavbarItem[];
}