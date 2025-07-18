import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/Components/Lessor/ui/dialog";
import { Button } from "@/Components/Lessor/ui/button";

interface SecuritySettingsModalProps {
  twoFactorEnabled: boolean;
  onClose: () => void;

  /**
   * Function to enable or disable 2FA.
   * If enabling, you may want to pass the verification code.
   * Here we keep it simple and just toggle boolean for demo.
   */
  onToggleTwoFactor: (enable: boolean, verificationCode?: string) => Promise<void>;

  /**
   * Function to change password.
   * Passes current and new password.
   */
  onChangePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

export default function SecuritySettingsModal({
  twoFactorEnabled,
  onClose,
  onToggleTwoFactor,
  onChangePassword,
}: SecuritySettingsModalProps) {
  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // 2FA state
  const [show2FAVerify, setShow2FAVerify] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState<string | null>(null);

  // Trigger showing 2FA verification input when enabling 2FA
  const handleEnable2FA = () => {
    setTwoFactorError(null);
    setShow2FAVerify(true);
  };

  // Submit 2FA verification to enable 2FA
  const handleVerify2FA = async () => {
    setTwoFactorError(null);

    if (twoFactorCode.trim().length === 0) {
      setTwoFactorError("Please enter the authentication code.");
      return;
    }

    setTwoFactorLoading(true);
    try {
      await onToggleTwoFactor(true, twoFactorCode.trim());
      setShow2FAVerify(false);
      setTwoFactorCode("");
    } catch (error) {
      setTwoFactorError("Failed to verify code. Please try again.");
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // Disable 2FA immediately
  const handleDisable2FA = async () => {
    setTwoFactorLoading(true);
    setTwoFactorError(null);
    try {
      await onToggleTwoFactor(false);
    } catch (error) {
      setTwoFactorError("Failed to disable 2FA. Please try again.");
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // Handle password change submit
  const handleChangePasswordSubmit = async () => {
    setPasswordError(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordLoading(true);
    try {
      await onChangePassword({ currentPassword, newPassword });
      // Clear fields on success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError(null);
      alert("Password changed successfully.");
    } catch (error) {
      setPasswordError("Failed to change password. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Security Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Two-Factor Authentication Section */}
          <section>
            <h3 className="font-semibold text-lg mb-2">Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-gray-600 mb-4">
              {twoFactorEnabled
                ? "2FA is enabled on your account."
                : "2FA is currently disabled."}
            </p>

            {!twoFactorEnabled && !show2FAVerify && (
              <>
                <p className="text-xs text-gray-400 mb-4">
                  To enable 2FA, you will be asked to scan a QR code using an
                  authenticator app like Google Authenticator or Authy, then enter a
                  verification code.
                </p>
                <Button
                  onClick={handleEnable2FA}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Enable 2FA
                </Button>
              </>
            )}

            {show2FAVerify && (
              <div className="space-y-3">
                {/* You can add a QR code display here, e.g. <QRCode /> */}
                <label
                  htmlFor="twoFactorCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Authentication Code
                </label>
                <input
                  id="twoFactorCode"
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter code from your authenticator app"
                />
                {twoFactorError && (
                  <p className="text-red-600 text-sm">{twoFactorError}</p>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={handleVerify2FA}
                    disabled={twoFactorLoading || twoFactorCode.trim().length === 0}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    {twoFactorLoading ? "Verifying..." : "Verify & Enable"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShow2FAVerify(false);
                      setTwoFactorCode("");
                      setTwoFactorError(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {twoFactorEnabled && (
              <Button
                onClick={handleDisable2FA}
                disabled={twoFactorLoading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mt-4"
              >
                {twoFactorLoading ? "Disabling..." : "Disable 2FA"}
              </Button>
            )}

            {twoFactorError && !show2FAVerify && (
              <p className="text-red-600 mt-2 text-sm">{twoFactorError}</p>
            )}
          </section>

          {/* Change Password Section */}
          <section>
            <h3 className="font-semibold text-lg mb-2">Change Password</h3>
            <p className="text-sm text-gray-600 mb-4">
              Update your account password securely.
            </p>

            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-orange-500 focus:border-orange-500"
              />

              {passwordError && (
                <p className="text-red-600 text-sm">{passwordError}</p>
              )}

              <Button
                onClick={handleChangePasswordSubmit}
                disabled={passwordLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                {passwordLoading ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </section>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
