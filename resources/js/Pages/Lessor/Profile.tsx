import React, { useState, lazy, Suspense } from "react";
import type { Lessor } from "@/Pages/Lessor/types/Profile";
import {
  BiCog,
} from "react-icons/bi";

const ProfileModal = lazy(() => import("@/Pages/Lessor/modals/ProfileModal"));
const KycModal = lazy(() => import("@/Pages/Lessor/modals/KycModal"));
const TwoFactorModal = lazy(() => import("@/Pages/Lessor/modals/TwoFactorAuthModal"));
const ChangePasswordModal = lazy(() => import("@/Pages/Lessor/modals/ChangePasswordModal"));

export default function Profile() {
  const [lessor, setLessor] = useState<Lessor>({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, City, Country",
    dateOfBirth: undefined,
    gender: "",
    nationality: undefined,
    kycStatus: "Pending",
    fullName: "John Doe",
    documentNumber: "1234-5678-9000",
    twoFactorEnabled: true,
  });

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<"email" | "authenticator">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(lessor.twoFactorEnabled);

  const handleToggleTwoFactor = async (enabled: boolean, code?: string) => {
    setIsLoading(true);
    try {
      // API call to enable/disable 2FA with code verification here
      // await api.toggleTwoFactor(enabled, code);

      setTwoFactorEnabled(enabled);
      setLessor(prev => ({ ...prev, twoFactorEnabled: enabled }));
      setShowTwoFactorModal(false);
    } catch (error) {
      console.error("Error toggling two-factor authentication:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVerificationCode = async () => {
    setIsLoading(true);
    try {
      // API call to send verification code depending on verificationMethod
      // await api.sendVerificationCode(verificationMethod);

      console.log(`Sent verification code via ${verificationMethod}`);
    } catch (error) {
      console.error("Error sending verification code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFallback = (text: string) => (
    <div className="flex items-center justify-center min-h-[12rem] text-gray-500 italic select-none">
      {text}
    </div>
  );

  const handleKycUpdate = (data: { kycStatus: string; fullName: string; documentNumber: string }) => {
    setLessor((prev) => {
      const [firstName, ...lastNameParts] = data.fullName.trim().split(" ");
      return {
        ...prev,
        kycStatus: data.kycStatus,
        firstName: firstName || prev.firstName,
        lastName: lastNameParts.join(" ") || prev.lastName,
        documentNumber: data.documentNumber,
      };
    });
  };

  return (
    
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="flex items-center text-3xl font-bold mb-6 text-orange-600">
          <BiCog className="w-6 h-6 text-orange-500 mr-2" />
          Account Settings
        </h1>
        <p className="mt-1 text-gray-600 max-w-xl">Manage your profile, identity verification, and security settings.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Profile Summary */}
        <aside className="col-span-1 bg-white shadow-lg rounded-3xl p-6 flex flex-col">
          <div className="flex items-center gap-5 mb-6">
            <div
              className="h-20 w-20 rounded-full bg-orange-600 text-white font-extrabold text-3xl flex items-center justify-center select-none"
              aria-label={`Profile avatar for ${lessor.firstName} ${lessor.lastName}`}
              title={`${lessor.firstName} ${lessor.lastName}`}
            >
              {lessor.firstName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col truncate">
              <h2 className="text-2xl font-semibold text-gray-900 truncate">
                {lessor.firstName} {lessor.lastName}
              </h2>
              <p className="text-sm text-gray-600 truncate">{lessor.email}</p>
              <p className="text-sm text-gray-500 truncate">{lessor.phone}</p>
            </div>
          </div>

          {/* Additional profile details */}
          <div className="mb-6 space-y-2 text-gray-700 text-sm">
            {lessor.role && (
              <p>
                <span className="font-semibold text-gray-900">Role:</span> {lessor.role}
              </p>
            )}
            {lessor.location && (
              <p>
                <span className="font-semibold text-gray-900">Location:</span> {lessor.location}
              </p>
            )}
            {lessor.company && (
              <p>
                <span className="font-semibold text-gray-900">Company:</span> {lessor.company}
              </p>
            )}
            {lessor.joinedAt && (
              <p>
                <span className="font-semibold text-gray-900">Member since:</span>{" "}
                {new Date(lessor.joinedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          {/* Social Links */}
          {(lessor.linkedin || lessor.website) && (
            <div className="mb-6 border-t border-gray-200 pt-4 flex gap-4 text-gray-600">
              {lessor.linkedin && (
                <a
                  href={lessor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  {/* LinkedIn Icon */}
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M4.983 3.5C3.342 3.5 2 4.848 2 6.474c0 1.6 1.3 2.974 2.995 2.974h.034c1.682 0 3.005-1.374 3.005-2.974-.034-1.626-1.323-2.974-3.05-2.974zm.034 4.973H2V21h3.017v-12.53zm5.732 0h-3.017V21h3.017v-6.724c0-1.07.61-1.647 1.438-1.647.828 0 1.21.564 1.21 1.647V21h3.017v-7.683c0-3.91-2.087-5.722-4.866-5.722-2.184 0-3.154 1.218-3.69 2.076h.027v-1.783z" />
                  </svg>
                </a>
              )}
              {lessor.website && (
                <a
                  href={lessor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors"
                  aria-label="Personal Website"
                >
                  {/* Website Icon */}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3c4.97 0 9 4.03 9 9 0 4.97-4.03 9-9 9S3 16.97 3 12c0-4.97 4.03-9 9-9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v8m4-4H8"
                    />
                  </svg>
                </a>
              )}
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-shadow shadow-md focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-opacity-50"
              onClick={() => setShowProfileModal(true)}
              aria-label="Edit Profile"
            >
              Edit Profile
            </button>
          </div>
        </aside>

        {/* Settings Panels */}
        <section className="col-span-1 md:col-span-1 lg:col-span-2 space-y-8">
          {/* KYC Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">KYC Verification</h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-gray-700">
                Status:{" "}
                <span
                  className={`font-medium ${
                    lessor.kycStatus === "Verified" ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {lessor.kycStatus}
                </span>
              </p>
              <button
                type="button"
                className="inline-block rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-opacity-50"
                onClick={() => setShowKycModal(true)}
                aria-label="Update KYC Verification"
              >
                Update KYC
              </button>
            </div>
          </div>

          {/* Two-Factor Auth Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Two-Factor Authentication</h3>
            <p className="text-gray-700 mb-4">
              {lessor.twoFactorEnabled
                ? "Two-Factor Authentication is enabled for your account."
                : "Two-Factor Authentication is currently disabled. We recommend enabling it for added security."}
            </p>
            <button
              type="button"
              className="inline-block rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-opacity-50"
              onClick={() => setShowTwoFactorModal(true)}
              aria-label="Manage Two-Factor Authentication"
            >
              {lessor.twoFactorEnabled ? "Manage 2FA" : "Enable 2FA"}
            </button>
          </div>

          {/* Password Change Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Change Password</h3>
            <p className="text-gray-700 mb-4">
              Regularly updating your password helps protect your account.
            </p>
            <button
              type="button"
              className="inline-block rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-opacity-50"
              onClick={() => setShowChangePasswordModal(true)}
              aria-label="Change Password"
            >
              Change Password
            </button>
          </div>
        </section>
      </div>

      {/* Lazy-loaded modals */}
      <Suspense fallback={renderFallback("Loading Profile Settings...")}>
        {showProfileModal && (
          <ProfileModal
            lessor={lessor}
            onClose={() => setShowProfileModal(false)}
            onSave={(data) => setLessor((prev) => ({ ...prev, ...data }))}
          />
        )}
      </Suspense>

      <Suspense fallback={renderFallback("Loading KYC Modal...")}>
        {showKycModal && (
          <KycModal
            lessor={lessor}
            onClose={() => setShowKycModal(false)}
            onUpdate={handleKycUpdate}
          />
        )}
      </Suspense>

      <Suspense fallback={renderFallback("Loading Two-Factor Authentication...")}>
        {showTwoFactorModal && (
          <TwoFactorModal
            twoFactorEnabled={twoFactorEnabled ?? false}
            onClose={() => setShowTwoFactorModal(false)}
            onToggleTwoFactor={handleToggleTwoFactor}
            onSendVerificationCode={handleSendVerificationCode}
            verificationMethod={verificationMethod}
            emailHint={lessor.email}
          />
        )}
      </Suspense>

      <Suspense fallback={renderFallback("Loading Password Change Modal...")}>
        {showChangePasswordModal && (
          <ChangePasswordModal
            onClose={() => setShowChangePasswordModal(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
