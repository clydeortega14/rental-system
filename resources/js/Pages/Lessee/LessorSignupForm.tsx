import { useEffect, useState,useRef  } from "react";
import { useForm } from "@inertiajs/react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import Swal from 'sweetalert2';
import { router } from "@inertiajs/react";

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
    fullname: signUser.user.name || "N/A",
    business_name: signUser.user.company?.name || "N/A",
    email: signUser.user.email || "N/A",
    phone: signUser.user.contact?.mobile || "N/A",
    type: signUser.user.company?.business_type,
    business_reg_number: signUser.user.company?.business_reg_number,
    business_address: signUser.user.company?.business_address || "N/A",
    street: signUser.user.company?.street || "N/A",
    region: signUser.user.company?.region || "N/A",
    province: signUser.user.company?.province,
    city: signUser.user.company?.city || "",
    country: signUser.user.company?.country || "Philippines",
    postal_code: signUser.user.company?.postal_code || "N/A",
    tin: signUser.user.company?.tin || "N/A",
    barangay: signUser.user.company?.barangay || "",
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

  const fields: { key: BusinessField; label: string; type?: string }[] = [
    { key: "fullname", label: "Name" },
    { key: "business_name", label: "Business Name" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone Number" },
  ];

  const fieldsData: { key: BusinessField; label: string }[] = [
  { key: "business_reg_number", label: "Business Registration Number" },
  { key: "business_address", label: "Business Address" },
  { key: "street", label: "Street" },
  { key: "postal_code", label: "Postal Code" },
  { key: "tin", label: "TIN (Tax ID)" },
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

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all form fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    // Validate required files before appending
    if (!permitFile || !secFile || !birFile) {
      Swal.fire({
        title: "Missing Files",
        text: "Please upload all required business documents.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    formData.append("business_documents[]", permitFile);
    formData.append("document_names[]", "Business Permit");

    formData.append("business_documents[]", secFile);
    formData.append("document_names[]", "SEC Certificate");

    formData.append("business_documents[]", birFile);
    formData.append("document_names[]", "BIR Form 2303");

    // Submit using Inertia router (not useForm) because we’re using FormData
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

  const UploadCard = ({
    title,
    file,
    onClick,
    onRemove,
  }: {
    title: string;
    file: File | null;
    onClick: () => void;
    onRemove: () => void;
  }) => {
    const isImage = file?.type.startsWith("image/");
    const previewUrl = file && isImage ? URL.createObjectURL(file) : null;

    return (
      <div
        onClick={onClick}
        className="relative cursor-pointer h-40 border-2 border-dashed border-orange-400 flex flex-col items-center justify-center rounded-lg hover:bg-orange-50 transition overflow-hidden"
      >
        {file ? (
          <>
            {/* Preview */}
            {isImage ? (
              <img
                src={previewUrl!}
                alt={title}
                className="absolute inset-0 object-cover w-full h-full"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            )}

            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 flex justify-between items-center">
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="ml-2 text-red-300 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="mt-2 text-sm text-orange-600 font-semibold text-center">{title}</span>
          </>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-8xl mx-auto">
      {step === 1 && (
        <div>
          <h3 className="text-2xl font-bold mb-6 text-orange-600">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ key, label, type }) => (
              <div key={key}>
                <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type || "text"}
                  value={data[key] || ""}
                  onChange={(e) => setData(key, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                {errors[key] && <p className="text-sm text-red-500 mt-1">{errors[key]}</p>}
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
            <label className="block mb-2 text-sm font-medium text-gray-700">Business Type</label>
            <div className="flex flex-wrap gap-4">
              {["Individual", "Company", "Agency", "Property Manager", "Equipment Owner"].map((type) => (
                <label key={type} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    value={type}
                    checked={data.type === type}
                    onChange={(e) => setData("type", e.target.value)}
                    className="accent-orange-600"
                  />
                  {type}
                </label>
              ))}
            </div>
            {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Registration and Address */}
            {fieldsData.map(({ key, label }) => (
              <div key={key}>
                <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                <input
                  type="text"
                  value={data[key] || ""}
                  onChange={(e) => setData(key, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                {errors[key] && <p className="text-sm text-red-500 mt-1">{errors[key]}</p>}
              </div>
            ))}


            {/* Region */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Region</label>
              <select
                value={selectedRegion}
                onChange={handleRegionChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
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
              <label className="block mb-1 text-sm font-medium text-gray-700">Province</label>
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Province</option>
                {provList.map((p) => (
                  <option key={p.province_code} value={p.province_code}>
                    {p.province_name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">City/Municipality</label>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
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
              <label className="block mb-1 text-sm font-medium text-gray-700">Barangay</label>
              <select
                value={data.barangay}
                onChange={handleBarangayChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Barangay</option>
                {brgyList.map((b) => (
                  <option key={b.brgy_code} value={b.brgy_name}>
                    {b.brgy_name}
                  </option>
                ))}
              </select>
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
              {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country}</p>}
            </div>
          </div>

          {/* Upload Card + Previews */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Upload Business Documents <span className="text-red-400">(Required: Business Permit, SEC Certificate, BIR Form 2303)</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* File inputs (hidden) */}
              <input ref={permitRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, setPermitFile, "Business Permit")} />
              <input ref={secRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, setSecFile, "SEC Certificate")} />
              <input ref={birRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, setBirFile, "BIR Form 2303")} />

              {/* Upload cards */}
              <UploadCard
                title="Business Permit"
                file={permitFile}
                onClick={() => permitRef.current?.click()}
                onRemove={() => setPermitFile(null)}
              />
              <UploadCard
                title="SEC Certificate"
                file={secFile}
                onClick={() => secRef.current?.click()}
                onRemove={() => setSecFile(null)}
              />
              <UploadCard
                title="BIR Form 2303"
                file={birFile}
                onClick={() => birRef.current?.click()}
                onRemove={() => setBirFile(null)}
              />
            </div>
          </div>

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
              className={`${
                processing ? "bg-orange-300 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"
              } text-white font-semibold px-6 py-2 rounded transition`}
            >
              {processing ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
