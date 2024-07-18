import { Fragment, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    XMarkIcon,
    ListBulletIcon,
} from "@heroicons/react/24/outline";
import { PageProps } from "@/types";
import card1 from "@/../../resources/img/c11.png";
import card2 from "@/../../resources/img/c22.png";
import initialLogo from "@/../../resources/img/initialLogo.png";
import phlogo from "@/../../resources/img/phillipines.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import ItemLaningPage from "@/Components/LandingItemPage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const navigation = {
    pages: [],
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

type Category = {
    category_id: number;
    label: string;
};

interface CategoryProps {
    categories: Category[];
}

export default function Welcome1({
    auth,
    laravelVersion,
    phpVersion,
    categories,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    categories: CategoryProps;
}>) {
    const [open, setOpen] = useState(false);

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
                                        <div className="border-b border-gray-200"></div>
                                    </Tab.Group>

                                    <div className="space-y-6 border-t border-gray-200 px-4 py-6"></div>

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
                                <Popover.Group className="hidden lg:ml-8 lg:flex z-50"></Popover.Group>

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
                    <div className="bg-white rounded-lg overflow-hidden">
                        {/* Card content goes here */}

                        <div className="p-12">
                            <ItemLaningPage categories={categories} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
