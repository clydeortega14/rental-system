// @/Pages/Lessor/modals/ProfileModal.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/Components/Lessor/ui/dialog";
import { Lessor } from "@/Pages/Lessor/types/Profile";

interface ProfileModalProps {
  lessor: Lessor;
  onClose: () => void;
  onSave: (updatedData: Lessor) => void;
}

export default function ProfileModal({ lessor, onClose, onSave }: ProfileModalProps) {
  const [formData, setFormData] = useState(lessor);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setError("First name, last name, and email are required.");
      return;
    }

    setError(null);
    onSave(formData);
    onClose();
  };

  const inputSelectBaseClasses =
    "w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-900 text-sm shadow-sm appearance-none outline-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[44px] leading-6";

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-lg w-full px-6 sm:px-8 py-6 sm:py-8 rounded-3xl shadow-xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-1">
            Update your personal information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1 block">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter first name"
                autoComplete="given-name"
                className={inputSelectBaseClasses}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1 block">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter last name"
                autoComplete="family-name"
                className={inputSelectBaseClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@domain.com"
              autoComplete="email"
              className={inputSelectBaseClasses}
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 555 123 4567"
              autoComplete="tel"
              className={inputSelectBaseClasses}
            />
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1 block">
              Address
            </label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              autoComplete="street-address"
              className={inputSelectBaseClasses}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700 mb-1 block">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth || ""}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className={inputSelectBaseClasses}
              />
              <p className="text-xs text-gray-500 mt-1">You must be at least 18 years old.</p>
            </div>

            <div>
              <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-1 block">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                className={inputSelectBaseClasses}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="nationality" className="text-sm font-medium text-gray-700 mb-1 block">
              Nationality
            </label>
            <input
              id="nationality"
              name="nationality"
              value={formData.nationality || ""}
              onChange={handleChange}
              placeholder="Enter nationality"
              autoComplete="country-name"
              className={inputSelectBaseClasses}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-4 py-2">
              {error}
            </div>
          )}

          <DialogFooter className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="w-full sm:w-auto rounded-xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl px-6 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Save Changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
