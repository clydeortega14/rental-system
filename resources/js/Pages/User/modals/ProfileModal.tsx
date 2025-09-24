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
import { regions, provinces, cities, barangays } from "select-philippines-address";

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
    postal_code: undefined,
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

  /** Dropdown lists */
  const [regionList, setRegionList] = useState<any[]>([]);
  const [provinceList, setProvinceList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [barangayList, setBarangayList] = useState<any[]>([]);

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

      regions().then((res: any) => setRegionList(res));
    }
  }, [isOpen, user]);

  /** Preload dependent dropdowns */
  useEffect(() => {
    if (formData.billing_address?.region && regionList.length) {
      const regionCode = regionList.find(
        (r) => r.region_name === formData.billing_address?.region
      )?.region_code;
      if (regionCode) provinces(regionCode).then((res: any) => setProvinceList(res));
    }
  }, [formData.billing_address?.region, regionList]);

  useEffect(() => {
    if (formData.billing_address?.province && provinceList.length) {
      const provinceCode = provinceList.find(
        (p) => p.province_name === formData.billing_address?.province
      )?.province_code;
      if (provinceCode) cities(provinceCode).then((res: any) => setCityList(res));
    }
  }, [formData.billing_address?.province, provinceList]);

  useEffect(() => {
    if (formData.billing_address?.city && cityList.length) {
      const cityCode = cityList.find(
        (c) => c.city_name === formData.billing_address?.city
      )?.city_code;
      if (cityCode) barangays(cityCode).then((res: any) => setBarangayList(res));
    }
  }, [formData.billing_address?.city, cityList]);

  /** Handle input changes */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);

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
          ...prev.billing_address,
          [field]:
            field === "postal_code" ? (value ? parseInt(value) : undefined) : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /** Dropdown change handlers */
  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const regionName =
      regionList.find((r) => r.region_code === code)?.region_name || "";

    setFormData((prev) => ({
      ...prev,
      billing_address: {
        ...prev.billing_address,
        region: regionName,
        province: "",
        city: "",
        barangay: "",
      },
    }));

    provinces(code).then((res: any) => setProvinceList(res));
    setCityList([]);
    setBarangayList([]);
  };

  const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const provinceName =
      provinceList.find((p) => p.province_code === code)?.province_name || "";

    setFormData((prev) => ({
      ...prev,
      billing_address: { ...prev.billing_address, province: provinceName, city: "", barangay: "" },
    }));

    cities(code).then((res: any) => setCityList(res));
    setBarangayList([]);
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const cityName = cityList.find((c) => c.city_code === code)?.city_name || "";

    setFormData((prev) => ({
      ...prev,
      billing_address: { ...prev.billing_address, city: cityName, barangay: "" },
    }));

    barangays(code).then((res: any) => setBarangayList(res));
  };

  const handleBarangayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const barangayName = e.target.value;
    setFormData((prev) => ({
      ...prev,
      billing_address: { ...prev.billing_address, barangay: barangayName },
    }));
  };

  /** Handle profile image change */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /** Utility to append nested data */
  const appendNested = (data: FormData, prefix: string, obj: Record<string, any>) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        data.append(`${prefix}[${key}]`, String(value));
      }
    });
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

    if (formData.contact) appendNested(data, "contact", formData.contact);
    if (formData.billing_address)
      appendNested(data, "billing_address", formData.billing_address);

    if (profileImage) {
      // Use "avatar" if that's what backend expects
      data.append("avatar", profileImage);
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
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                setFormData((prev) => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    mobile: onlyDigits, // keep as string
                  },
                }));
              }}
              placeholder="e.g. 09123456789"
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

          {/* Region */}
          <div>
            <label className={labelClass}>Region</label>
            <select
              className={inputClass}
              value={
                regionList.find((r) => r.region_name === formData.billing_address?.region)
                  ?.region_code || ""
              }
              onChange={handleRegionChange}
            >
              <option value="">Select Region</option>
              {regionList.map((r) => (
                <option key={r.region_code} value={r.region_code}>
                  {r.region_name}
                </option>
              ))}
            </select>
          </div>

          {/* Province */}
          <div>
            <label className={labelClass}>Province</label>
            <select
              className={inputClass}
              value={
                provinceList.find((p) => p.province_name === formData.billing_address?.province)
                  ?.province_code || ""
              }
              onChange={handleProvinceChange}
            >
              <option value="">Select Province</option>
              {provinceList.map((p) => (
                <option key={p.province_code} value={p.province_code}>
                  {p.province_name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className={labelClass}>City</label>
            <select
              className={inputClass}
              value={
                cityList.find((c) => c.city_name === formData.billing_address?.city)?.city_code || ""
              }
              onChange={handleCityChange}
            >
              <option value="">Select City</option>
              {cityList.map((c) => (
                <option key={c.city_code} value={c.city_code}>
                  {c.city_name}
                </option>
              ))}
            </select>
          </div>

          {/* Barangay */}
          <div>
            <label className={labelClass}>Barangay</label>
            <select
              className={inputClass}
              value={formData.billing_address?.barangay || ""}
              onChange={handleBarangayChange}
            >
              <option value="">Select Barangay</option>
              {barangayList.map((b) => (
                <option key={b.brgy_code} value={b.brgy_name}>
                  {b.brgy_name}
                </option>
              ))}
            </select>
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
