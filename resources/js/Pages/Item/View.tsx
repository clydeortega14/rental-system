import { Fragment, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { PageProps } from "@/types";

import initialLogo from "@/../../resources/img/initialLogo.png";
import phlogo from "@/../../resources/img/phillipines.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import defaultAvatar from "@/../../resources/img/defaultImage.png";
import Datepicker from "react-tailwindcss-datepicker";
import ItemDetail from "./ItemDetail";

const navigation = {
    categories: [
        {
            id: "women",
            name: "Women",
            featured: [
                {
                    name: "New Arrivals",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
                    imageAlt:
                        "Models sitting back to back, wearing Basic Tee in black and bone.",
                },
                {
                    name: "Basic Tees",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
                    imageAlt:
                        "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
                },
            ],
            sections: [
                {
                    id: "clothing",
                    name: "Clothing",
                    items: [
                        { name: "Tops", href: "#" },
                        { name: "Dresses", href: "#" },
                        { name: "Pants", href: "#" },
                        { name: "Denim", href: "#" },
                        { name: "Sweaters", href: "#" },
                        { name: "T-Shirts", href: "#" },
                        { name: "Jackets", href: "#" },
                        { name: "Activewear", href: "#" },
                        { name: "Browse All", href: "#" },
                    ],
                },
                {
                    id: "accessories",
                    name: "Accessories",
                    items: [
                        { name: "Watches", href: "#" },
                        { name: "Wallets", href: "#" },
                        { name: "Bags", href: "#" },
                        { name: "Sunglasses", href: "#" },
                        { name: "Hats", href: "#" },
                        { name: "Belts", href: "#" },
                    ],
                },
                {
                    id: "brands",
                    name: "Brands",
                    items: [
                        { name: "Full Nelson", href: "#" },
                        { name: "My Way", href: "#" },
                        { name: "Re-Arranged", href: "#" },
                        { name: "Counterfeit", href: "#" },
                        { name: "Significant Other", href: "#" },
                    ],
                },
            ],
        },
        {
            id: "men",
            name: "Men",
            featured: [
                {
                    name: "New Arrivals",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
                    imageAlt:
                        "Drawstring top with elastic loop closure and textured interior padding.",
                },
                {
                    name: "Artwork Tees",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
                    imageAlt:
                        "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
                },
            ],
            sections: [
                {
                    id: "clothing",
                    name: "Clothing",
                    items: [
                        { name: "Tops", href: "#" },
                        { name: "Pants", href: "#" },
                        { name: "Sweaters", href: "#" },
                        { name: "T-Shirts", href: "#" },
                        { name: "Jackets", href: "#" },
                        { name: "Activewear", href: "#" },
                        { name: "Browse All", href: "#" },
                    ],
                },
                {
                    id: "accessories",
                    name: "Accessories",
                    items: [
                        { name: "Watches", href: "#" },
                        { name: "Wallets", href: "#" },
                        { name: "Bags", href: "#" },
                        { name: "Sunglasses", href: "#" },
                        { name: "Hats", href: "#" },
                        { name: "Belts", href: "#" },
                    ],
                },
                {
                    id: "brands",
                    name: "Brands",
                    items: [
                        { name: "Re-Arranged", href: "#" },
                        { name: "Counterfeit", href: "#" },
                        { name: "Full Nelson", href: "#" },
                        { name: "My Way", href: "#" },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: "Company", href: "#" },
        { name: "Stores", href: "#" },
    ],
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

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
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    };

    const Modal = ({ isOpen, onClose, title, description }) => {
        return (
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={onClose}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle "
                                style={{ width: "1000px" }}
                            >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <img src="https://content2.kawasaki.com/ContentStorage/KMC/Products/8797/b1200891-3315-46af-9575-185aed6b2892.png?w=675" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-6 font-medium text-gray-900"
                                            >
                                                {title}
                                            </Dialog.Title>
                                            <p className="text-sm text-gray-500 mt-2">
                                                {description}
                                            </p>{" "}
                                            {/* Description */}
                                            {/* Cards go here */}
                                            <div className="flex flex-wrap mt-4">
                                                {/* Example card */}
                                                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mr-3">
                                                    <div className="px-6 py-4 mr-5">
                                                        <div className="font-bold text-xl mb-2">
                                                            Transmission Type
                                                        </div>
                                                        <p className="text-gray-700 text-base">
                                                            Gasoline Manual
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mr-3">
                                                    <div className="px-6 py-4 mr-5">
                                                        <div className="font-bold text-xl mb-2">
                                                            Maximum Power
                                                        </div>
                                                        <p className="text-gray-700 text-base">
                                                            Gasoline 48.9 hp
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mr-3">
                                                    <div className="px-6 py-4 mr-5">
                                                        <div className="font-bold text-xl mb-2">
                                                            Front Brake
                                                        </div>
                                                        <p className="text-gray-700 text-base">
                                                            Gasoline Disc
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mr-3">
                                                    <div className="px-6 py-4 mr-5">
                                                        <div className="font-bold text-xl mb-2">
                                                            Displacement
                                                        </div>
                                                        <p className="text-gray-700 text-base">
                                                            Gasoline 399 cc
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mt-2 mr-3">
                                                    <div className="px-6 py-4 mr-5">
                                                        <div className="font-bold text-xl mb-2">
                                                            Ground Clearance
                                                        </div>
                                                        <p className="text-gray-700 text-base">
                                                            Gasoline 140 mm
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Add more cards as needed */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        );
    };

    // Handler to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCardClick = (itemId) => {
        // Navigate to the itemDetails route with the item ID as a route parameter

        window.location.href = `/itemDetails/${itemId.id}/checkout`;
    };
    return (
        <>
            <div className="bg-white">
                {/* Mobile menu */}
                <Transition.Root show={open} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 lg:hidden"
                        onClose={setOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                    <div className="flex px-4 pb-2 pt-5">
                                        <button
                                            type="button"
                                            className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>

                                    {/* Links */}
                                    <Tab.Group as="div" className="mt-2">
                                        <div className="border-b border-gray-200">
                                            <Tab.List className="-mb-px flex space-x-8 px-4">
                                                {navigation.categories.map(
                                                    (category) => (
                                                        <Tab
                                                            key={category.name}
                                                            className={({
                                                                selected,
                                                            }) =>
                                                                classNames(
                                                                    selected
                                                                        ? "border-indigo-600 text-indigo-600"
                                                                        : "border-transparent text-gray-900",
                                                                    "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium",
                                                                )
                                                            }
                                                        >
                                                            {category.name}
                                                        </Tab>
                                                    ),
                                                )}
                                            </Tab.List>
                                        </div>
                                        <Tab.Panels as={Fragment}>
                                            {navigation.categories.map(
                                                (category) => (
                                                    <Tab.Panel
                                                        key={category.name}
                                                        className="space-y-10 px-4 pb-8 pt-10"
                                                    >
                                                        <div className="grid grid-cols-2 gap-x-4">
                                                            {category.featured.map(
                                                                (item) => (
                                                                    <div
                                                                        key={
                                                                            item.name
                                                                        }
                                                                        className="group relative text-sm"
                                                                    >
                                                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                            <img
                                                                                src={
                                                                                    item.imageSrc
                                                                                }
                                                                                alt={
                                                                                    item.imageAlt
                                                                                }
                                                                                className="object-cover object-center"
                                                                            />
                                                                        </div>
                                                                        <a
                                                                            href={
                                                                                item.href
                                                                            }
                                                                            className="mt-6 block font-medium text-gray-900"
                                                                        >
                                                                            <span
                                                                                className="absolute inset-0 z-10"
                                                                                aria-hidden="true"
                                                                            />
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </a>
                                                                        <p
                                                                            aria-hidden="true"
                                                                            className="mt-1"
                                                                        >
                                                                            Shop
                                                                            now
                                                                        </p>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                        {category.sections.map(
                                                            (section) => (
                                                                <div
                                                                    key={
                                                                        section.name
                                                                    }
                                                                >
                                                                    <p
                                                                        id={`${category.id}-${section.id}-heading-mobile`}
                                                                        className="font-medium text-gray-900"
                                                                    >
                                                                        {
                                                                            section.name
                                                                        }
                                                                    </p>
                                                                    <ul
                                                                        role="list"
                                                                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                                        className="mt-6 flex flex-col space-y-6"
                                                                    >
                                                                        {section.items.map(
                                                                            (
                                                                                item,
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        item.name
                                                                                    }
                                                                                    className="flow-root"
                                                                                >
                                                                                    <a
                                                                                        href={
                                                                                            item.href
                                                                                        }
                                                                                        className="-m-2 block p-2 text-gray-500"
                                                                                    >
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </a>
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            ),
                                                        )}
                                                    </Tab.Panel>
                                                ),
                                            )}
                                        </Tab.Panels>
                                    </Tab.Group>

                                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                        {navigation.pages.map((page) => (
                                            <div
                                                key={page.name}
                                                className="flow-root"
                                            >
                                                <a
                                                    href={page.href}
                                                    className="-m-2 block p-2 font-medium text-gray-900"
                                                >
                                                    {page.name}
                                                </a>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                        <div className="flow-root">
                                            <a className="-m-2 block p-2 font-medium text-gray-900">
                                                Sign in
                                            </a>
                                        </div>
                                        <div className="flow-root">
                                            <a
                                                href="#"
                                                className="-m-2 block p-2 font-medium text-gray-900"
                                            >
                                                Create account
                                            </a>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6">
                                        <a
                                            href="#"
                                            className="-m-2 flex items-center p-2"
                                        >
                                            <img
                                                src="https://tailwindui.com/img/flags/flag-canada.svg"
                                                alt=""
                                                className="block h-auto w-5 flex-shrink-0"
                                            />
                                            <span className="ml-3 block text-base font-medium text-gray-900">
                                                CAD
                                            </span>
                                            <span className="sr-only">
                                                , change currency
                                            </span>
                                        </a>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <header className="relative bg-white">
                    <p className="flex h-10 items-center justify-between bg-green-600 px-4 text-sm font-solid text-white sm:px-6 lg:px-8">
                        Rent all you can, Big Promos waiting for you! Check-it
                        Out!
                        <p className="flex h-10 items-center justify-between bg-green-600 px-4 text-sm font-solid text-white sm:px-6 lg:px-8">
                            <a href="#" className="px-2.5 text-sm text-white">
                                <a href="https://www.facebook.com">
                                    <FacebookIcon />
                                </a>
                                <a href="https://www.google.com">
                                    <GoogleIcon />
                                </a>
                                <a href="https://www.instagram.com">
                                    <InstagramIcon />
                                </a>
                            </a>
                        </p>
                    </p>

                    <nav
                        aria-label="Top"
                        className="mx-auto  px-4 sm:px-6 lg:px-8"
                    >
                        <div className="border-b border-gray-200">
                            <div className="flex h-15 items-center">
                                <button
                                    type="button"
                                    className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Logo */}
                                <div className="ml-4 flex lg:ml-0">
                                    <a href="#">
                                        <img
                                            style={{ width: "200px" }}
                                            className="h-30 w-100"
                                            src={initialLogo}
                                            alt=""
                                        />
                                    </a>
                                </div>

                                {/* Flyout menus */}
                                <Popover.Group className="hidden lg:ml-8 lg:flex z-50">
                                    <div className="flex h-full space-x-8">
                                        {navigation.categories.map(
                                            (category) => (
                                                <Popover
                                                    key={category.name}
                                                    className="flex"
                                                >
                                                    {({ open }) => (
                                                        <>
                                                            <div className="relative flex">
                                                                <Popover.Button
                                                                    className={classNames(
                                                                        open
                                                                            ? "border-indigo-600 text-indigo-600"
                                                                            : "border-transparent text-gray-700 hover:text-gray-800",
                                                                        "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out",
                                                                    )}
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </Popover.Button>
                                                            </div>

                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-200"
                                                                enterFrom="opacity-0"
                                                                enterTo="opacity-100"
                                                                leave="transition ease-in duration-150"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                                    <div
                                                                        className="absolute inset-0 top-1/2 bg-white shadow"
                                                                        aria-hidden="true"
                                                                    />

                                                                    <div className="relative bg-white">
                                                                        <div className="mx-auto max-w-7xl px-8">
                                                                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                                <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                                    {category.featured.map(
                                                                                        (
                                                                                            item,
                                                                                        ) => (
                                                                                            <div
                                                                                                key={
                                                                                                    item.name
                                                                                                }
                                                                                                className="group relative text-base sm:text-sm"
                                                                                            >
                                                                                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                                    <img
                                                                                                        src={
                                                                                                            item.imageSrc
                                                                                                        }
                                                                                                        alt={
                                                                                                            item.imageAlt
                                                                                                        }
                                                                                                        className="object-cover object-center"
                                                                                                    />
                                                                                                </div>
                                                                                                <a
                                                                                                    href={
                                                                                                        item.href
                                                                                                    }
                                                                                                    className="mt-6 block font-medium text-gray-900"
                                                                                                >
                                                                                                    <span
                                                                                                        className="absolute inset-0 z-10"
                                                                                                        aria-hidden="true"
                                                                                                    />
                                                                                                    {
                                                                                                        item.name
                                                                                                    }
                                                                                                </a>
                                                                                                <p
                                                                                                    aria-hidden="true"
                                                                                                    className="mt-1"
                                                                                                >
                                                                                                    Shop
                                                                                                    now
                                                                                                </p>
                                                                                            </div>
                                                                                        ),
                                                                                    )}
                                                                                </div>
                                                                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                                    {category.sections.map(
                                                                                        (
                                                                                            section,
                                                                                        ) => (
                                                                                            <div
                                                                                                key={
                                                                                                    section.name
                                                                                                }
                                                                                            >
                                                                                                <p
                                                                                                    id={`${section.name}-heading`}
                                                                                                    className="font-medium text-gray-900"
                                                                                                >
                                                                                                    {
                                                                                                        section.name
                                                                                                    }
                                                                                                </p>
                                                                                                <ul
                                                                                                    role="list"
                                                                                                    aria-labelledby={`${section.name}-heading`}
                                                                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                                >
                                                                                                    {section.items.map(
                                                                                                        (
                                                                                                            item,
                                                                                                        ) => (
                                                                                                            <li
                                                                                                                key={
                                                                                                                    item.name
                                                                                                                }
                                                                                                                className="flex"
                                                                                                            >
                                                                                                                <a
                                                                                                                    href={
                                                                                                                        item.href
                                                                                                                    }
                                                                                                                    className="hover:text-gray-800"
                                                                                                                >
                                                                                                                    {
                                                                                                                        item.name
                                                                                                                    }
                                                                                                                </a>
                                                                                                            </li>
                                                                                                        ),
                                                                                                    )}
                                                                                                </ul>
                                                                                            </div>
                                                                                        ),
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Popover.Panel>
                                                            </Transition>
                                                        </>
                                                    )}
                                                </Popover>
                                            ),
                                        )}

                                        {navigation.pages.map((page) => (
                                            <a
                                                key={page.name}
                                                href={page.href}
                                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                {page.name}
                                            </a>
                                        ))}
                                    </div>
                                </Popover.Group>

                                <div className="ml-auto flex items-center">
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        {auth.user ? (
                                            <Link
                                                href={route("dashboard")}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Dashboard
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route("login")}
                                                    className="text-sm font-semibold leading-6 text-gray-900"
                                                >
                                                    Sign in
                                                </Link>
                                                <span
                                                    className="h-6 w-px bg-gray-200"
                                                    aria-hidden="true"
                                                />
                                                <Link
                                                    href={route("register")}
                                                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                                >
                                                    Create account
                                                </Link>
                                            </>
                                        )}
                                    </div>

                                    <div className="hidden lg:ml-8 lg:flex">
                                        <a
                                            href="#"
                                            className="flex items-center text-gray-700 hover:text-gray-800"
                                        >
                                            <img
                                                src={phlogo}
                                                alt=""
                                                className="block h-auto w-5 flex-shrink-0"
                                            />
                                            <span className="ml-3 block text-sm font-medium">
                                                PHP
                                            </span>
                                            <span className="sr-only">
                                                , change currency
                                            </span>
                                        </a>
                                    </div>

                                    {/* Search */}
                                    <div className="flex lg:ml-6">
                                        <a
                                            href="#"
                                            className="p-2 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">
                                                Search
                                            </span>
                                            <MagnifyingGlassIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </div>

                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <a
                                            href="#"
                                            className="group -m-2 flex items-center p-2"
                                        >
                                            <ShoppingBagIcon
                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                                0
                                            </span>
                                            <span className="sr-only">
                                                items in cart, view bag
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                {/* Card section */}
                <div>
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                        {/* Card content goes here */}

                        <ItemDetail />

                        <div className="p-12 flex flex-col lg:flex-row">
                            <div className="lg:w-2/3 mb-7 lg:mb-0 lg:mr-12">
                                {/* Main Image */}
                                <img
                                    src="https://content2.kawasaki.com/ContentStorage/KMC/Products/8797/b1200891-3315-46af-9575-185aed6b2892.png?w=675"
                                    className="mb-4 w-full lg:w-auto lg:max-h-96"
                                />

                                {/* Small images below the main image */}
                                <div className="flex flex-wrap justify-center">
                                    <img
                                        src="https://content2.kawasaki.com/ContentStorage/KMC/Products/8797/b1200891-3315-46af-9575-185aed6b2892.png?w=675"
                                        alt="Small Image 1"
                                        className="w-1/3 sm:w-1/4 md:w-1/5 h-auto mb-2"
                                    />
                                    <img
                                        src="https://content2.kawasaki.com/ContentStorage/KMC/Products/8797/b1200891-3315-46af-9575-185aed6b2892.png?w=675"
                                        alt="Small Image 2"
                                        className="w-1/3 sm:w-1/4 md:w-1/5 h-auto mb-2"
                                    />
                                    <img
                                        src="https://content2.kawasaki.com/ContentStorage/KMC/Products/8797/b1200891-3315-46af-9575-185aed6b2892.png?w=675"
                                        alt="Small Image 3"
                                        className="w-1/3 sm:w-1/4 md:w-1/5 h-auto mb-2"
                                    />
                                </div>

                                <div className="p-4 rounded-lg  mt-4">
                                    <div className="p-2">
                                        <div className="flex items-center mb-4">
                                            <div>
                                                <img
                                                    src={defaultAvatar}
                                                    alt="Avatar"
                                                    className="rounded-full mr-4 mt-4"
                                                    style={{
                                                        width: "80px",
                                                        height: "80px",
                                                    }}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <h1 className="mt-3 text-1xl font-extrabold tracking-tight text-slate-900">
                                                    Jhonsen Dave D. Ationg
                                                </h1>
                                                <p>
                                                    Superhost | 3 years hosting
                                                </p>
                                                <div className="flex items-center">
                                                    <p>4.86</p>
                                                    <div className="ml-2">
                                                        {/* Insert star ratings component here */}
                                                        {/* Example: */}
                                                        <span
                                                            role="img"
                                                            aria-label="star"
                                                            className="text-yellow-400"
                                                        >
                                                            ⭐️
                                                        </span>
                                                        <span
                                                            role="img"
                                                            aria-label="star"
                                                            className="text-yellow-400"
                                                        >
                                                            ⭐️
                                                        </span>
                                                        <span
                                                            role="img"
                                                            aria-label="star"
                                                            className="text-yellow-400"
                                                        >
                                                            ⭐️
                                                        </span>
                                                        <span
                                                            role="img"
                                                            aria-label="star"
                                                            className="text-yellow-400"
                                                        >
                                                            ⭐️
                                                        </span>
                                                        <span
                                                            role="img"
                                                            aria-label="star"
                                                            className="text-yellow-400"
                                                        >
                                                            ⭐️
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <div className="ml-4">
                                                <div className="flex flex-wrap mt-4">
                                                    <div className="p-2">
                                                        <div className="mt-4">
                                                            <p className="text-base text-gray-700">
                                                                Kawasaki Ninja
                                                                400
                                                                Power-trains.
                                                                The Ninja 400 is
                                                                powered by a
                                                                Liquid Cooled
                                                                Fuel Injection
                                                                399 cc 2
                                                                Cylinder engine
                                                                that gives
                                                                48.9hp of power
                                                                at 10000 rpm and
                                                                38 Nm Torque at
                                                                8000 rpm. It
                                                                comes with the
                                                                option of a
                                                                6-Speed
                                                                transmission
                                                                gearbox. The
                                                                Ninja 400 has a
                                                                seat height of
                                                                785 mm.
                                                            </p>
                                                        </div>
                                                        {/* See More Icon */}

                                                        <button
                                                            className="mb-5 text-blue-500"
                                                            onClick={
                                                                toggleModal
                                                            }
                                                        >
                                                            See More..
                                                        </button>
                                                        {/* Render Modal */}
                                                        <Modal
                                                            isOpen={isModalOpen}
                                                            onClose={
                                                                toggleModal
                                                            }
                                                            title="NINJA 400 CC Full Description"
                                                            description="Kawasaki Ninja 400 Power-trains. The Ninja 400 is powered by a Liquid Cooled Fuel Injection 399 cc 2 Cylinder engine that gives 48.9hp of power at 10000 rpm and 38 Nm Torque at 8000 rpm. It comes with the option of a 6-Speed transmission gearbox. The Ninja 400 has a seat height of 785 mm."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right side: Item details */}
                            <div className="lg:w-2/4 flex flex-col ml-12 sticky top-0">
                                <div className="border border-gray-200 p-4 rounded-lg shadow-md ">
                                    <div className="p-2">
                                        <div className="mt-4">
                                            <p className="text-base text-gray-700">
                                                Decide on the duration for which
                                                you want to rent the Ninja 400
                                                CC motorcycle. You have the
                                                option to rent it for 12 hours,
                                                24 hours, or multiple days.
                                            </p>

                                            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mr-3">
                                                <div className="px-6 py-4 mr-5">
                                                    <div className="font-bold text-xl mb-2">
                                                        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                                                            ₱35,000
                                                        </h1>
                                                    </div>
                                                    <p className="text-gray-700 text-base">
                                                        12 Hours
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mr-3 mt-2">
                                                <div className="px-6 py-4 mr-5">
                                                    <div className="font-bold text-xl mb-2">
                                                        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                                                            ₱45,000
                                                        </h1>
                                                    </div>
                                                    <p className="text-gray-700 text-base">
                                                        24 Hours
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* See More Icon */}

                                        <h1 className="mt-12 text-1xl font-extrabold tracking-tight text-slate-900">
                                            Choose Dates
                                        </h1>
                                        <div className="mt-4">
                                            <Datepicker
                                                primaryColor={"teal"}
                                                value={value}
                                                onChange={handleValueChange}
                                            />
                                        </div>
                                        <div className="mt-12">
                                            <h1 className="mt-4 text-center text-1xl font-extrabold tracking-tight text-slate-900">
                                                You won't be charged yet
                                            </h1>
                                            <div className="flex items-start justify-between">
                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        className="text-blue-500 hover:text-blue-600"
                                                    >
                                                        <div className="text-xl font-bold">
                                                            ₱35,000 x 24 Hours
                                                        </div>
                                                    </button>
                                                </div>
                                                <div className="text-xl font-bold">
                                                    ₱40,000.00
                                                </div>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        className="text-blue-500 hover:text-blue-600"
                                                    >
                                                        <div className="text-xl font-bold">
                                                            Service fee
                                                        </div>
                                                    </button>
                                                </div>
                                                <div className="text-xl font-bold">
                                                    ₱1,500.00
                                                </div>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <div>Total before taxes</div>
                                                <div className="text-xl font-bold">
                                                    ₱41,500.00
                                                </div>
                                            </div>
                                        </div>

                                        {/* Button */}
                                        <div className="mt-4">
                                            <button
                                                onClick={() =>
                                                    handleCardClick(itemId)
                                                }
                                                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline"
                                            >
                                                Rent Now
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Add other item details here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
