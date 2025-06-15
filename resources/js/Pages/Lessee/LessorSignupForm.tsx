import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import Swal from 'sweetalert2';

interface LessorsignUserupFormProps {
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
      tin: string;
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
}

export default function LessorsignUserupForm({ signUser }: LessorsignUserupFormProps) {

  const [step, setStep] = useState(1);

  const { data, setData, post, processing, errors } = useForm({
    fullname: signUser.user.name || "N/A",
    business_name: signUser.user.company.name || "N/A",
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
  });

  // Address dependencies
  const [regionList, setRegionList] = useState<any[]>([]);
  const [provList, setProvList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [brgyList, setBrgyList] = useState<any[]>([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
  // Initial region list
  regions().then((regions) => {
    setRegionList(regions);

    // Set preselected region if exists
    const userRegion = signUser.user.company?.region;
    const regionObj = regions.find(r => r.region_name === userRegion);
    if (regionObj) {
      const regionCode = regionObj.region_code;
      setSelectedRegion(regionCode);
      setData("region", regionObj.region_name);

      // Load provinces for the region
      provinces(regionCode).then((prov) => {
        setProvList(prov);

        const userProvince = signUser.user.company?.province;
        const provObj = prov.find(p => p.province_name === userProvince);
        if (provObj) {
          const provCode = provObj.province_code;
          setSelectedProvince(provCode);
          setData("province", provObj.province_name);

          // Load cities
          cities(provCode).then((cityList) => {
            setCityList(cityList);

            const userCity = signUser.user.company?.city;
            const cityObj = cityList.find(c => c.city_name === userCity);
            if (cityObj) {
              const cityCode = cityObj.city_code;
              setSelectedCity(cityCode);
              setData("city", cityObj.city_name);

              // Load barangays
              barangays(cityCode).then((brgyList) => {
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
    provinces(regionCode).then((prov) => {
      setProvList(prov);

      // Set region name to form data
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

    cities(provinceCode).then((cityList) => {
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

    barangays(cityCode).then((brgys) => {
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

    post("/lessor/signUserup", {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Lessor registration saved successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/lessee"; // Redirect after user clicks OK
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-8xl mx-auto">
      {step === 1 && (
        <div>
          <h3 className="text-2xl font-bold mb-6 text-orange-600">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: "fullname", label: "Name" },
              { key: "business_name", label: "Business Name" },
              { key: "email", label: "Email", type: "email" },
              { key: "phone", label: "Phone Number" },
            ].map(({ key, label, type }) => (
              <div key={key}>
                <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type || "text"}
                  value={data[key as keyof typeof data]}
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
            {[
              { key: "business_reg_number", label: "Business Registration Number" },
              { key: "business_address", label: "Business Address" },
              { key: "street", label: "Street" },
              { key: "postal_code", label: "Postal Code" },
              { key: "tin", label: "TIN (Tax ID)" },
            
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                <input
                  type="text"
                  value={data[key as keyof typeof data]}
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
