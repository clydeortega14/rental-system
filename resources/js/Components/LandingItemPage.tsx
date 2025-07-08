import { SetStateAction, useState } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { Modal, Dialog } from "@mui/material";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import CategoryComponent from "../Components/LandingPage/Category/Main";
import RentalItemComponent from "../Components/LandingPage/RentalItems/RentalItemComponent";
import { ICategory } from "../Interface/CategoryInterface";
import { IRentalItems } from "@/Interface/RentalItems";


interface LandingItemPageProps {
    categories: ICategory;
    items: IRentalItems
}

export default function LandingItemPage({
    categories,
    items,
}: LandingItemPageProps) {
    

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar for categories */}
            <CategoryComponent />
            {/* Content section for cards */}
            <RentalItemComponent items={items} />
        </div>
    );
}
