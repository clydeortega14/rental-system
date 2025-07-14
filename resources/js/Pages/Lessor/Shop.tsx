import React, { useState,useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
// import { route } from "ziggy-js";
import LessorLayout from "@/Layouts/LessorLayout";
import Modal from "@/Components/Modal"; // Make sure this path is correct
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import Swal from "sweetalert2";
import { Link } from "@inertiajs/react";

interface Shop {
  id: number;
  name: string;
  description?: string;
  location?: string;
  created_at?: string;
}

interface ShopProps {
  shops: {
    data: Shop[];
    current_page: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
}
function Shop({ shops = [] }: ShopProps) {
  const [editingShopId, setEditingShopId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false); // ✅ modal toggle
 
  const { data, setData, post, put, reset, processing, errors } = useForm({
    name: "",
    description: "",
    location: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
  });
  const { props } = usePage();
  const flash = props.flash as { success?: string };

   // Address dependencies
  const [regionList, setRegionList] = useState<any[]>([]);
  const [provList, setProvList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [brgyList, setBrgyList] = useState<any[]>([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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

  useEffect(() => {
    // Initial region list
    regions().then((regions: Region[]) => {
    setRegionList(regions);
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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Now submit
    if (editingShopId) {
      put(route("lessor.shop.update", { shop: editingShopId }), {
        onSuccess: () => {
          setEditingShopId(null);
          reset();
          setShowModal(false);
        },
      });
    } else {
      post(route("lessor.shop.store"), {
        onSuccess: () => {
          reset();
          setShowModal(false);
        },
      });
    }
  };

  const handleEdit = (shop: Shop) => {
    setEditingShopId(shop.id);
    setData({
      name: shop.name || "",
      description: shop.description || "",
      location: shop.location || "",
    });
    setShowModal(true);
  };

  const cancelEdit = () => {
    setEditingShopId(null);
    reset();
    setShowModal(false);
  };



  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-orange-700">Shops</h2>

      {flash?.success && (
        <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded mb-4">
          {flash.success}
        </div>
      )}

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add Shop Card */}
        <div
          onClick={() => {
            reset(); // reset form before opening
            setEditingShopId(null);
            setShowModal(true);
          }}
          className="cursor-pointer border-2 border-dashed border-orange-400 hover:border-orange-600 flex items-center justify-center rounded-lg h-40 text-orange-600 hover:text-orange-800 transition-all"
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl">＋</span>
            <span className="mt-2 font-medium">Add Shop</span>
          </div>
        </div>

        {/* Existing Shop Cards */}
        {shops.data.map((shop) => (
          <div
            key={shop.id}
            className="bg-white shadow-md rounded-lg p-6 space-y-2 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold text-orange-600">{shop.name}</h4>
              <button
                onClick={() => handleEdit(shop)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">
              {shop.description || "No description provided."}
            </p>
            <p className="text-gray-500 text-sm">&#x1F4CD; {shop.location || "No location"}</p>
            <p className="text-gray-400 text-xs">
              Created:{" "}
              {shop.created_at
                ? new Date(shop.created_at).toLocaleDateString()
                : "—"}
            </p>
          </div>
        ))}
      </div>
      {/* Pagination Centered Below */}
      {shops.links.length > 3 && (
        <div className="mt-6 flex justify-center">
          <div className="flex gap-2">
            {shops.links.map((link, index) =>
              link.url ? (
                <Link
                  key={index}
                  href={link.url ? `/lessee${new URL(link.url).search}` : '#'}
                  preserveScroll
                  preserveState
                  replace // ✅ Don't change the URL
                  className={`px-4 py-2 rounded text-sm transition-colors ${
                    link.active
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-orange-400"
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ) : (
                <span
                  key={index}
                  className="px-4 py-2 rounded text-sm bg-gray-100 text-gray-400"
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              )
            )}
          </div>
        </div>
      )}

      {/* Modal Form */}
      <Modal show={showModal} onClose={cancelEdit}>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <h2 className="text-xl font-semibold text-orange-700">
            {editingShopId ? "Edit Shop" : "Create Shop"}
          </h2>

          <div>
            <label className="block font-medium text-gray-700">Shop Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* <div>
            <label className="block font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => setData("location", e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div> */}

          {/* Location Selects */}
          <div className="grid grid-cols-2 gap-4">
            {/* Region */}
            <div>
              <label className="block font-medium text-gray-700">Region</label>
              <select
                value={selectedRegion}
                onChange={handleRegionChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Region</option>
                {regionList.map((region) => (
                  <option key={region.region_code} value={region.region_code}>
                    {region.region_name}
                  </option>
                ))}
              </select>
              {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
            </div>

            {/* Province */}
            <div>
              <label className="block font-medium text-gray-700">Province</label>
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="w-full p-2 border rounded"
                required
                disabled={!provList.length}
              >
                <option value="">Select Province</option>
                {provList.map((prov) => (
                  <option key={prov.province_code} value={prov.province_code}>
                    {prov.province_name}
                  </option>
                ))}
              </select>
              {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block font-medium text-gray-700">City</label>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full p-2 border rounded"
                required
                disabled={!cityList.length}
              >
                <option value="">Select City</option>
                {cityList.map((city) => (
                  <option key={city.city_code} value={city.city_code}>
                    {city.city_name}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            {/* Barangay */}
            <div>
              <label className="block font-medium text-gray-700">Barangay</label>
              <select
                onChange={handleBarangayChange}
                className="w-full p-2 border rounded"
                required
                disabled={!brgyList.length}
                value={data.barangay || ""}
              >
                <option value="">Select Barangay</option>
                {brgyList.map((brgy) => (
                  <option key={brgy.brgy_code} value={brgy.brgy_name}>
                    {brgy.brgy_name}
                  </option>
                ))}
              </select>
              {errors.barangay && <p className="text-red-500 text-sm mt-1">{errors.barangay}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700"
              disabled={processing}
            >
              {processing ? "Saving..." : editingShopId ? "Update Shop" : "Save Shop"}
            </button>

            <button
              type="button"
              onClick={cancelEdit}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

Shop.layout = (page) => <LessorLayout>{page}</LessorLayout>;

export default Shop;
