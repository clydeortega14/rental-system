import React, { useState } from "react";
import RentalItemModal, { RentalItem, Category } from "@/Pages/Lessor/modals/RentalItemModal";
import { Button } from "@/Components/Lessor/ui/button";
import { usePage, router } from "@inertiajs/react";

export default function Properties() {
  const { rentals: initialRentals, categories } = usePage().props as {
    rentals: RentalItem[];
    categories: Category[];
  };

  const [rentals, setRentals] = useState<RentalItem[]>(initialRentals || []);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<RentalItem>({
    id: 0,
    name: "",
    description: "",
    categoryId: null,
    categoryType: "",
    reservationAmt: 0,
    imageUrl: "",
  });

  const handleEdit = (rental: RentalItem) => {
    setForm({
      ...rental,
      categoryId: rental.categoryId ?? null,
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
      custom_fields: form.customFieldAnswers || {},
    };

    if (form.id) {
      // Update existing rental
      router.put(`/lessor/properties/${form.id}`, payload, {
        onSuccess: (page) => {
          // Find and update rental in state
          setRentals((prev) =>
            prev.map((rental) =>
              rental.id === form.id ? { ...rental, ...form } : rental
            )
          );
          setShowModal(false);
        },
      });
    } else {
      // Create new rental
      router.post("/lessor/properties", payload, {
        onSuccess: (page) => {
          // Ideally, server response has new rental data
          // Let's find the newly added rental in page.props.rentals
          const newRental = page.props.rentals.find(
            (r: RentalItem) => !rentals.some((existing) => existing.id === r.id)
          );

          if (newRental) {
            setRentals((prev) => [...prev, newRental]);
          } else {
            // fallback: reload rentals from server props
            setRentals(page.props.rentals);
          }
          setShowModal(false);
        },
      });
    }
  };


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-600">My Properties & Rentals</h1>
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
            });
            setShowModal(true);
          }}
          className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg"
        >
          + Add New Rental
        </Button>
      </header>

      {rentals.length === 0 ? (
        <p className="text-gray-500 italic text-center mt-12">No rentals added yet.</p>
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
                <th className="hidden md:table-cell px-3 sm:px-6 py-2 text-left text-xs font-semibold text-orange-700 uppercase tracking-wider">
                  Address
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
                  className={idx % 2 === 0 ? "bg-white cursor-pointer" : "bg-orange-50 cursor-pointer"}
                  onClick={() => handleEdit(rental)}
                >
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-900 font-medium text-sm sm:text-base">
                    {rental.name}
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-3 whitespace-normal text-gray-700 max-w-xs text-sm sm:text-base">
                    {rental.description || "-"}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-gray-800 text-sm sm:text-base">
                    {rental.categoryType || "-"}
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-3 whitespace-nowrap text-gray-700 max-w-xs text-sm sm:text-base">
                    {rental.address || "-"}
                  </td>
                  <td className="px-3 sm:px-6 py-3 whitespace-nowrap text-right text-green-600 font-semibold text-sm sm:text-base">
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
