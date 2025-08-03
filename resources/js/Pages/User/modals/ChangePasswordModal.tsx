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
import { router } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Strength = "Weak" | "Medium" | "Strong";

function PasswordInput({
  id,
  label,
  value,
  onChange,
  visible,
  toggleVisibility,
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  visible: boolean;
  toggleVisibility: () => void;
  autoComplete: string;
  error?: string;
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
          className={`w-full rounded-md border px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-700 focus:outline-none"
          tabIndex={-1}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

export default function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [form, setForm] = useState({
    current: "",
    newPwd: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState<Strength>("Weak");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setStrength(evaluateStrength(form.newPwd));
  }, [form.newPwd]);

  const evaluateStrength = (password: string): Strength => {
    const strong = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/;
    const medium = /(?=.*[a-zA-Z])(?=.*\d).{6,}/;
    if (strong.test(password)) return "Strong";
    if (medium.test(password)) return "Medium";
    return "Weak";
  };

  const getStrengthColor = (level: Strength) => {
    return {
      Strong: "bg-green-500",
      Medium: "bg-orange-400",
      Weak: "bg-red-500",
    }[level];
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error on typing
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (form.newPwd !== form.confirm) {
      setErrors({ confirm: "Passwords do not match." });
      return;
    }

    setLoading(true);

    router.post(
      "/user/change-password",
      {
        current_password: form.current,
        password: form.newPwd,
        password_confirmation: form.confirm,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast({ title: "Password updated successfully!", variant: "default" });
          setForm({ current: "", newPwd: "", confirm: "" });
          onClose();
        },
        onError: (err) => {
          setErrors(err);
        },
        onFinish: () => {
          setLoading(false);
        },
      }
    );
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
            value={form.current}
            onChange={(e) => handleChange("current", e.target.value)}
            visible={showCurrent}
            toggleVisibility={() => setShowCurrent((v) => !v)}
            autoComplete="current-password"
            error={errors.current_password}
          />

          <PasswordInput
            id="new-password"
            label="New Password"
            value={form.newPwd}
            onChange={(e) => handleChange("newPwd", e.target.value)}
            visible={showNew}
            toggleVisibility={() => setShowNew((v) => !v)}
            autoComplete="new-password"
            error={errors.password}
          />

          {form.newPwd && (
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
                    width: strength === "Weak" ? "33%" : strength === "Medium" ? "66%" : "100%",
                  }}
                ></div>
              </div>
            </div>
          )}

          <PasswordInput
            id="confirm-password"
            label="Confirm New Password"
            value={form.confirm}
            onChange={(e) => handleChange("confirm", e.target.value)}
            visible={showConfirm}
            toggleVisibility={() => setShowConfirm((v) => !v)}
            autoComplete="new-password"
            error={errors.password_confirmation}
          />

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
