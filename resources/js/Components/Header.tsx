import initialLogo from "@/../../resources/img/initialLogo.png";
import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Popover } from "@headlessui/react";
import { usePage } from "@inertiajs/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Dropdown from "./Dropdown";
import { Category } from "@/Interface/CategoryInterface";

interface HeaderProps {
    setOpen: (status: boolean) => void;
}

function NavHeader({ setOpen }: HeaderProps) {
    const user = usePage<PageProps>().props.auth.user;
    return (
        <header className="bg-white">
            <nav aria-label="Top" className="mx-auto  px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                    <div className="flex h-15 items-center">
                        <button
                            type="button"
                            className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                            onClick={() => setOpen(true)}
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0 hover:shadow-xl hover:bg-gray-100">
                            <a href="#">
                                <img
                                    className="size-32"
                                    src={initialLogo}
                                    alt=""
                                />
                            </a>
                        </div>

                        {/* <div className="ms-3 items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            Categories

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {
                                        categories.map((category: Category, index: number) => (
                                            <div key={index}>
                                            <Dropdown.Link
                                                href={"#"}
                                            >
                                                    {category.label}
                                            </Dropdown.Link>
                                            </div>
                                        ))
                                    }
                                </Dropdown.Content>
                            </Dropdown>
                        </div> */}

                        {/* Flyout menus */}
                        <Popover.Group className="hidden lg:ml-8 lg:flex z-50"></Popover.Group>

                        <div className="ml-auto flex items-center">
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                {user !== null ? (
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
                                            className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 hover:shadow-xl hover:rounded-xl p-2"
                                        >
                                            Sign in
                                        </Link>
                                        <span
                                            className="h-6 w-px bg-gray-200"
                                            aria-hidden="true"
                                        />
                                        <Link
                                            href={route("register")}
                                            className="text-sm font-medium text-gray-700 hover:text-gray-800 hover:bg-gray-100 hover:shadow-xl hover:rounded-xl p-2"
                                        >
                                            Create account
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavHeader;
