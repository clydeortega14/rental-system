import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/Components/Lessor/ui/dialog";
import { Button } from "@/Components/Lessor/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface ChangePasswordModalProps {
  onClose: () => void;
}

// Simulate your API call here or replace with actual API request
async function changePasswordAPI(data: { currentPassword: string; newPassword: string }) {
  // Example: fake API delay
  await new Promise((r) => setTimeout(r, 1500));

  // Here you can throw an error to simulate failure, or resolve for success
  if (data.currentPassword !== "correct-password") {
    throw new Error("Current password is incorrect");
  }
  return true;
}

type Strength = "Weak" | "Medium" | "Strong";

// Reusable Password Input Component (unchanged)
function PasswordInput({
  id,
  label,
  value,
  onChange,
  visible,
  toggleVisibility,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  visible: boolean;
  toggleVisibility: () => void;
  autoComplete: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={label}
          autoComplete={autoComplete}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
          style={{ WebkitTextSecurity: visible ? "none" : "disc" } as any}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-700 focus:outline-none"
          tabIndex={-1}
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export default function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState<Strength>("Weak");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setStrength(evaluateStrength(newPwd));
  }, [newPwd]);

  const evaluateStrength = (password: string): Strength => {
    const strong = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/;
    const medium = /(?=.*[a-zA-Z])(?=.*\d).{6,}/;
    if (strong.test(password)) return "Strong";
    if (medium.test(password)) return "Medium";
    return "Weak";
  };

  const getStrengthColor = (level: Strength) => {
    switch (level) {
      case "Strong":
        return "bg-green-500";
      case "Medium":
        return "bg-orange-400";
      default:
        return "bg-red-500";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!current || !newPwd || !confirm) {
      setError("All fields are required.");
      return;
    }
    if (newPwd !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Call internal API method here
      await changePasswordAPI({ currentPassword: current, newPassword: newPwd });
      setCurrent("");
      setNewPwd("");
      setConfirm("");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:max-w-lg rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Change Password</DialogTitle>
          <DialogDescription className="mt-1 text-sm text-gray-600">
            Update your password to keep your account secure.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <PasswordInput
            id="current-password"
            label="Current Password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            visible={showCurrent}
            toggleVisibility={() => setShowCurrent((v) => !v)}
            autoComplete="current-password"
          />

          <PasswordInput
            id="new-password"
            label="New Password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            visible={showNew}
            toggleVisibility={() => setShowNew((v) => !v)}
            autoComplete="new-password"
          />

          {newPwd && (
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                <span>Password strength</span>
                <span className={`${getStrengthColor(strength)} px-2 py-0.5 rounded text-white`}>
                  {strength}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className={`h-2 rounded transition-all duration-300 ${getStrengthColor(strength)}`}
                  style={{
                    width:
                      strength === "Weak" ? "33%" : strength === "Medium" ? "66%" : "100%",
                  }}
                ></div>
              </div>
            </div>
          )}

          <PasswordInput
            id="confirm-password"
            label="Confirm New Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            visible={showConfirm}
            toggleVisibility={() => setShowConfirm((v) => !v)}
            autoComplete="new-password"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <DialogFooter className="flex justify-end gap-3 mt-6">
            <Button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              {loading ? "Changing..." : "Change Password"}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="rounded-lg"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
