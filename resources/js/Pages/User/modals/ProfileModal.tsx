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
import { User } from "@/Pages/User/types/Profile";

interface ProfileModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onSave: (updatedData: User) => void;
}

export default function ProfileModal({ isOpen, user, onClose, onSave }: ProfileModalProps) {
  const [formData, setFormData] = useState<User>(user);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value },
      }));
    } else if (name.startsWith("billingAddress.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        billingAddress: { ...prev.billingAddress, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { name, email } = formData;
    if (!name.trim() || !email.trim()) {
      setError("Name and Email are required.");
      return;
    }

    setError(null);
    onSave(formData);
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm appearance-none outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[44px] leading-6";
  const labelClass = "text-sm font-medium text-gray-700 mb-1 block";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg w-full px-6 sm:px-8 py-6 sm:py-8 rounded-3xl shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-1">
            Update your personal information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              required
              placeholder="Enter Name"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData?.email}
              onChange={handleChange}
              required
              placeholder="example@domain.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="contact.mobile" className={labelClass}>
              Mobile
            </label>
            <input
              id="contact.mobile"
              name="contact.mobile"
              type="tel"
              value={formData?.contact?.mobile || ""}
              onChange={handleChange}
              placeholder="e.g. +1 555 123 4567"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="billingAddress.street" className={labelClass}>
              Street Address
            </label>
            <input
              id="billingAddress.street"
              name="billingAddress.street"
              value={formData?.billingAddress?.street || ""}
              onChange={handleChange}
              placeholder="Enter street address"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="billingAddress.city" className={labelClass}>
                City
              </label>
              <input
                id="billingAddress.city"
                name="billingAddress.city"
                value={formData?.billingAddress?.city || ""}
                onChange={handleChange}
                placeholder="City"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="billingAddress.region" className={labelClass}>
                Region
              </label>
              <input
                id="billingAddress.region"
                name="billingAddress.region"
                value={formData?.billingAddress?.region || ""}
                onChange={handleChange}
                placeholder="Region"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="billingAddress.province" className={labelClass}>
                Province
              </label>
              <input
                id="billingAddress.province"
                name="billingAddress.province"
                value={formData?.billingAddress?.province || ""}
                onChange={handleChange}
                placeholder="Province"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="billingAddress.postal_code" className={labelClass}>
                Postal Code
              </label>
              <input
                id="billingAddress.postal_code"
                name="billingAddress.postal_code"
                value={formData?.billingAddress?.postal_code || ""}
                onChange={handleChange}
                placeholder="Postal Code"
                className={inputClass}
              />
            </div>
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
