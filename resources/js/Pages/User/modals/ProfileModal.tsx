import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/Components/Lessor/ui/dialog";
import { User, BillingAddress, Contact } from "@/Pages/User/types/Profile";

interface ProfileModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onSave: (updatedData: FormData) => void;
}

export default function ProfileModal({
  isOpen,
  user,
  onClose,
  onSave,
}: ProfileModalProps) {
  /** Default values */
  const defaultBillingAddress: BillingAddress = {
    street: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    country: "",
    postal_code: 0,
  };

  const defaultContact: Contact = {
    id: 0,
    mobile: "",
  };

  /** State */
  const [formData, setFormData] = useState<User>({
    ...user,
    contact: user.contact || defaultContact,
    billing_address: user.billing_address || defaultBillingAddress,
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(user.avatar ?? "/images/avatar.jpg");
  const [error, setError] = useState<string | null>(null);

  /** Reset state on open */
  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...user,
        contact: user.contact || defaultContact,
        billing_address: user.billing_address || defaultBillingAddress,
      });
      setPreview(user.avatar ?? "/images/avatar.jpg");
      setProfileImage(null);
      setError(null);
    }
  }, [isOpen, user]);

  /** Handle input changes */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setError(null); // clear error on change

    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value },
      }));
    } else if (name.startsWith("billing_address.")) {
      const field = name.split(".")[1] as keyof BillingAddress;
      setFormData((prev) => ({
        ...prev,
        billing_address: {
          ...((prev.billing_address as BillingAddress) ?? {
            street: "",
            region: "",
            province: "",
            city: "",
            barangay: "",
            country: "",
            postal_code: 0,
          }),
          [field]: field === "postal_code" ? parseInt(value) || 0 : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /** Handle profile image change */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /** Handle submit */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and Email are required.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);

    // contact
    if (formData.contact?.mobile) {
      data.append("contact[mobile]", formData.contact.mobile);
    }

    // billing address
    const ba = formData.billing_address;
    if (ba) {
      data.append("billing_address[street]", ba.street);
      data.append("billing_address[city]", ba.city);
      data.append("billing_address[province]", ba.province);
      data.append("billing_address[region]", ba.region);
      data.append("billing_address[barangay]", ba.barangay);
      data.append("billing_address[country]", ba.country);
      data.append("billing_address[postal_code]", ba.postal_code.toString());
    }

    // profile image
    if (profileImage) {
      data.append("profile_image", profileImage);
    }

    onSave(data);
    onClose();
  };

  /** UI classes */
  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[44px]";
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

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={preview}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <label className="mt-3 text-sm text-orange-600 cursor-pointer">
            Change Photo
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
              placeholder="Enter Name"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
              placeholder="example@domain.com"
              className={inputClass}
            />
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="contact.mobile" className={labelClass}>
              Mobile
            </label>
            <input
              id="contact.mobile"
              name="contact.mobile"
              type="tel"
              value={formData.contact?.mobile || ""}
              onChange={handleChange}
              placeholder="e.g. +1 555 123 4567"
              className={inputClass}
            />
          </div>

          {/* Street */}
          <div>
            <label htmlFor="billing_address.street" className={labelClass}>
              Street Address
            </label>
            <input
              id="billing_address.street"
              name="billing_address.street"
              value={formData.billing_address?.street || ""}
              onChange={handleChange}
              placeholder="Enter street address"
              className={inputClass}
            />
          </div>

          {/* Barangay + City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="billing_address.barangay" className={labelClass}>
                Barangay
              </label>
              <input
                id="billing_address.barangay"
                name="billing_address.barangay"
                value={formData.billing_address?.barangay || ""}
                onChange={handleChange}
                placeholder="Barangay"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="billing_address.city" className={labelClass}>
                City
              </label>
              <input
                id="billing_address.city"
                name="billing_address.city"
                value={formData.billing_address?.city || ""}
                onChange={handleChange}
                placeholder="City"
                className={inputClass}
              />
            </div>
          </div>

          {/* Province + Region */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="billing_address.province" className={labelClass}>
                Province
              </label>
              <input
                id="billing_address.province"
                name="billing_address.province"
                value={formData.billing_address?.province || ""}
                onChange={handleChange}
                placeholder="Province"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="billing_address.region" className={labelClass}>
                Region
              </label>
              <input
                id="billing_address.region"
                name="billing_address.region"
                value={formData.billing_address?.region || ""}
                onChange={handleChange}
                placeholder="Region"
                className={inputClass}
              />
            </div>
          </div>

          {/* Country + Postal Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="billing_address.country" className={labelClass}>
                Country
              </label>
              <input
                id="billing_address.country"
                name="billing_address.country"
                value={formData.billing_address?.country || ""}
                onChange={handleChange}
                placeholder="Country"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="billing_address.postal_code" className={labelClass}>
                Postal Code
              </label>
              <input
                id="billing_address.postal_code"
                name="billing_address.postal_code"
                type="number"
                value={formData.billing_address?.postal_code || ""}
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

          {/* Footer */}
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
