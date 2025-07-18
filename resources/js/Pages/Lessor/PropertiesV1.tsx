import React, { useState, ReactElement } from "react";
import LessorLayout from "@/Layouts/LessorLayout";
import RentalItemModal, { Category } from "@/Pages/Lessor/modals/RentalItemModal";
import { Button } from "@/Components/Lessor/ui/button";
import { Property as RentalItem } from "@/Pages/Lessor/types/Property";
import { router } from "@inertiajs/react";
import { BiBuildingHouse } from "react-icons/bi";
import Swal from "sweetalert2";

interface Shop {
  id: number;
  name: string;
  description?: string;
  location?: string;
  created_at?: string;
  logo_url?: string;
}

interface ShopsData {
  data: Shop[];
  current_page: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}



interface PropertiesProps {
  shops: ShopsData;
  categories: Category[];
  rentals: RentalItem[];
}


const Properties = ({ shops, categories, rentals }: PropertiesProps): ReactElement => {
  const [rentalList, setRentalList] = useState<RentalItem[]>(rentals || []);
  const [filteredShopId, setFilteredShopId] = useState<number | "all">("all");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState<RentalItem>({
    id: 0,
    name: "",
    description: "",
    categoryId: null,
    categoryType: "",
    reservationAmt: 0,
    imageUrl: "",
    shopId: null,
    address: "",
    customFieldAnswers: {},
  });

    const handleEdit = (rental: RentalItem) => {
      setForm({
        ...rental,
        categoryId: rental.categoryId ?? null,
        shopId: rental.shopId ?? null,
      });
      setShowModal(true);
    };

  const handleSave = () => {
    const payload = {
      itemName: form.name,
      description: form.description,
      category_id: form.categoryId,
      price: form.reservationAmt,
      quantity: 1,
      shop_id: form.shopId,
      custom_fields: form.customFieldAnswers || {},
    };

    if (form.id) {
      router.put(`/lessor/properties/${form.id}`, payload, {
        preserveScroll: true,
        onSuccess: () => {
          setRentalList((prev) =>
            prev.map((rental) =>
              rental.id === form.id ? { ...rental, ...form } : rental
            )
          );
          setShowModal(false);

          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Rental updated successfully!",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        },
        onError: () => {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Failed to update rental.",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
        },
      });
    } else {
      router.post("/lessor/properties", payload, {
        preserveScroll: true,
        onSuccess: () => {
          router.reload({
            only: ['rentals'],
            onSuccess: (page) => {
              const updatedRentals = (page.props as any).rentals as RentalItem[];
              setRentalList(updatedRentals);
              setShowModal(false);

              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Rental added successfully!",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
              });
            },
          });
        },
        onError: () => {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Failed to add rental.",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
        },
      });
    }
  };

  const filteredRentals = filteredShopId === "all"
  ? rentalList
  : rentalList.filter(rental => rental.shopId === filteredShopId);

  return (
    <div className="max-w-8xl mx-auto p-6">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="flex items-center text-3xl font-bold mb-6 text-orange-600">
          <BiBuildingHouse className="w-6 h-6 text-orange-500 mr-2" />
          My Properties & Rentals
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
            {shops.data.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </select>
          <Button
            onClick={() => {
              setForm({
                id: 0,
                name: "",
                description: "",
                categoryId: null,
                categoryType: "",
                reservationAmt: 0,
                imageUrl: "",
                shopId: null,
                address: "",
                customFieldAnswers: {},
              });
              setShowModal(true);
            }}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg"
          >
            + Add New Rental
          </Button>
        </div>
      </header>

      {filteredRentals.length === 0 ? (
        <p className="text-gray-500 italic text-center mt-12">
          No rentals found for this shop.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-orange-100 text-orange-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="hidden sm:table-cell px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="hidden md:table-cell px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-left">Shop</th>
                <th className="px-4 py-3 text-right">Reservation Fee</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredRentals.map((rental, idx) => {
                const shopName = shops.data.find(s => s.id === rental.shopId)?.name || "-";

                return (
                  <tr
                    key={rental.id}
                    className="hover:bg-orange-50 transition cursor-pointer"
                    onClick={() => handleEdit(rental)}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {rental.name}
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3 text-gray-700">
                      {rental.description || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-800 capitalize">
                      {rental.categoryType || "—"}
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 text-gray-700">
                      {rental.address || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">
                        {shopName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-green-700 font-semibold">
                      ₱{Number(rental.reservationAmt || 0).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
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
          shops={shops.data}
          onCategoryChange={(categoryId: number | null) =>
            setForm((prev) => ({
              ...prev,
              categoryId,
              customFieldAnswers: {},
            }))
          }
        />
      )}
    </div>
  );
};

Properties.layout = (page: ReactElement) => <LessorLayout>{page}</LessorLayout>;
export default Properties;
