import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import LessorLayout from "@/Layouts/LessorLayout";
import Modal from "@/Components/Modal";
import { regions, provinces, cities, barangays } from "select-philippines-address";
import Swal from "sweetalert2";
import { BiSolidStore } from "react-icons/bi";

interface Shop {
  id: number;
  name: string;
  description?: string;
  region?: string;
  province?: string;
  city?: string;
  barangay?: string;
  created_at?: string;
  logo_url?: string;
}

interface ShopProps {
  shops: {
    data: Shop[];
    current_page: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
  };
}

function Shop({ shops = { data: [], current_page: 1, last_page: 1, links: [] } }: ShopProps) {
  const [editingShopId, setEditingShopId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data, setData, post, put, reset, processing, errors } = useForm({
    name: "",
    description: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
  });

  const { props } = usePage();
  const flash = props.flash as { success?: string };

  const [regionList, setRegionList] = useState<any[]>([]);
  const [provList, setProvList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [brgyList, setBrgyList] = useState<any[]>([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  type Region = { region_code: string; region_name: string };
  type Province = { province_code: string; province_name: string };
  type City = { city_code: string; city_name: string };
  type Barangay = { brgy_code: string; brgy_name: string };

  // Load regions
  useEffect(() => {
    regions().then((regions: Region[]) => setRegionList(regions));
  }, []);

  // Handlers
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedRegion(code);
    setSelectedProvince("");
    setSelectedCity("");
    setProvList([]);
    setCityList([]);
    setBrgyList([]);
    setData("region", "");
    setData("province", "");
    setData("city", "");
    setData("barangay", "");

    provinces(code).then((prov: Province[]) => {
      setProvList(prov);
      const sel = regionList.find(r => r.region_code === code);
      setData("region", sel?.region_name || "");
    });
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedProvince(code);
    setSelectedCity("");
    setCityList([]);
    setBrgyList([]);
    setData("province", "");
    setData("city", "");
    setData("barangay", "");

    cities(code).then((cityList: City[]) => {
      setCityList(cityList);
      const sel = provList.find(p => p.province_code === code);
      setData("province", sel?.province_name || "");
    });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedCity(code);
    setBrgyList([]);
    setData("city", "");
    setData("barangay", "");

    barangays(code).then((brgyList: Barangay[]) => {
      setBrgyList(brgyList);
      const sel = cityList.find(c => c.city_code === code);
      setData("city", sel?.city_name || "");
    });
  };

  const handleBarangayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData("barangay", e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toastOptions = { toast: true, position: "top-end" as const, showConfirmButton: false, timer: 2000, timerProgressBar: true };

    if (editingShopId) {
      put(route("lessor.shop.update", { shop: editingShopId }), {
        onSuccess: () => { Swal.fire({ ...toastOptions, icon: "success", title: "Shop updated successfully!" }); setEditingShopId(null); reset(); setShowModal(false); },
        onError: () => { Swal.fire({ ...toastOptions, icon: "error", title: "Update failed. Please check your form." }); },
      });
    } else {
      post(route("lessor.shop.store"), {
        onSuccess: () => { Swal.fire({ ...toastOptions, icon: "success", title: "Shop created successfully!" }); reset(); setShowModal(false); },
        onError: () => { Swal.fire({ ...toastOptions, icon: "error", title: "Creation failed. Please check your form." }); },
      });
    }
  };

  const handleEdit = (shop: Shop) => {
    setEditingShopId(shop.id);
    setData({
      name: shop.name || "",
      description: shop.description || "",
      region: shop.region || "",
      province: shop.province || "",
      city: shop.city || "",
      barangay: shop.barangay || "",
    });

    // Preselect cascading fields
    const regionObj = regionList.find(r => r.region_name === shop.region);
    if (!regionObj) return;
    setSelectedRegion(regionObj.region_code);

    provinces(regionObj.region_code).then((provs: Province[]) => {
      setProvList(provs);
      const provObj = provs.find(p => p.province_name === shop.province);
      if (!provObj) return;
      setSelectedProvince(provObj.province_code);

      cities(provObj.province_code).then((citiesData: City[]) => {
        setCityList(citiesData);
        const cityObj = citiesData.find(c => c.city_name === shop.city);
        if (!cityObj) return;
        setSelectedCity(cityObj.city_code);

        barangays(cityObj.city_code).then((brgys: Barangay[]) => {
          setBrgyList(brgys);
          setData("barangay", shop.barangay || "");
        });
      });
    });

    setShowModal(true);
  };

  const cancelEdit = () => { setEditingShopId(null); reset(); setShowModal(false); };

  return (
    <div className="max-w-8xl mx-auto p-6">
      <h1 className="flex items-center text-3xl font-bold mb-6 text-brandYellow"><BiSolidStore className="w-6 h-6 mr-2" />Shops</h1>

      {flash?.success && <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded mb-4">{flash.success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => { reset(); setEditingShopId(null); setShowModal(true); }}
          className="cursor-pointer border-2 border-dashed border-brandYellow hover:border-orange-600 flex items-center justify-center rounded-lg h-40 text-orange-600 hover:text-orange-800 transition-all"
        >
          <div className="flex flex-col items-center"><span className="text-4xl">＋</span><span className="mt-2 font-medium">Add Shop</span></div>
        </div>

        {(shops?.data || []).map(shop => (
          <div key={shop.id} className="bg-white shadow-md rounded-lg p-6 space-y-2 border border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {shop.logo_url ? <img src={shop.logo_url} alt={shop.name} className="w-10 h-10 rounded-full object-cover border border-orange-300" /> :
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-lg">{shop.name.charAt(0).toUpperCase()}</div>}
                <h4 className="text-xl font-bold text-orange-600">{shop.name}</h4>
              </div>
              <button onClick={() => handleEdit(shop)} className="text-sm text-blue-600 hover:underline">Edit</button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{shop.description || "No description provided."}</p>
            <p className="text-gray-500 text-sm">&#x1F4CD; {[shop.barangay, shop.city, shop.province, shop.region].filter(Boolean).join(", ") || "No location"}</p>
            <p className="text-gray-400 text-xs">Created: {shop.created_at ? new Date(shop.created_at).toLocaleDateString() : "—"}</p>
          </div>
        ))}
      </div>

      <Modal show={showModal} onClose={cancelEdit}>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <h2 className="text-xl font-semibold text-orange-700">{editingShopId ? "Edit Shop" : "Create Shop"}</h2>

          <div>
            <label className="block font-medium text-gray-700">Shop Name</label>
            <input type="text" value={data.name} onChange={e => setData("name", e.target.value)} className="w-full p-2 border rounded" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <textarea value={data.description} onChange={e => setData("description", e.target.value)} className="w-full p-2 border rounded" rows={3} />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Region */}
            <div>
              <label className="block font-medium text-gray-700">Region</label>
              <select value={selectedRegion} onChange={handleRegionChange} className="w-full p-2 border rounded" required>
                <option value="">Select Region</option>
                {regionList.map(r => <option key={r.region_code} value={r.region_code}>{r.region_name}</option>)}
              </select>
              {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
            </div>

            {/* Province */}
            <div>
              <label className="block font-medium text-gray-700">Province</label>
              <select value={selectedProvince} onChange={handleProvinceChange} className="w-full p-2 border rounded" required disabled={!provList.length}>
                <option value="">Select Province</option>
                {provList.map(p => <option key={p.province_code} value={p.province_code}>{p.province_name}</option>)}
              </select>
              {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block font-medium text-gray-700">City</label>
              <select value={selectedCity} onChange={handleCityChange} className="w-full p-2 border rounded" required disabled={!cityList.length}>
                <option value="">Select City</option>
                {cityList.map(c => <option key={c.city_code} value={c.city_code}>{c.city_name}</option>)}
              </select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            {/* Barangay */}
            <div>
              <label className="block font-medium text-gray-700">Barangay</label>
              <select value={data.barangay || ""} onChange={handleBarangayChange} className="w-full p-2 border rounded" required disabled={!brgyList.length}>
                <option value="">Select Barangay</option>
                {brgyList.map(b => <option key={b.brgy_code} value={b.brgy_name}>{b.brgy_name}</option>)}
              </select>
              {errors.barangay && <p className="text-red-500 text-sm mt-1">{errors.barangay}</p>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" disabled={processing} className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700">
              {processing ? "Saving..." : editingShopId ? "Update Shop" : "Save Shop"}
            </button>
            <button type="button" onClick={cancelEdit} className="text-gray-600 hover:underline">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Shop;
