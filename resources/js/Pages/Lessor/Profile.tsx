import React, { useState } from "react";

export default function Profile() {
  const [lessor, setLessor] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, City, Country",
    kycStatus: "Verified",
    twoFactorEnabled: true,
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">Personal Information</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Overview */}
        <div className="col-span-1 bg-white shadow rounded-xl p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-semibold text-white">
              {lessor.name[0]}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{lessor.name}</h2>
              <p className="text-gray-600">{lessor.email}</p>
              <p className="text-gray-500 text-sm">{lessor.phone}</p>
            </div>
          </div>
          <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-400">
            Edit Profile
          </button>
        </div>

        {/* Right Column: Details */}
        <div className="col-span-2 space-y-6">
          {/* KYC Section */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">KYC Verification</h3>
            <div className="flex items-center justify-between">
              <p>
                Status:{" "}
                <span
                  className={`font-medium ${
                    lessor.kycStatus === "Verified"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {lessor.kycStatus}
                </span>
              </p>
              <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-200">
                {lessor.kycStatus === "Verified" ? "Update KYC" : "Complete KYC"}
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">
                    {lessor.twoFactorEnabled
                      ? "2FA is enabled on your account."
                      : "2FA is currently disabled."}
                  </p>
                </div>
                <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-200">
                  {lessor.twoFactorEnabled ? "Disable" : "Enable"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Change Password</p>
                  <p className="text-sm text-gray-500">Update your account password securely.</p>
                </div>
                <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-200">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Contact Address */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Contact Address</h3>
            <p className="text-gray-600">{lessor.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
