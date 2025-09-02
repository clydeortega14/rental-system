
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import Swal from 'sweetalert2';
import { router } from "@inertiajs/react";
import UploadCard from "./UploadCard";

interface LessorsignUserupFormProps {
  signUser: {
    user: {
      id: number;
      name: string;
      email: string;
      fullname?: string;
      middle_name?: string;
      last_name?: string;
      business_name?: string;
      phone?: string;
      contact?: {
        mobile?: string;
      };
      company?: {
        uuid: string;
        name: string;
        tin: string;
        business_type?: string;
        business_reg_number?: string;
        business_address?: string;
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        postal_code?: string;
        region?: string;
        province?: string;
        barangay?: string;
      };
    };
  };
}
export default function LessorsignUserupForm({ signUser }: LessorsignUserupFormProps) {

  const [step, setStep] = useState(1);

  const { data, setData, post, processing, errors } = useForm({
    fullname: signUser.user.name,
    business_name: signUser.user.company?.name,
    email: signUser.user.email,
    phone: signUser.user.contact?.mobile,
    type: signUser.user.company?.business_type,
    business_reg_number: signUser.user.company?.business_reg_number,
    business_address: signUser.user.company?.business_address,
    street: signUser.user.company?.street,
    region: signUser.user.company?.region,
    province: signUser.user.company?.province,
    city: signUser.user.company?.city,
    country: signUser.user.company?.country,
    postal_code: signUser.user.company?.postal_code,
    tin: signUser.user.company?.tin,
    barangay: signUser.user.company?.barangay,
    business_documents: [] as { file: File; type: string }[],
  });

  // Address dependencies
  const [regionList, setRegionList] = useState<any[]>([]);
  const [provList, setProvList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [brgyList, setBrgyList] = useState<any[]>([]);

  const [permitFile, setPermitFile] = useState<File | null>(null);
  const [secFile, setSecFile] = useState<File | null>(null);
  const [birFile, setBirFile] = useState<File | null>(null);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const permitRef = useRef<HTMLInputElement>(null);
  const secRef = useRef<HTMLInputElement>(null);
  const birRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, Record<string, File | null>>>({});
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});


  type DocumentRequirement = {
    label: string;
    required: boolean;
  };


  type Region = {
    region_code: string;
    region_name: string;
  };

  type Province = {
    province_code: string;
    province_name: string;
  };

  type City = {
    city_code: string;
    city_name: string;
  };

  type Barangay = {
    brgy_code: string;
    brgy_name: string;
  };

  type BusinessField =
    | "type"
    | "business_reg_number"
    | "province"
    | "fullname"
    | "business_name"
    | "email"
    | "phone"
    | "business_address"
    | "street"
    | "region"
    | "city"
    | "country"
    | "postal_code"
    | "tin"
    | "barangay";


  const businessRequirements: Record<string, DocumentRequirement[]> = {
    "Sole Proprietorship": [
      { label: "Business Permit", required: true },
      { label: "DTI Registration", required: true },
    ],
    "Property Manager": [
      { label: "Business Permit", required: true },
      { label: "SEC Registration", required: true },
    ],
    "Agency": [
      { label: "Business Permit", required: true },
      { label: "SEC Registration", required: true },
    ],
    "Equipment Owner": [
      { label: "Government-issued ID", required: true },
    ],
    "Individual": [
      { label: "Government-issued ID", required: true },
    ],
  };
  const handleDynamicFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    docLabel: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          title: "File Too Large",
          text: `${docLabel} must be less than 2MB.`,
          icon: "error",
          confirmButtonText: "OK",
        });
        e.target.value = "";
        return;
      }

      setUploadedFiles((prev) => ({
        ...prev,
        [data.type || ""]: {
          ...(prev[data.type || ""] || {}),
          [docLabel]: file,
        },
      }));
    }
  };

  const fields: { key: BusinessField; label: string; type?: string; pattern?: string; maxLength?: number }[] = [
    { key: "fullname", label: "Name", pattern: "^[a-zA-Z0-9 ]*$", },
    { key: "business_name", label: "Business Name", pattern: "^[a-zA-Z0-9 ]*$" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone Number", pattern: "^[0-9]{11}$", maxLength: 11 },
  ];

  const fieldsData: { key: BusinessField; label: string; pattern?: string; maxLength?: number }[] = [
    { key: "business_reg_number", label: "Business Registration Number", pattern: "^[a-zA-Z0-9 ]*$" },
    { key: "business_address", label: "Business Address", pattern: "^[a-zA-Z0-9 ]*$" },
    { key: "street", label: "Street", pattern: "^[a-zA-Z0-9 ]*$" },
    { key: "postal_code", label: "Postal Code", pattern: "^[0-9]{4}$", maxLength: 4 }, // ✅ exactly 4 digits
    { key: "tin", label: "TIN (Tax ID)", pattern: "^[a-zA-Z0-9]*$" },
  ];

  useEffect(() => {
    // Initial region list
    regions().then((regions: Region[]) => {
      setRegionList(regions);

      const userRegion = signUser.user.company?.region;
      const regionObj = regions.find(r => r.region_name === userRegion);
      if (regionObj) {
        const regionCode = regionObj.region_code;
        setSelectedRegion(regionCode);
        setData("region", regionObj.region_name);

        provinces(regionCode).then((prov: Province[]) => {
          setProvList(prov);

          const userProvince = signUser.user.company?.province;
          const provObj = prov.find(p => p.province_name === userProvince);
          if (provObj) {
            const provCode = provObj.province_code;
            setSelectedProvince(provCode);
            setData("province", provObj.province_name);

            cities(provCode).then((cityList: City[]) => {
              setCityList(cityList);

              const userCity = signUser.user.company?.city;
              const cityObj = cityList.find(c => c.city_name === userCity);
              if (cityObj) {
                const cityCode = cityObj.city_code;
                setSelectedCity(cityCode);
                setData("city", cityObj.city_name);

                barangays(cityCode).then((brgyList: Barangay[]) => {
                  setBrgyList(brgyList);
                });
              }
            });
          }
        });
      }
    });
  }, []);
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionCode = e.target.value;
    setSelectedRegion(regionCode);
    setProvList([]);
    setCityList([]);
    setBrgyList([]);
    setData("region", ""); // reset
    setData("province", "");
    setData("city", "");
    setData("barangay", "");

    // Fetch provinces
    provinces(regionCode).then((prov: Province[]) => {
      setProvList(prov);

      const selectedRegionObj = regionList.find(r => r.region_code === regionCode);
      setData("region", selectedRegionObj?.region_name || "");
    });
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setCityList([]);
    setBrgyList([]);
    setData("province", "");
    setData("city", "");
    setData("barangay", "");

    cities(provinceCode).then((cityList: City[]) => {
      setCityList(cityList);

      // Set province name and state
      const selectedProv = provList.find(p => p.province_code === provinceCode);
      const name = selectedProv?.province_name || "";
      setData("province", name);
    });
  };


  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityCode = e.target.value;
    setSelectedCity(cityCode);
    setBrgyList([]);
    setData("city", "");
    setData("barangay", "");

    barangays(cityCode).then((brgys: { brgy_code: string; brgy_name: string }[]) => {
      setBrgyList(brgys);

      const selectedCity = cityList.find(c => c.city_code === cityCode);
      setData("city", selectedCity?.city_name || "");
    });
  };

  const handleBarangayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData("barangay", e.target.value);
  };

  const validateStep1 = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};

    fields.forEach(({ key, label }) => {
      const value = data[key] || "";

      if (!value.trim()) {
        newErrors[key] = `${label} is required.`;
        valid = false;
      } else if (key === "phone" && !/^[0-9]{11}$/.test(value)) {
        newErrors[key] = "Phone number must be exactly 11 digits.";
        valid = false;
      } else if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[key] = "Invalid email address.";
        valid = false;
      } else if (key !== "email" && key !== "phone" && !/^[a-zA-Z0-9 ]*$/.test(value)) {
        newErrors[key] = `${label} can only contain letters and numbers.`;
        valid = false;
      }
    });

    setLocalErrors(newErrors);

    if (!valid) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fix the highlighted errors before continuing.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    return valid;
  };


  const handleNext = () => {
    if (validateStep1()) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors: Record<string, string> = {};

    // ✅ Step 1: Validate all required fields in fieldsData
    for (const field of fieldsData) {
      const value = data[field.key];

      if (!value || value.toString().trim() === "") {
        newErrors[field.key] = `${field.label} is required.`;
        valid = false;
      } else if (field.pattern && !(new RegExp(field.pattern).test(value.toString()))) {
        newErrors[field.key] = `${field.label} has an invalid format.`;
        valid = false;
      } else if (field.maxLength && value.toString().length > field.maxLength) {
        newErrors[field.key] = `${field.label} must not exceed ${field.maxLength} characters.`;
        valid = false;
      }
    }

    // ✅ Step 2: Validate required dropdowns
    if (!data.type) {
      newErrors["type"] = "Please select a Business Type.";
      valid = false;
    }
    if (!data.region) {
      newErrors["region"] = "Please select a Region.";
      valid = false;
    }
    if (!data.province) {
      newErrors["province"] = "Please select a Province.";
      valid = false;
    }
    if (!data.city) {
      newErrors["city"] = "Please select a City/Municipality.";
      valid = false;
    }
    if (!data.barangay) {
      newErrors["barangay"] = "Please select a Barangay.";
      valid = false;
    }
    if (!data.country) {
      newErrors["country"] = "Please input Country name.";
      valid = false;
    }

    setLocalErrors(newErrors);

    if (!valid) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fix the highlighted errors before continuing.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // ✅ Step 3: Validate required documents
    const requirements = businessRequirements[data.type || ""] || [];
    const typeFiles = uploadedFiles[data.type || ""] || {};

    for (const req of requirements) {
      if (req.required && !typeFiles[req.label]) {
        Swal.fire({
          title: "Missing File",
          text: `Please upload ${req.label}.`,
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    Object.entries(typeFiles).forEach(([label, file]) => {
      if (file) {
        formData.append("business_documents[]", file);
        formData.append("document_names[]", label);
      }
    });

    // ✅ Step 4: Submit with Inertia
    router.post("/lessor/signUserup", formData, {
      forceFormData: true,
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Lessor registration saved successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/lessee";
        });
      },
      onError: () => {
        Swal.fire({
          title: "Oops!",
          text: "There was a problem submitting the form.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };


  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    label: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          title: "File Too Large",
          text: `${label} must be less than 2MB.`,
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      setFile(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-8xl mx-auto">
      {step === 1 && (
        <div>
          <h3 className="text-2xl font-bold mb-6 text-orange-600">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ key, label, type, pattern, maxLength }) => (
              <div key={key}>
                <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type || "text"}
                  value={data[key] || ""}
                  onChange={(e) => {
                    let value = e.target.value;

                    // ✅ Input restrictions
                    if (key === "phone") {
                      value = value.replace(/[^0-9]/g, "").slice(0, 11);
                    } else if (key === "email") {
                      // leave raw for email
                    } else {
                      value = value.replace(/[^a-zA-Z0-9 ]/g, "");
                    }

                    setData(key, value);
                  }}
                  maxLength={maxLength}
                  pattern={pattern}
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none ${localErrors[key] ? "border-red-500" : "border-gray-300"
                    }`}
                  required
                />
                {(localErrors[key] || errors[key]) && (
                  <p className="text-sm text-red-500 mt-1">
                    {localErrors[key] || errors[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <button
              type="button"
              onClick={handleNext}
              className="bg-orange-600 text-white font-semibold px-6 py-2 rounded hover:bg-orange-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-2xl font-bold mb-6 text-orange-600">Business Profile</h3>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Business Type
            </label>
            <div className="flex flex-wrap gap-4">
              {["Individual", "Sole Proprietorship", "Agency", "Property Manager", "Equipment Owner"].map(
                (type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="radio"
                      value={type}
                      checked={data.type === type}
                      onChange={(e) => setData("type", e.target.value)}
                      className="accent-orange-600"
                    />
                    {type}
                  </label>
                )
              )}
            </div>
            {localErrors["type"] && <p className="text-sm text-red-500 mt-1">{localErrors["type"]}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Registration and Address */}
            {fieldsData.map(({ key, label, pattern, maxLength }) => (
              <div key={key}>
                <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                <input
                  type="text"
                  value={data[key] || ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (key === "postal_code") {
                      value = value.replace(/[^0-9]/g, "").slice(0, 4);
                    }
                    setData(key, value);

                    // ✅ Clear error if field now has a valid value
                    setLocalErrors((prev) => {
                      const newErrors = { ...prev };
                      if (value.trim()) {
                        delete newErrors[key]; // remove error for this field
                      }
                      return newErrors;
                    });
                  }}
                  maxLength={maxLength}
                  pattern={pattern}
                  className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none ${localErrors[key] ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {localErrors[key] && <p className="text-sm text-red-500 mt-1">{localErrors[key]}</p>}

              </div>
            ))}


            {/* Region */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Region</label>
              <select
                value={selectedRegion}
                onChange={handleRegionChange}
                className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none ${errors.region ? "border-red-500" : "border-gray-300"
                  }`}
              >
                <option value="">Select Region</option>
                {regionList.map((r) => (
                  <option key={r.region_code} value={r.region_code}>
                    {r.region_name}
                  </option>
                ))}
              </select>
              {localErrors["region"] && <p className="text-sm text-red-500 mt-1">{localErrors["region"]}</p>}
            </div>

            {/* Province */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Province</label>
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none ${errors.province ? "border-red-500" : "border-gray-300"
                  }`}
              >
                <option value="">Select Province</option>
                {provList.map((p) => (
                  <option key={p.province_code} value={p.province_code}>
                    {p.province_name}
                  </option>
                ))}
              </select>
              {localErrors["province"] && <p className="text-sm text-red-500 mt-1">{localErrors["province"]}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">City/Municipality</label>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none ${errors.city ? "border-red-500" : "border-gray-300"
                  }`}
              >
                <option value="">Select City</option>
                {cityList.map((c) => (
                  <option key={c.city_code} value={c.city_code}>

                    {c.city_name}
                  </option>
                ))}
              </select>
              {localErrors["city"] && <p className="text-sm text-red-500 mt-1">{localErrors["city"]}</p>}
            </div>

            {/* Barangay */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Barangay</label>
              <select
                value={data.barangay}
                onChange={handleBarangayChange}
                className={`w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none ${errors.barangay ? "border-red-500" : "border-gray-300"
                  }`}
              >
                <option value="">Select Barangay</option>
                {brgyList.map((b) => (
                  <option key={b.brgy_code} value={b.brgy_name}>
                    {b.brgy_name}
                  </option>
                ))}
              </select>
              {localErrors["barangay"] && <p className="text-sm text-red-500 mt-1">{localErrors["barangay"]}</p>}
            </div>

            {/* Country */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                value={data.country}
                onChange={(e) => setData("country", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {localErrors["country"] && <p className="text-sm text-red-500 mt-1">{localErrors["country"]}</p>}

            </div>
          </div>

          {/* ✅ Only show this if a type is selected */}
          {data.type && (
            <div className="mt-6">
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Upload Business Documents{" "}
                {data.type && (
                  <span className="text-gray-500 font-normal">
                    ({data.type})
                  </span>
                )}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {businessRequirements[data.type]?.map((doc) => (
                  <div key={doc.label}>
                    <input
                      type="file"
                      id={doc.label}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleDynamicFileUpload(e, doc.label)}
                    />
                    <UploadCard
                      title={`${doc.label} *`}
                      file={uploadedFiles[data.type || ""]?.[doc.label] || null}
                      onClick={() => document.getElementById(doc.label)?.click()}
                      onRemove={() =>
                        setUploadedFiles((prev) => ({
                          ...prev,
                          [data.type || ""]: {
                            ...(prev[data.type || ""] || {}),
                            [doc.label]: null,
                          },
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={processing}
              className={`${processing ? "bg-orange-300 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
                } text-white font-semibold px-6 py-2 rounded transition`}
            >
              {processing ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )
      }
    </form >
  );
}
