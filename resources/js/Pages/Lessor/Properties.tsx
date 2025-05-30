import React, { useState, ChangeEvent } from "react";
import LessorLayout from "@/Layouts/LessorLayout";
import { Button } from "@/Components/Lessor/ui/button";

const PROPERTY_CATEGORIES = ["Apartment", "House", "Condo", "Studio"];
const VEHICLE_CATEGORIES = ["Car", "Motorcycle", "Truck", "Van"];

type Property = {
  id: number;
  name: string;
  description: string;
  address: string;
  category: string;
  categoryType: string;
  bedrooms: number;
  bathrooms: number;
  reservationAmt: number;
  availableFrom: string;
  imageUrl?: string;
};

type Vehicle = {
  id: number;
  name: string;
  description: string;
  category: string;
  categoryType: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  reservationAmt: number;
  imageUrl?: string;
};

type RentalItem = Property | Vehicle;

const PROPERTY_CATEGORY_TYPES = ["Entire Place", "Private Room", "Shared Room"];
const VEHICLE_CATEGORY_TYPES = ["Personal", "Commercial", "Rental"];

export default function RentalPortfolio() {
  // Mock existing data - mixed properties and vehicles
  const mockItems: RentalItem[] = [
    {
      id: 1,
      name: "Ocean View Apartment",
      description: "Beautiful apartment overlooking the sea",
      address: "123 Beach Ave, Miami",
      category: "Apartment",
      categoryType: "Entire Place",
      bedrooms: 3,
      bathrooms: 2,
      reservationAmt: 1500,
      availableFrom: "2025-06-01",
      imageUrl: "/images/lease/ocean_view_apt.jpg",
    },
    {
      id: 2,
      name: "Cozy Downtown Condo",
      description: "Modern condo in the heart of the city",
      address: "456 Main St, New York",
      category: "Condo",
      categoryType: "Private Room",
      bedrooms: 1,
      bathrooms: 1,
      reservationAmt: 1200,
      availableFrom: "2025-07-15",
      imageUrl: "/images/lease/cozy_condo.jpg",
    },
    {
      id: 3,
      name: "Toyota Camry 2019",
      description: "Reliable and fuel efficient sedan",
      category: "Car",
      categoryType: "Personal",
      make: "Toyota",
      model: "Camry",
      year: 2019,
      mileage: 45000,
      reservationAmt: 40,
      imageUrl: "/images/lease/camry.jpg",
    },
    {
      id: 4,
      name: "Harley Davidson Motorcycle",
      description: "Classic bike for city cruising",
      category: "Motorcycle",
      categoryType: "Rental",
      make: "Harley Davidson",
      model: "Sportster",
      year: 2017,
      mileage: 12000,
      reservationAmt: 55,
      imageUrl: "/images/lease/harley.jpg",
    },
  ];

  const [items, setItems] = useState<RentalItem[]>(mockItems);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);

  const [form, setForm] = useState<RentalItem>({
    id: 0,
    name: "",
    description: "",
    address: "",
    category: PROPERTY_CATEGORIES[0],
    categoryType: PROPERTY_CATEGORY_TYPES[0],
    bedrooms: 1,
    bathrooms: 1,
    reservationAmt: 0,
    availableFrom: new Date().toISOString().slice(0, 10),
  } as RentalItem);

  const isVehicleCategory = (category: string) => VEHICLE_CATEGORIES.includes(category);
  const isPropertyCategory = (category: string) => PROPERTY_CATEGORIES.includes(category);

  function handleCategoryChange(category: string) {
    if (isPropertyCategory(category)) {
      setForm({
        id: 0,
        name: "",
        description: "",
        address: "",
        category,
        categoryType: PROPERTY_CATEGORY_TYPES[0],
        bedrooms: 1,
        bathrooms: 1,
        reservationAmt: 0,
        availableFrom: new Date().toISOString().slice(0, 10),
      });
    } else if (isVehicleCategory(category)) {
      setForm({
        id: 0,
        name: "",
        description: "",
        category,
        categoryType: VEHICLE_CATEGORY_TYPES[0],
        make: "",
        model: "",
        year: new Date().getFullYear(),
        mileage: 0,
        reservationAmt: 0,
      });
    }
  }

  function openAdd() {
    handleCategoryChange(PROPERTY_CATEGORIES[0]);
    setIsAddOpen(true);
  }

  function openEdit(item: RentalItem) {
    setForm(item);
    setSelectedItem(item);
    setIsEditOpen(true);
  }

  function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((i) => i.id !== id));
    }
  }

  function handleSave() {
    if (form.id === 0) {
      // Add new
      const newItem = { ...form, id: Date.now() };
      setItems([...items, newItem]);
    } else {
      // Edit existing
      setItems(items.map((item) => (item.id === form.id ? form : item)));
    }
    setIsAddOpen(false);
    setIsEditOpen(false);
  }

  return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600">Rental Portfolio</h1>
          <Button className="bg-orange-600 text-white" onClick={openAdd}>
            + Add New Item
          </Button>
        </div>

        {/* List of rental items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.description}</p>
              {isPropertyCategory(item.category) && (
                <>
                  <p>
                    <strong>Address:</strong> {(item as Property).address}
                  </p>
                  <p>
                    <strong>Bedrooms:</strong> {(item as Property).bedrooms}
                  </p>
                  <p>
                    <strong>Bathrooms:</strong> {(item as Property).bathrooms}
                  </p>
                  <p>
                    <strong>Reservation Fee:</strong> &#8369;{(item as Property).reservationAmt}
                  </p>
                  <p>
                    <strong>Available From:</strong> {(item as Property).availableFrom}
                  </p>
                </>
              )}
              {isVehicleCategory(item.category) && (
                <>
                  <p>
                    <strong>Make:</strong> {(item as Vehicle).make}
                  </p>
                  <p>
                    <strong>Model:</strong> {(item as Vehicle).model}
                  </p>
                  <p>
                    <strong>Year:</strong> {(item as Vehicle).year}
                  </p>
                  <p>
                    <strong>Mileage:</strong> {(item as Vehicle).mileage} km
                  </p>
                  <p>
                    <strong>Reservation Fee:</strong> &#8369;{(item as Vehicle).reservationAmt}
                  </p>
                </>
              )}

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => openEdit(item)}
                  className="text-orange-600 border-orange-600 hover:bg-orange-50"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {(isAddOpen || isEditOpen) && (
          <RentalItemModal
            form={form}
            setForm={setForm}
            onClose={() => {
              setIsAddOpen(false);
              setIsEditOpen(false);
            }}
            isVehicle={isVehicleCategory(form.category)}
            isProperty={isPropertyCategory(form.category)}
            propertyCategoryTypes={PROPERTY_CATEGORY_TYPES}
            vehicleCategoryTypes={VEHICLE_CATEGORY_TYPES}
            onCategoryChange={handleCategoryChange}
            onSave={handleSave}
          />
        )}
      </div>
  );
}

function RentalItemModal({
  form,
  setForm,
  onClose,
  isVehicle,
  isProperty,
  propertyCategoryTypes,
  vehicleCategoryTypes,
  onCategoryChange,
  onSave,
}: {
  form: RentalItem;
  setForm: React.Dispatch<React.SetStateAction<RentalItem>>;
  onClose: () => void;
  isVehicle: boolean;
  isProperty: boolean;
  propertyCategoryTypes: string[];
  vehicleCategoryTypes: string[];
  onCategoryChange: (category: string) => void;
  onSave: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center pt-16 z-50 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">{form.id === 0 ? "Add New Item" : "Edit Item"}</h2>

        <label className="block font-semibold mb-1">Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label className="block font-semibold mb-1">Category</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          value={form.category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {[...PROPERTY_CATEGORIES, ...VEHICLE_CATEGORIES].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label className="block font-semibold mb-1">Category Type</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          value={form.categoryType}
          onChange={(e) => setForm({ ...form, categoryType: e.target.value })}
        >
          {(isProperty ? propertyCategoryTypes : vehicleCategoryTypes).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {isProperty && (
          <>
            <label className="block font-semibold mb-1">Address</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={(form as Property).address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <label className="block font-semibold mb-1">Bedrooms</label>
            <input
              type="number"
              min={0}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={(form as Property).bedrooms}
              onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
            />

            <label className="block font-semibold mb-1">Bathrooms</label>
            <input
              type="number"
              min={0}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={(form as Property).bathrooms}
              onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
            />

            <label className="block font-semibold mb-1">Price Per Month (USD)</label>
            <input
              type="number"
              min={0}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={(form as Property).reservationAmt}
              onChange={(e) => setForm({ ...form, reservationAmt: Number(e.target.value) })}
            />

            <label className="block font-semibold mb-1">Available From</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={(form as Property).availableFrom}
              onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
            />
          </>
        )}

        {isVehicle && (
          <>
            <label className="block font-semibold mb-1">Make</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={(form as Vehicle).make}
              onChange={(e) => setForm({ ...form, make: e.target.value })}
            />

            <label className="block font-semibold mb-1">Model</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={(form as Vehicle).model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
            />

            <label className="block font-semibold mb-1">Year</label>
            <input
              type="number"
              min={1900}
              max={new Date().getFullYear()}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={(form as Vehicle).year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            />

            <label className="block font-semibold mb-1">Mileage (km)</label>
            <input
              type="number"
              min={0}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={(form as Vehicle).mileage}
              onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
            />

            <label className="block font-semibold mb-1">Price Per Day (USD)</label>
            <input
              type="number"
              min={0}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
              value={(form as Vehicle).reservationAmt}
              onChange={(e) => setForm({ ...form, reservationAmt: Number(e.target.value) })}
            />
          </>
        )}

        <label className="block font-semibold mb-1">Image URL</label>
        <input
          type="text"
          placeholder="Enter image URL or upload feature can be implemented"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
          value={form.imageUrl || ""}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        {/* Do's and Don'ts */}
        <div className="bg-orange-50 border border-orange-300 rounded p-4 mb-6 text-sm text-orange-700">
          <strong>Do's and Don'ts when listing a rental item:</strong>
          <ul className="list-disc ml-5 mt-2">
            <li><strong>Do</strong> provide clear and honest descriptions.</li>
            <li><strong>Do</strong> upload high-quality images or provide valid URLs.</li>
            <li><strong>Do</strong> specify accurate availability or rental periods.</li>
            <li><strong>Don't</strong> misrepresent features or conditions.</li>
            <li><strong>Don't</strong> leave critical details like price or address blank.</li>
            <li><strong>Don't</strong> upload copyrighted or inappropriate images.</li>
          </ul>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            className="bg-orange-600 text-white hover:bg-orange-500"
            onClick={() => {
              // Add validation here if needed
              onSave();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
