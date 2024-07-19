import { SetStateAction, useState } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { Modal, Dialog } from "@mui/material";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import CategoryComponent from "@/Components/LandingPage/Category/Main";
import { ICategory } from "@/Interface/CategoryInterface";
import { IRentalItem } from "@/Interface/IRentalItems";
import RentalItemComponent from "@/Components/LandingPage/RentalItems/RentalItemComponent";

export default function LandingItemPage({
    categories,
    items,
}: {
    ICategory;
    IRentalItem;
}) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCardClick = (itemId) => {
        // Navigate to the itemDetails route with the item ID as a route parameter
        window.location.href = `/itemDetails/${itemId.id}`;
    };

    // setSelectedItem(item);
    // setShowModal(true);

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const data = [];

    // Filter data based on the selected category
    const filteredData =
        selectedCategory === "All"
            ? data
            : data.filter((item) => item.category === selectedCategory);

    // Sorting functionality
    const sortItems = (sortBy: string) => {
        switch (sortBy) {
            case "Popular":
                // Implement sorting by popularity
                break;
            case "Latest":
                // Implement sorting by latest
                break;
            case "Price":
                // Implement sorting by price
                break;
            default:
                break;
        }
    };

    // Calculate pagination
    const cardsPerPage = 12;
    const totalCards = filteredData.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = (pageNumber: SetStateAction<number>) =>
        setCurrentPage(pageNumber);

    const handleVisitStore = (store: {
        id: any;
        name?: string;
        role?: string;
        category?: string;
    }) => {
        const { id } = store;
        const url = `/renteeStore/${id}`;
        window.location.href = url;
    };

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSortMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar for categories */}
            <CategoryComponent categories={categories} />
            {/* Content section for cards */}
            <RentalItemComponent items={items} />
        </div>
    );
}
