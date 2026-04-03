import React, { useState, ReactElement } from "react";
import LessorLayout from "@/Layouts/LessorLayout";
import RentalItemModal, { Category } from "@/Pages/Lessor/modals/RentalItemModal";
import { Button } from "@/Components/Lessor/ui/button";
import { Property as RentalItem } from "@/Pages/Lessor/types/Property";
import { router } from "@inertiajs/react";
import { BiBuildingHouse } from "react-icons/bi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

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
  // const [rentalList, setRentalList] = useState<RentalItem[]>(rentals || []);
  const [filteredShopId, setFilteredShopId] = useState<number | "all">("all");
  const [showModal, setShowModal] = useState(true);

  // Media preview state
  const [previewMedia, setPreviewMedia] = useState<string[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
  });

  const handleEdit = (rental: RentalItem) => {
    setForm({
      ...rental,
      categoryId: rental.categoryId ?? null,
      shopId: rental.shopId ?? null,
    });
    setShowModal(true);
  };

  const handleSave = (mediaFiles: File[]) => {
    const formData = new FormData();

    formData.append("itemName", form.name);
    formData.append("description", form.description);
    formData.append("category_id", form.categoryId ? form.categoryId.toString() : "");
    formData.append("price", form.reservationAmt.toString());
    formData.append("quantity", "1");
    if (form.shopId) formData.append("shop_id", form.shopId.toString());

    Object.entries(form.customFieldAnswers || {}).forEach(([field, values]) => {
      values.forEach((value: string) => {
        formData.append(`custom_fields[${field}][]`, value);
      });
    });

    mediaFiles.forEach((file) => formData.append("media[]", file));
    if (form.media_paths) {
      form.media_paths.forEach((path) => formData.append("media_paths[]", path));
    }

    if (form.uuid) {
      formData.append("_method", "PUT");

      router.post(`/lessor/properties/${form.uuid}`, formData, {
        preserveState: true,
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
          router.reload({ only: ["rentals"] });
          setShowModal(false);
        },
      });
    } else {
      router.post(`/lessor/properties`, formData, {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => {
          router.reload({ only: ["rentals"] });
          setShowModal(false);
        },
      });
    }
  };

  // const filteredRentals =
  //   filteredShopId === "all"
  //     ? rentalList
  //     : rentalList.filter((rental) => rental.shopId === filteredShopId);

  const goNext = () => {
    if (previewMedia && currentIndex < previewMedia.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (previewMedia) {
      setCurrentIndex(0); // loop
    }
  };

  const goPrev = () => {
    if (previewMedia && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (previewMedia) {
      setCurrentIndex(previewMedia.length - 1); // loop
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="flex items-center text-3xl font-bold mb-6 text-brandYellow">
          <BiBuildingHouse className="w-6 h-6 text-brandYellow mr-2" />
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
              });
              setShowModal(true);
            }}
            className="bg-brandYellow hover:bg-jaba-hover text-white font-semibold px-5 py-2 rounded-lg"
          >
            + Add New Rental
          </Button>
        </div>
      </header>

      {/* Table */}
      {rentals.length === 0 ? (
        <p className="text-gray-500 italic text-center mt-12">
          No rentals found for this shop.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-orange-100 text-orange-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Media</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="hidden sm:table-cell px-4 py-3 text-left">
                  Description
                </th>
                
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {rentals.map((rental) => {
                const shopName =
                  shops.data.find((s) => s.id === rental.shopId)?.name || "-";
                const firstMedia =
                  rental.media_paths?.[0] || rental.imageUrl || "";

                return (
                  <tr
                    key={rental.id}
                    className="hover:bg-orange-50 transition cursor-pointer"
                    onClick={() => handleEdit(rental)}
                  >
                    <td className="px-4 py-3">
                      {rental.attachments.length > 0 ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewMedia(
                              rental.media_paths ||
                                (rental.imageUrl ? [rental.imageUrl] : [])
                            );
                            setCurrentIndex(0);
                          }}
                        >
                          {firstMedia.endsWith(".mp4") ||
                          firstMedia.includes("video") ? (
                            <video
                              src={`/storage/${firstMedia}`}
                              className="w-16 h-16 object-cover rounded-md"
                              muted
                            />
                          ) : (
                            <img
                              src={`/storage/${rental.attachments[0].path}/${rental.attachments[0].filename}.${rental.attachments[0].extension}`}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          )}
                        </button>
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">
                          No media
                        </div>
                      )}
                    </td>
                    
                    <td className="px-4 py-3 text-gray-800 capitalize">
                      {rental.categoryType || "—"}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {rental.name}
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3 text-gray-700">
                      {rental.description || "—"}
                    </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Rental Modal */}
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

      {/* Media Preview Slider Modal */}
      {previewMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setPreviewMedia(null)}
        >
          <div
            className="relative bg-black rounded-lg w-[90vw] max-w-3xl h-[80vh] flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media */}
            {previewMedia.length > 0 ? (
              previewMedia[currentIndex].endsWith(".mp4") ||
              previewMedia[currentIndex].includes("video") ? (
                <video
                  src={`/storage/${previewMedia[currentIndex]}`}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={`/storage/${previewMedia[currentIndex]}`}
                  className="w-full h-full object-contain"
                />
              )
            ) : null}

            {/* Prev Button */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80"
            >
              <IoChevronBack size={28} />
            </button>

            {/* Next Button */}
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80"
            >
              <IoChevronForward size={28} />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setPreviewMedia(null)}
              className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Properties.layout = (page: ReactElement) => <LessorLayout>{page}</LessorLayout>;
export default Properties;
