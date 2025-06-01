import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/Components/Lessor/ui/dialog";

type TwoFactorModalProps = {
  twoFactorEnabled: boolean;
  onClose: () => void;
  onToggleTwoFactor: (enabled: boolean, code?: string) => Promise<void>;
  onSendVerificationCode: () => Promise<void>;
  verificationMethod: "email" | "authenticator";
  emailHint?: string;
};

export default function TwoFactorAuthModal({
  twoFactorEnabled,
  onClose,
  onToggleTwoFactor,
  onSendVerificationCode,
  verificationMethod,
  emailHint,
}: TwoFactorModalProps) {
  const [isEnabled, setIsEnabled] = useState(twoFactorEnabled);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSendCode = async () => {
    setError(null);
    setInfo(null);
    setSendLoading(true);
    try {
      await onSendVerificationCode();
      setCodeSent(true);
      setInfo("Verification code sent.");
      setResendCooldown(30);
    } catch {
      setError("Failed to send verification code. Please try again.");
    } finally {
      setSendLoading(false);
    }
  };

  const handleToggle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setToggleLoading(true);
    try {
      await onToggleTwoFactor(!isEnabled, verificationCode.trim());
      setIsEnabled(!isEnabled);
      setVerificationCode("");
      setCodeSent(false);
      onClose();
    } catch {
      setError("Verification failed. Please check the code and try again.");
    } finally {
      setToggleLoading(false);
    }
  };

  const methodHint =
    verificationMethod === "email"
      ? `Check your email${emailHint ? ` (${emailHint})` : ""} for the 6-digit code.`
      : "Use the 6-digit code from your authenticator app.";

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-8 rounded-3xl shadow-xl">
        <DialogHeader className="mb-4">
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Two-Factor Authentication
            </DialogTitle>
            <DialogClose asChild>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
              </button>
            </DialogClose>
          </div>
          <DialogDescription className="text-gray-600">
            {isEnabled
              ? "Two-factor authentication is currently enabled."
              : "Two-factor authentication is currently disabled."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleToggle} className="space-y-6">
          {!isEnabled && (
            <div>
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Verification Code
              </label>
              <div className="relative">
                <input
                  id="verificationCode"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full pr-32 rounded-xl border border-gray-300 px-4 py-2 text-gray-900 text-sm
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                    shadow-sm"
                  autoComplete="one-time-code"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={sendLoading || resendCooldown > 0}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-xl px-3 py-1.5
                    text-sm font-medium text-orange-600 hover:underline
                    disabled:text-gray-400 disabled:no-underline"
                >
                  {sendLoading
                    ? "Sending..."
                    : codeSent
                    ? resendCooldown > 0
                      ? `Resend (${resendCooldown})`
                      : "Resend"
                    : "Send"}
                </button>

                {codeSent && resendCooldown > 0 && (
                  <div className="absolute right-28 top-1/2 -translate-y-1/2 w-5 h-5">
                    <svg className="w-full h-full animate-spin-slow" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        className="text-orange-600"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${((30 - resendCooldown) / 30) * 100}, 100`}
                      />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">{methodHint}</p>
            </div>
          )}

          {info && <p className="text-sm text-green-600">{info}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end space-x-3 pt-4">
            <DialogClose asChild>
              <button
                type="button"
                disabled={toggleLoading || sendLoading}
                className="rounded-xl px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium disabled:opacity-50"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={
                toggleLoading || (!isEnabled && (!codeSent || verificationCode.trim().length !== 6))
              }
              className="rounded-xl px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold disabled:opacity-50"
            >
              {toggleLoading
                ? isEnabled
                  ? "Disabling..."
                  : "Enabling..."
                : isEnabled
                ? "Disable"
                : "Enable"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
