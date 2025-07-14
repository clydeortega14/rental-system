import React, { useState } from "react";
import RentalItemModal, { RentalItem, Category } from "@/Pages/Lessor/modals/RentalItemModal";
import { Button } from "@/Components/Lessor/ui/button";
import { usePage, router } from "@inertiajs/react";
import LessorLayout from "@/Layouts/LessorLayout";
import { Select } from "@/Components/Lessor/ui/select"; // if you're using a Select component

interface Shop {
  id: number;
  name: string;
}

function Properties() {
  const { rentals: initialRentals, categories, shops } = usePage().props as {
    rentals: RentalItem[];
    categories: Category[];
    shops: Shop[];
  };

  console.log(111111111111);

  

  const [rentals, setRentals] = useState<RentalItem[]>(initialRentals || []);
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
        onSuccess: (page) => {
          setRentals((prev) =>
            prev.map((rental) =>
              rental.id === form.id ? { ...rental, ...form } : rental
            )
          );
          setShowModal(false);
        },
      });
    } else {
      router.post("/lessor/properties", payload, {
        onSuccess: (page) => {
          const newRental = page.props.rentals.find(
            (r: RentalItem) => !rentals.some((existing) => existing.id === r.id)
          );
          setRentals(newRental ? [...rentals, newRental] : page.props.rentals);
          setShowModal(false);
        },
      });
    }
  };

  const filteredRentals = filteredShopId === "all"
    ? rentals
    : rentals.filter((r) => r.shopId === filteredShopId);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-orange-600">My Properties & Rentals</h1>
        <div className="flex gap-3 flex-col sm:flex-row">
          <select
            className="border border-gray-300 rounded-md px-3 py-1.5"
            value={filteredShopId}
            onChange={(e) =>
              setFilteredShopId(e.target.value === "all" ? "all" : Number(e.target.value))
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
                name: "",
                description: "",
                categoryId: null,
                categoryType: "",
                reservationAmt: 0,
                imageUrl: "",
                shopId: null,
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
        <p className="text-gray-500 italic text-center mt-12">No rentals found for this shop.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-3 sm:px-6 py-2 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider">Name</th>
                <th className="hidden sm:table-cell px-3 sm:px-6 py-2 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider">Description</th>
                <th className="px-3 sm:px-6 py-2 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider">Category</th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-2 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider">Address</th>
                <th className="px-3 sm:px-6 py-2 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider">Shop</th>
                <th className="px-3 sm:px-6 py-2 text-right text-xs font-semibold text-orange-700 uppercase tracking-wider">Reservation Fee</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRentals.map((rental, idx) => (
                <tr
                  key={rental.id}
                  className={idx % 2 === 0 ? "bg-white cursor-pointer" : "bg-orange-50 cursor-pointer"}
                  onClick={() => handleEdit(rental)}
                >
                  <td className="px-3 sm:px-6 py-3 text-gray-900 font-medium text-sm">{rental.name}</td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-3 text-gray-700 text-sm">{rental.description || "-"}</td>
                  <td className="px-3 sm:px-6 py-3 text-gray-800 text-sm">{rental.categoryType || "-"}</td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-3 text-gray-700 text-sm">{rental.address || "-"}</td>
                  <td className="px-3 sm:px-6 py-3 text-sm text-gray-700">
                    {shops.find((s) => s.id === rental.shopId)?.name || "-"}
                  </td>
                  <td className="px-3 sm:px-6 py-3 text-right text-green-600 font-semibold text-sm">
                    &#8369;{Number(rental.reservationAmt || 0).toFixed(2)}
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
          onCategoryChange={(categoryId) =>
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
}

// Properties.layout = (page) => <LessorLayout>{page}</LessorLayout>;

export default Properties;
