import { SetStateAction, useState } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { Modal, Dialog } from "@mui/material";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import CategoryComponent from "@/Components/LandingPage/Category/Main";
import { ICategory } from "@/Interface/CategoryInterface";
import RentalItemComponent from "@/Components/LandingPage/RentalItems/RentalItemComponent";

export default function LandingItemPage({ categories }: ICategory) {
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

    const data = [
        {
            id: 1,
            name: "Samsung AA",
            role: "View More Details",
            category: "Mobile",
            image: "https://images.samsung.com/is/image/samsung/ph-galaxy-a6plus-sm-a605-sm-a605gzbgxtc-frontblue-101632983?$650_519_PNG$",
        },
        {
            id: 2,
            name: "Samsung BB",
            role: "View More Details",
            category: "Mobile",
            image: "https://images.samsung.com/is/image/samsung/ph-galaxy-a6plus-sm-a605-sm-a605gzbgxtc-frontblue-101632983?$650_519_PNG$",
        },
        {
            id: 3,
            name: "Samsung CC",
            role: "View More Details",
            category: "Mobile",
            image: "https://images.samsung.com/is/image/samsung/ph-galaxy-a6plus-sm-a605-sm-a605gzbgxtc-frontblue-101632983?$650_519_PNG$",
        },
        {
            id: 4,
            name: "Honda Civic 2001",
            role: "View More Details",
            category: "Car",
            image: "https://freepngimg.com/save/32430-honda-civic-transparent/1000x1000",
        },
        {
            id: 5,
            name: "Kia 2001",
            role: "View More Details",
            category: "Car",
            image: "https://freepngimg.com/save/32430-honda-civic-transparent/1000x1000",
        },
        {
            id: 6,
            name: "Suzuki 2002",
            role: "View More Details",
            category: "Car",
            image: "https://freepngimg.com/save/32430-honda-civic-transparent/1000x1000",
        },
        {
            id: 7,
            name: "Raider Carb 150",
            role: "View More Details",
            category: "Motorcycle",
            image: "https://mc.suzuki.com.ph/app/uploads/2023/08/03-Celebration-Red.png",
        },
        {
            id: 8,
            name: "Raider Fi 150",
            role: "View More Details",
            category: "Motorcycle",
            image: "https://mc.suzuki.com.ph/app/uploads/2023/10/01-4.png",
        },
        {
            id: 9,
            name: "Ninja 400cc",
            role: "View More Details",
            category: "Motorcycle",
            image: "https://content2.kawasaki.com/ContentStorage/KMC/Products/8797/b1200891-3315-46af-9575-185aed6b2892.png?w=675",
        },
        {
            id: 10,
            name: "Tools Set AA",
            role: "View More Details",
            category: "Tools Set",
            image: "https://data.kleintools.com/sites/all/product_assets/png/klein/33525.png",
        },
        {
            id: 11,
            name: "Tools Set BB",
            role: "View More Details",
            category: "Tools Set",
            image: "https://www.proxxon.com/en/images/produkte/23660.png",
        },
        {
            id: 12,
            name: "Tools Set CC",
            role: "View More Details",
            category: "Tools Set",
            image: "https://static.vecteezy.com/system/resources/previews/024/189/096/original/tools-box-in-png.png",
        },
        {
            id: 13,
            name: "Camela Homes Lot 11",
            role: "View More Details",
            category: "House",
            image: "https://e7.pngegg.com/pngimages/462/450/png-clipart-minecraft-house-building-house-building-interior-design-services-modern-house-furniture-building-thumbnail.png",
        },
        {
            id: 14,
            name: "Camela Homes Lot 1",
            role: "View More Details",
            category: "House",
            image: "https://p1.hiclipart.com/preview/760/785/113/real-estate-villa-house-3d-computer-graphics-3d-modeling-renting-building-architecture-png-clipart-thumbnail.jpg",
        },
        {
            id: 15,
            name: "Camela Homes Lot 111",
            role: "View More Details",
            category: "House",
            image: "https://img.freepik.com/premium-psd/modern-house-isolated-transparent-background_879541-1561.jpg",
        },
        {
            id: 16,
            name: "Camela Homes Lot 1111",
            role: "View More Details",
            category: "House",
            image: "https://image.pngaaa.com/44/2064044-middle.png",
        },
        // Add more data for each card with category information
    ];

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
            {" "}
            {/* Flex container */}
            {/* Sidebar for categories */}
            <CategoryComponent categories={categories} />
            {/* Content section for cards */}
            <RentalItemComponent items={currentCards} />
        </div>
    );
}
