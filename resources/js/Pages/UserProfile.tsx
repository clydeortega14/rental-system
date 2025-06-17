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
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8 pb-24">
            {/* Header */}
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            ></link>
            <div className="flex items-center bg-white rounded-lg shadow p-4 text-black mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">
                        {user.name}
                    </div>
                    <div className="text-sm text-gray-500">{user.membership} Member</div>
                    <div className="flex space-x-4 mt-1 text-xs text-gray-500">
                        <span>{user.followers} Followers</span>
                        <span>{user.following} Following</span>
                    </div>
                </div>
            </div>

            {/* My Rentals + View Rental History */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg">My Rentals</h3>
                    <button className="flex items-center text-blue-600 font-semibold text-sm hover:underline">
                        View Rental History
                        <span className="material-icons ml-1 align-middle" style={{ fontSize: 18, lineHeight: 1 }}>
                            chevron_right
                        </span>
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-gray-900">
                            {user.rentals.toPay}
                        </div>
                        <div className="text-xs text-gray-500">To Pay</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">
                            {user.rentals.toReceive}
                        </div>
                        <div className="text-xs text-gray-500">To Receive</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">
                            {user.rentals.toReturn}
                        </div>
                        <div className="text-xs text-gray-500">To Return</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-900">
                            {user.rentals.toRate}
                        </div>
                        <div className="text-xs text-gray-500">To Rate</div>
                    </div>
                </div>
            </div>

            {/* Wallet */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-4 text-gray-900 text-lg">My Wallet</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="font-medium text-gray-700">Balance</div>
                        <div className="text-xl font-bold text-gray-900">₱ {user.wallet.balance.toLocaleString()}</div>
                    </div>
                    <div>
                        <div className="font-medium text-gray-700">Vouchers</div>
                        <div className="text-xl font-bold text-gray-900">{user.wallet.vouchers} Available</div>
                    </div>
                </div>
            </div>

            {/* More Activities */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-4 text-gray-900 text-lg">
                    More Activities
                </h3>
                <div className="flex space-x-4">
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition font-semibold shadow">
                        Rental Loyalty
                    </button>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-900 transition font-semibold shadow">
                        My Favorites
                    </button>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-blue-600 border-t shadow flex justify-around items-center h-16 z-50 md:hidden">
                <button className="flex flex-col items-center text-white hover:text-blue-200 focus:outline-none">
                    <span className="material-icons">home</span>
                    <span className="text-xs">Home</span>
                </button>
                <button className="flex flex-col items-center text-white hover:text-blue-200 focus:outline-none">
                    <span className="material-icons">local_offer</span>
                    <span className="text-xs">Rent Deals</span>
                </button>
                <button className="flex flex-col items-center text-white hover:text-blue-200 focus:outline-none">
                    <span className="material-icons">history</span>
                    <span className="text-xs">View Rental History</span>
                </button>
                <button className="flex flex-col items-center text-white hover:text-blue-200 focus:outline-none">
                    <span className="material-icons">notifications</span>
                    <span className="text-xs">Notifications</span>
                </button>
                <button className="flex flex-col items-center text-white hover:text-blue-200 focus:outline-none">
                    <span className="material-icons">person</span>
                    <span className="text-xs">Me</span>
                </button>
            </nav>
        </div>
    );
};

export default UserProfile;
