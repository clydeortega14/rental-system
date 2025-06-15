import React from "react";

const UserProfile: React.FC = () => {
    // Example static user data
    const user = {
        name: "Angelo Papas",
        followers: 24,
        following: 58,
        membership: "Silver",
        wallet: {
            balance: 1500,
            vouchers: 5,
        },
        rentals: {
            toPay: 2,
            toReceive: 1,
            toReturn: 1,
            toRate: 3,
        },
    };

    return (
        <div className="max-w-2xl border-2 mx-auto bg-white rounded-lg shadow-md p-6 mt-8 pb-24">
            {
                /* Header */ <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                ></link>
            }
            <div className="flex items-center border-2 space-x-4 bg-white rounded-lg shadow-md p-4 text-black">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div className="text-2xl font-bold text-color-1">
                        {user.name}
                    </div>
                    <div className="text-sm">{user.membership} Member</div>
                    <div className="flex space-x-4 mt-1 text-xs">
                        <span>{user.followers} Followers</span>
                        <span>{user.following} Following</span>
                    </div>
                </div>
            </div>

            {/* My Rentals + View Rental History */}
            <div className="mt-6 bg-white border-2 rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-700">My Rentals</h3>
                    <button className="flex items-center text-color-1 text-sm hover:underline">
                        View Rental History
                        <span
                            className="material-icons ml-1"
                            style={{ fontSize: 18 }}
                        >
                            <button className="material-icons">{">"}</button>
                        </span>
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-lg font-bold">
                            {user.rentals.toPay}
                        </div>
                        <div className="text-xs text-gray-500">To Pay</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold">
                            {user.rentals.toReceive}
                        </div>
                        <div className="text-xs text-gray-500">To Receive</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold">
                            {user.rentals.toReturn}
                        </div>
                        <div className="text-xs text-gray-500">To Return</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold">
                            {user.rentals.toRate}
                        </div>
                        <div className="text-xs text-gray-500">To Rate</div>
                    </div>
                </div>
            </div>

            {/* Wallet */}
            <div className="mt-6 bg-white border-2 rounded-lg shadow p-4">
                <h3 className="font-semibold mb-2 text-gray-700">My Wallet</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="font-medium">Balance</div>
                        <div>₱ {user.wallet.balance.toLocaleString()}</div>
                    </div>
                    <div>
                        <div className="font-medium">Vouchers</div>
                        <div>{user.wallet.vouchers} Available</div>
                    </div>
                </div>
            </div>

            {/* More Activities */}
            <div className="mt-6 bg-white border-2 rounded-lg shadow p-4">
                <h3 className="font-semibold mb-2 text-gray-700">
                    More Activities
                </h3>
                <div className="flex space-x-4">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
                        Rental Loyalty
                    </button>
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded">
                        My Favorites
                    </button>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-color-1 border-t shadow flex justify-around items-center h-16 z-50 md:hidden">
                <button className="flex flex-col items-center text-white hover:text-color-1 focus:outline-none">
                    <span className="material-icons">home</span>
                    <span className="text-xs">Home</span>
                </button>
                <button className="flex flex-col items-center text-white hover:text-color-1 focus:outline-none">
                    <span className="material-icons">local_offer</span>
                    <span className="text-xs">Rent Deals</span>
                </button>
                <button className="flex flex-col items-center text-white hover:text-color-1 focus:outline-none">
                    <span className="material-icons">history</span>
                    <span className="text-xs">View Rental History</span>
                </button>
                <button className="flex flex-col items-center text-white hover:text-color-1 focus:outline-none">
                    <span className="material-icons">notifications</span>
                    <span className="text-xs">Notifications</span>
                </button>
                <button className="flex flex-col items-center text-white hover:text-color-1 focus:outline-none">
                    <span className="material-icons">person</span>
                    <span className="text-xs">Me</span>
                </button>
            </nav>
        </div>
    );
};

export default UserProfile;
