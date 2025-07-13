import React, { useState, ReactElement } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { ShopProps, Shop, FormData } from "@/Pages/Lessor/types/ShopProps";
import LessorLayout from "@/Layouts/LessorLayout";

function ShopPage() {
  const { shops = [], flash, errors } = usePage<ShopProps>().props;
  const [editingShopId, setEditingShopId] = useState<number | null>(null);

  const { data, setData, post, put, reset, processing } = useForm<FormData>({
    name: "",
    description: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingShopId) {
      put(route("lessor.shop.update", { shop: editingShopId }), {
        onSuccess: () => {
          setEditingShopId(null);
          reset();
        },
      });
    } else {
      post(route("lessor.shop.store"), {
        onSuccess: () => reset(),
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
  };

  const cancelEdit = () => {
    setEditingShopId(null);
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-orange-700">
        {editingShopId ? "Edit Shop" : "Shop Settings"}
      </h2>

      {flash?.success && (
        <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded mb-4">
          {flash.success}
        </div>
      )}

      {errors?.form && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded mb-4">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium text-gray-700">Shop Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errors?.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
          {errors?.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => setData("location", e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errors?.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700"
            disabled={processing}
          >
            {processing ? "Saving..." : editingShopId ? "Update Shop" : "Save Shop"}
          </button>

          {editingShopId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {shops.length > 0 ? (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Shop Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shops.map((shop) => (
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
                <p className="text-gray-500 text-sm">
                  📍 {shop.location || "No location"}
                </p>
                <p className="text-gray-400 text-xs">
                  Created:{" "}
                  {shop.created_at
                    ? new Date(shop.created_at).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 text-gray-600 text-center">
          You haven’t created any shops yet.
        </div>
      )}
    </div>
  );
}

ShopPage.layout = (page: ReactElement) => <LessorLayout>{page}</LessorLayout>;

export default ShopPage;
