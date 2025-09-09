import React, { useState, useEffect } from "react";
import { Category } from "@/types/category";


type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  onSave: (updatedCategory: Category) => void;
};

const EditCategoryModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  category,
  onSave,
}) => {
  const [imageError, setImageError] = useState<string | null>(null);

  const [editedCategory, setEditedCategory] = useState<Category>({
    ...category,
    mode_of_payment: category.mode_of_payment || [],
    pricing_duration: category.pricing_duration || [],
    image: null,
  });

  useEffect(() => {
    setEditedCategory({
      ...category,
      mode_of_payment: category.mode_of_payment || [],
      pricing_duration: category.pricing_duration || [],
      image: null,
    });

    // Ensure correct absolute storage path
    if (category?.image_path) {
      setImagePreview(`/storage/${category.image_path}`);
    } else {
      setImagePreview(null);
    }
  }, [category]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedCategory((prev) => ({ ...prev, [name]: value }));
  };

  const [imagePreview, setImagePreview] = useState<string | null>(
    category?.image_path ? `/storage/${category.image_path}` : null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setImageError("Only JPG and PNG files are allowed.");
        setImagePreview(null);
        setEditedCategory((prev) => ({ ...prev, image: null }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setImageError("File size must be less than 2MB.");
        setImagePreview(null);
        setEditedCategory((prev) => ({ ...prev, image: null }));
        return;
      }

      setImageError(null);
      setEditedCategory((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomField = () => {
    const newField = { id: Date.now(), label: "", type: "", options: [] };
    setEditedCategory((prev) => ({
      ...prev,
      custom_fields: [...prev.custom_fields, newField],
    }));
  };

  const handleRemoveCustomField = (index: number) => {
    const updatedFields = [...editedCategory.custom_fields];
    updatedFields.splice(index, 1);
    setEditedCategory((prev) => ({
      ...prev,
      custom_fields: updatedFields,
    }));
  };

  const modeOfPaymentStatic = [
    "Recurring/Periodic",
    "One-Time Full Payment",
    "Partial/Advance Payment",
    "Overdue Payment with Late Fee",
    "Manual Payment Recording",
  ];

  const pricingDurationStatic = ["Hourly", "Daily", "Weekly", "Monthly"];

  if (!isOpen || !category) return null;
  console.log(imagePreview)
  return (
    <div
      className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-40 z-50"
      style={{ marginTop: "-1px" }}
    >
      <div className="bg-white rounded-2xl shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 mt-10">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Edit Category
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className="space-y-8">
          {/* Category Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Image Upload */}
            <div>
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow mb-3 inline-block">
                Upload Image
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-40 w-45 object-contain rounded border shadow-sm bg-gray-50"
                  />
                ) : (
                  <div className="h-40 w-40 flex items-center justify-center border rounded bg-gray-100 text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {imageError && (
                <p className="text-red-500 text-sm mt-1">{imageError}</p>
              )}
            </div>

            {/* Fields beside the image */}
            <div className="md:col-span-2 space-y-4">
              {/* Name + Service Fee inline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedCategory.name}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Service Fee</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="service_fee_value"
                      value={editedCategory.template_category?.service_fee}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                    <select
                      name="service_fee_type"
                      value={editedCategory.service_fee_type}
                      onChange={handleInputChange}
                      className="border rounded px-3 py-2"
                    >
                      <option value="amount">₱</option>
                      <option value="percent">%</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={editedCategory.description || ""}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 h-28"
                />
              </div>
            </div>
          </div>

          {/* Mode of Payment */}
          <div>
            <label className="block font-medium mb-2">Mode of Payment</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {modeOfPaymentStatic.map((mode) => {
                const checkedList =
                  editedCategory.mode_of_payment?.length > 0
                    ? editedCategory.mode_of_payment
                    : editedCategory.template_category?.mode_of_payment || [];

                return (
                  <label
                    key={mode}
                    className="flex items-center gap-2 p-2 border rounded"
                  >
                    <input
                      type="checkbox"
                      checked={checkedList.includes(mode)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...checkedList, mode]
                          : checkedList.filter((item) => item !== mode);
                        setEditedCategory({
                          ...editedCategory,
                          mode_of_payment: updated,
                        });
                      }}
                    />
                    {mode}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Pricing Duration */}
          <div>
            <label className="block font-medium mb-2">Pricing Duration</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pricingDurationStatic.map((duration) => {
                const checkedList =
                  editedCategory.pricing_duration?.length > 0
                    ? editedCategory.pricing_duration
                    : editedCategory.template_category?.pricing_duration || [];

                return (
                  <label
                    key={duration}
                    className="flex items-center gap-2 p-2 border rounded"
                  >
                    <input
                      type="checkbox"
                      checked={checkedList.includes(duration)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...checkedList, duration]
                          : checkedList.filter((item) => item !== duration);
                        setEditedCategory({
                          ...editedCategory,
                          pricing_duration: updated,
                        });
                      }}
                    />
                    {duration}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Custom Fields */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Custom Fields</h3>
            <div className="space-y-4">
              {editedCategory.custom_fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-lg bg-gray-50 space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Field Label"
                      value={field.label}
                      onChange={(e) => {
                        const updated = [...editedCategory.custom_fields];
                        updated[index].label = e.target.value;
                        setEditedCategory({
                          ...editedCategory,
                          custom_fields: updated,
                        });
                      }}
                      className="border rounded px-3 py-2"
                    />
                    <select
                      value={field.type}
                      onChange={(e) => {
                        const updated = [...editedCategory.custom_fields];
                        updated[index].type = e.target.value;
                        if (["select", "Checkbox"].includes(e.target.value)) {
                          updated[index].options =
                            updated[index].options || [""];
                        } else {
                          delete updated[index].options;
                        }
                        setEditedCategory({
                          ...editedCategory,
                          custom_fields: updated,
                        });
                      }}
                      className="border rounded px-3 py-2"
                    >
                      <option value="">Select Type</option>
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="select">Select</option>
                      <option value="Checkbox">Checkbox</option>
                    </select>
                    <button
                      type="button"
                      className="bg-red-500 text-white px-3 py-2 rounded"
                      onClick={() => handleRemoveCustomField(index)}
                    >
                      Remove
                    </button>
                  </div>

                  {(field.type === "select" || field.type === "Checkbox") && (
                    <div className="space-y-2">
                      {(field.options || []).map((option, optIndex) => (
                        <div key={optIndex} className="flex gap-2">
                          <input
                            type="text"
                            placeholder={`Option ${optIndex + 1}`}
                            value={option}
                            onChange={(e) => {
                              const updated = [...editedCategory.custom_fields];
                              updated[index].options![optIndex] =
                                e.target.value;
                              setEditedCategory({
                                ...editedCategory,
                                custom_fields: updated,
                              });
                            }}
                            className="border rounded px-3 py-2 w-full"
                          />
                          <button
                            type="button"
                            className="bg-gray-300 px-2 py-1 rounded"
                            onClick={() => {
                              const updated = [...editedCategory.custom_fields];
                              updated[index].options!.splice(optIndex, 1);
                              setEditedCategory({
                                ...editedCategory,
                                custom_fields: updated,
                              });
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="text-blue-600 text-sm"
                        onClick={() => {
                          const updated = [...editedCategory.custom_fields];
                          updated[index].options!.push("");
                          setEditedCategory({
                            ...editedCategory,
                            custom_fields: updated,
                          });
                        }}
                      >
                        + Add Option
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddCustomField}
              className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              + Add Custom Field
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
