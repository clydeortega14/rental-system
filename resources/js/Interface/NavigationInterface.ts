import React from "react"

export interface NavigationInterface {
    icon: React.ReactNode;
    text: string;
    path?: string;
    subItems?: {
        icon: React.ReactNode;
        text: string;
        path: string;
        active?: boolean;
    }[],
    active?: boolean;
}