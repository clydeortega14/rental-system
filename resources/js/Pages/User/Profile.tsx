import React, { useState, lazy, Suspense, ReactElement, useEffect } from "react";
import axios from "axios";
import { usePage, router } from "@inertiajs/react";
import type { PageProps } from "@/types";
import LessorLayout from "@/Layouts/LessorLayout";
import type { User } from "@/Pages/User/types/Profile";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/Components/Lessor/ui/badge";
import type { BadgeVariant } from "@/Components/Lessor/ui/badge";

const ProfileModal = lazy(() => import("@/Pages/User/modals/ProfileModal"));
const KycModal = lazy(() => import("@/Pages/User/modals/KycModal"));
const TwoFactorModal = lazy(() => import("@/Pages/User/modals/TwoFactorAuthModal"));
const ChangePasswordModal = lazy(() => import("@/Pages/User/modals/ChangePasswordModal"));

const Profile = () => {
  const { props } = usePage<PageProps<{ user: User }>>();
  const { user } = props;
  const { toast } = useToast();

  const [modals, setModals] = useState({
    profile: false,
    kyc: false,
    twoFactor: false,
    password: false,
  });

  const openModal = (type: keyof typeof modals) =>
    setModals((prev) => ({ ...prev, [type]: true }));

  const closeModal = (type: keyof typeof modals) =>
    setModals((prev) => ({ ...prev, [type]: false }));

  const [userKyc, setUserKyc] = useState<User["kyc"] | null>(user?.kyc ?? null);

  const fetchKyc = async () => {
    try {
      const response = await axios.get("/user/kyc");
      setUserKyc(response.data);
    } catch (err) {
      console.error("Failed to fetch KYC:", err);
    }
  };

  const handleSave = (updatedUser: User) => {
    const payload = {
      name: updatedUser.name,
      email: updatedUser.email,
      contact: updatedUser.contact,
      company: updatedUser.company,
    };

    router.put("/lessor/profile", payload, {
      onSuccess: () => {
        toast({
          title: "Profile updated",
          description: "Your personal information has been successfully updated.",
          variant: "default",
        });
        closeModal("profile");
      },
      onError: () => {
        toast({
          title: "Update failed",
          description: "Please check the form and try again.",
          variant: "destructive",
        });
      },
    });
  };

  const kycStatus = userKyc?.kyc_status ?? user?.kyc?.kyc_status;

  const kycStatusDisplayMap: Record<
    string,
    { label: string; variant: BadgeVariant }
  > = {
    Approved: { label: "Approved", variant: "success" },
    Pending: { label: "Pending", variant: "warning" },
    Rejected: { label: "Rejected", variant: "destructive" },
    Incomplete: { label: "Incomplete", variant: "secondary" },
    default: { label: "Not Submitted", variant: "secondary" },
  };

  const kycInfo = kycStatusDisplayMap[kycStatus ?? ""] ?? kycStatusDisplayMap["default"];
  const isReadOnly = userKyc?.kyc_status !== "Rejected";

  const canResubmit = userKyc?.kyc_status === "Rejected";

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-10">
      {/* Personal Info */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email Address</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone Number</p>
            <p className="font-medium">{user?.contact?.mobile ?? "—"}</p>
          </div>
          <div>
            <p className="text-gray-500">Company</p>
            <p className="font-medium">{user?.company?.name ?? "—"}</p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => openModal("profile")}
            className="bg-orange-500 text-white px-5 py-2 rounded-xl hover:bg-orange-600 transition"
          >
            Edit Profile
          </button>
        </div>
      </section>

      {/* KYC Verification */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">KYC Verification</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-gray-700">Status:</p>
            <Badge variant={kycInfo.variant}>{kycInfo.label}</Badge>
          </div>
          {kycStatus === "Approved" || kycStatus === "Pending" ? (
            <button
              disabled
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-xl cursor-not-allowed"
            >
              Submitted
            </button>
          ) : (
            <button
              onClick={() => openModal("kyc")}
              className="bg-orange-500 text-white px-5 py-2 rounded-xl hover:bg-orange-600 transition"
            >
              {kycStatus === "Rejected" ? "Resubmit" : "Verify Now"}
            </button>
          )}
        </div>
      </section>

      {/* Security Settings */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => openModal("twoFactor")}
            className="bg-orange-500 text-white px-5 py-2 rounded-xl hover:bg-orange-600 transition"
          >
            Manage 2FA
          </button>
          <button
            onClick={() => openModal("password")}
            className="bg-gray-800 text-white px-5 py-2 rounded-xl hover:bg-gray-900 transition"
          >
            Change Password
          </button>
        </div>
      </section>

      {/* Modals */}
      <Suspense fallback={null}>
        {modals.profile && (
          <ProfileModal
            isOpen={modals.profile}
            user={user}
            onClose={() => closeModal("profile")}
            onSave={handleSave}
          />
        )}
        {modals.kyc && (
          <KycModal
            user_id={user?.id}
            userKyc={
              user?.kyc
                ? {
                    full_name: user.kyc.full_name ?? "",
                    document_number: user.kyc.document_number ?? "",
                    document_type: user.kyc.document_type ?? "",
                    selfie_path: user.kyc.selfie_path ?? null,
                    document_path: user.kyc.document_path ?? null,
                    kyc_status:
                      ["Pending", "Approved", "Rejected"].includes(
                        user.kyc.kyc_status ?? ""
                      )
                        ? (user.kyc.kyc_status as "Pending" | "Approved" | "Rejected")
                        : null,
                  }
                : null
            }
            isReadOnly={isReadOnly}
            onClose={() => closeModal("kyc")}
            onUpdate={fetchKyc}
          />
        )}
        {/* Optional Modals */}
        {/* {modals.twoFactor && (
          <TwoFactorModal isOpen onClose={() => closeModal("twoFactor")} />
        )}
        {modals.password && (
          <ChangePasswordModal isOpen onClose={() => closeModal("password")} />
        )} */}
      </Suspense>
    </div>
  );
};

Profile.layout = (page: ReactElement) => <LessorLayout>{page}</LessorLayout>;

export default Profile;
