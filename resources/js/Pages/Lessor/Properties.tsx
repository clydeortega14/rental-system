import React, { useState, ReactElement, useEffect } from "react";
import RentalItemModal, { Category } from "@/Pages/Lessor/modals/RentalItemModal";
import { Property as RentalItem } from "@/Pages/Lessor/types/Property";
import { Button } from "@/Components/Lessor/ui/button";
import { usePage, router } from "@inertiajs/react";
// import LessorLayout from "@/Layouts/LessorLayout";
import LesseeLayout from "@/Layouts/LesseeLayout";
import AuthLayout from "@/Layouts/AuthLayout";
import { BiBuildingHouse } from "react-icons/bi";

interface Shop {
  id: number;
  name: string;
}

interface PropertiesProps {
  rentals: RentalItem[];
  shops: Shop[];
  categories: Category[];
}

function Properties({rentals, shops, categories}: PropertiesProps) {

  
  const [filteredShopId, setFilteredShopId] = useState<number | "all">("all");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState<RentalItem>({
    id: 0,
    uuid: "",
    name: "",
    description: "",
    categoryId: null,
    categoryType: "",
    reservationAmt: 0,
    imageUrl: "",
    shopId: null,
    address: "",
    customFieldAnswers: {},
    media_paths: [],
  });

  /** Handle Edit */
  const handleEdit = (rental: RentalItem) => {
    setForm({
      ...rental,
      categoryId: rental.categoryId ?? null,
      shopId: rental.shopId ?? null,
      media_paths: rental.media_paths ?? [],
    });
    setShowModal(true);
  };

  /** Handle Save (Create or Update) */
  const handleSave = (mediaFiles: File[]) => {
    const formData = new FormData();

    // Add fields
    formData.append("itemName", form.name);
    formData.append("description", form.description);
    formData.append("category_id", form.categoryId ? form.categoryId.toString() : "");
    formData.append("price", form.reservationAmt.toString());
    formData.append("quantity", "1");
    if (form.shopId) formData.append("shop_id", form.shopId.toString());

    // Custom fields as array
    Object.entries(form.customFieldAnswers || {}).forEach(([field, values]) => {
      values.forEach((value: string) => {
        formData.append(`custom_fields[${field}][]`, value);
      });
    });

    // Media files
    mediaFiles.forEach((file) => formData.append("media[]", file));

    // Existing media paths
    if (form.media_paths) {
      form.media_paths.forEach((path) => formData.append("media_paths[]", path));
    }

    // UPDATE
    if (form.uuid) {
      formData.append("_method", "PUT");

      router.post(`/lessor/properties/${form.uuid}`, formData, {
        preserveScroll: true,
        preserveState: true,
        forceFormData: true,
        onSuccess: () => {
          // router.reload({ only: ["rentals"] });
          setShowModal(false);
        },
        onError: (errors) => {
          console.error("Update error: ", errors);
        },
      });
    } else {
      // CREATE
      router.post(`/lessor/properties`, formData, {
        preserveScroll: true,
        preserveState: true,
        forceFormData: true,
        onSuccess: () => {
          // router.reload({ only: ["rentals"] });
          setShowModal(false);
        },
        onError: (errors) => {
          console.error("Create error: ", errors);
        },
      });
    }
  };

  /** Filter Rentals by Shop */
  const filteredRentals =
    filteredShopId === "all"
      ? rentals
      : rentals.filter((r) => r.shopId === filteredShopId);

  return (
    <AuthLayout>
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="flex items-center text-3xl font-bold mb-6 text-brandYellow">
          <BiBuildingHouse className="w-6 h-6 text-brandYellow mr-2" />
          Rental Listings
        </h1>
        <div className="flex gap-3 flex-col sm:flex-row">
          <select
            className="border border-gray-300 rounded-md px-3 py-1.5"
            value={filteredShopId}
            onChange={(e) =>
              setFilteredShopId(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
          >
            <option value="all">All Shops</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </select>
          <Button
            onClick={() => {
              setForm({
                id: 0,
                uuid: "",
                name: "",
                description: "",
                categoryId: null,
                categoryType: "",
                reservationAmt: 0,
                imageUrl: "",
                shopId: null,
                address: "",
                customFieldAnswers: {},
                media_paths: [],
              });
              setShowModal(true);
            }}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg"
          >
            + Add New Rental
          </Button>
        </div>
      </header>

      {rentals.length === 0 ? (
        <p className="text-gray-500 italic text-center mt-12">
          No rentals found for this shop.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-3 sm:px-6 py-2 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-6 py-2 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-3 sm:px-6 py-2 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-3 sm:px-6 py-2 text-right text-xs font-semibold text-orange-700 uppercase tracking-wider">
                  Reservation Fee
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rentals.map((rental, idx) => (
                <tr
                  key={rental.id}
                  className={
                    idx % 2 === 0
                      ? "bg-white cursor-pointer"
                      : "bg-orange-50 cursor-pointer"
                  }
                  onClick={() => handleEdit(rental)}
                >
                  <td className="px-3 sm:px-6 py-3 text-gray-900 font-medium text-sm">
                    {rental.name}
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-3 text-gray-700 text-sm">
                    {rental.description || "-"}
                  </td>
                  <td className="px-3 sm:px-6 py-3 text-gray-800 text-sm">
                    {rental.categoryType || "-"}
                  </td>
                  <td className="px-3 sm:px-6 py-3 text-right text-green-600 font-semibold text-sm">
                    ₱{Number(rental.reservationAmt || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <RentalItemModal
          form={form}
          setForm={setForm}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          categories={categories}
          shops={shops}
          onCategoryChange={(categoryId: number | null) =>
            setForm((prev) => ({
              ...prev,
              categoryId,
              customFieldAnswers: {},
            }))
          }
        />
      )}
    </AuthLayout>
  );
}

// Properties.layout = (page: ReactElement) => <LesseeLayout >{page}</LesseeLayout>;

export default Properties;
