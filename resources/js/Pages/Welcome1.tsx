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
import { IRentalItems } from "@/Interface/RentalItems";

import NavHeader from "@/Components/Header";
import CarRentalForm from "@/Components/Forms/CarRental";
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
    rental_items,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    categories: CategoryProps;
    rental_items: IRentalItems;
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

                <NavHeader open={open} setOpen={setOpen} />

                {/* CAR RENTAL FORM */}
                <CarRentalForm />

                {/* Card section */}
                <div>
                    <div className="border-gray-900/10 rounded-lg overflow-hidden min-h-full">
                        {/* Card content goes here */}

                        <div>
                            <ItemLaningPage
                                categories={categories}
                                items={rental_items}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
