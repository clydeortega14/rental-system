import React, { useEffect, useState } from "react";
import { Button } from "@/Components/Lessor/ui/button";
import { Input } from "@/Components/Lessor/ui/input";
import { Property as RentalItem } from "@/Pages/Lessor/types/Property";

export interface CustomField {
  id: number;
  label: string;
  slug: string;
  options: string;
  type: string;
}

export interface Category {
  id: number;
  name: string;
  custom_fields: CustomField[];
}

export interface Shop {
  id: number;
  name: string;
}

interface RentalItemModalProps {
  form: RentalItem;
  setForm: React.Dispatch<React.SetStateAction<RentalItem>>;
  onClose: () => void;
  onSave: (mediaFiles: File[]) => void;
  categories: Category[];
  shops: Shop[];
  onCategoryChange: (categoryId: number) => void;
}

export default function RentalItemModal({
  form,
  setForm,
  onClose,
  onSave,
  categories,
  shops,
  onCategoryChange,
}: RentalItemModalProps) {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const selectedCategory = categories.find((cat) => cat.id === form.categoryId);
  const customFields = selectedCategory?.custom_fields ?? [];

  // Initialize custom field answers
  const initializeCustomFieldAnswers = (categoryId: number): { [slug: string]: any } => {
    const cat = categories.find((c) => c.id === categoryId);
    const answers: { [slug: string]: any } = {};
    cat?.custom_fields?.forEach((field) => {
      answers[field.slug] = form.customFieldAnswers?.[field.slug] ?? (field.type === "checkbox" ? [] : "");
    });
    return answers;
  };

  useEffect(() => {
    if (form.categoryId && !form.customFieldAnswers) {
      setForm((prev) => ({
        ...prev,
        customFieldAnswers: initializeCustomFieldAnswers(prev.categoryId!),
      }));
    }
  }, [form.categoryId]);

  const handleInputChange = (field: keyof RentalItem, value: string | number) => {
    setForm({ ...form, [field]: value });
  };

  // Unified handler
  const handleCustomFieldChange = (fieldSlug: string, value: string, type: string) => {
    const prevValue = form.customFieldAnswers?.[fieldSlug];

    const normalized = type.toLowerCase();

    let updated: string | string[];

    switch (normalized) {
      case "checkbox":
      case "multiselect": {
        const selected: string[] = Array.isArray(prevValue) ? prevValue : [];
        updated = selected.includes(value)
          ? selected.filter((v) => v !== value)
          : [...selected, value];
        break;
      }
      case "radio":
      case "select": {
        updated = value;
        break;
      }
      default: {
        updated = value; // text, number, textarea, date, etc.
        break;
      }
    }

    setForm((prev) => ({
      ...prev,
      customFieldAnswers: {
        ...prev.customFieldAnswers,
        [fieldSlug]: updated,
      },
    }));
  };

  const parseOptions = (raw: unknown): string[] => {
    if (Array.isArray(raw)) return raw.map(String);
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch {
        return raw.split(",").map((opt) => opt.trim());
      }
    }
    return [];
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setMediaFiles([...mediaFiles, ...Array.from(e.target.files)]);
  };

  const removeExistingMedia = (path: string) => {
    setForm((prev) => ({
      ...prev,
      media_paths: prev.media_paths
        ? prev.media_paths.filter((p) => p !== path)
        : [],
    }));
  };

  const removeNewMedia = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Renders fields based on type
  const renderCustomFields = () =>
    customFields.map((field) => {
      const type = field.type.toLowerCase();
      const options = parseOptions(field.options);
      const value = form.customFieldAnswers?.[field.slug] ?? "";

      return (
        <div key={field.id} className="mb-4">
          <label className="block font-semibold mb-2 text-orange-600">{field.label}</label>

          {type === "checkbox" || type === "multiselect" ? (
            <div className="flex flex-wrap gap-3">
              {options.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={Array.isArray(value) && value.includes(option)}
                    onChange={() => handleCustomFieldChange(field.slug, option, field.type)}
                    className="accent-orange-600 w-4 h-4"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ) : type === "radio" ? (
            <div className="flex flex-wrap gap-3">
              {options.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="radio"
                    name={field.slug}
                    checked={value === option}
                    onChange={() => handleCustomFieldChange(field.slug, option, field.type)}
                    className="accent-orange-600 w-4 h-4"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ) : type === "select" ? (
            <select
              value={value || ""}
              onChange={(e) => handleCustomFieldChange(field.slug, e.target.value, field.type)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select...</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : type === "textarea" ? (
            <textarea
              value={value || ""}
              onChange={(e) => handleCustomFieldChange(field.slug, e.target.value, field.type)}
              className="w-full border border-gray-300 rounded-md p-2 min-h-[80px]"
            />
          ) : (
            <Input
              type={type}
              value={value || ""}
              onChange={(e) => handleCustomFieldChange(field.slug, e.target.value, field.type)}
            />
          )}
        </div>
      );
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center sm:text-left">
          {form.id ? "Edit Rental Item" : "Add Rental Item"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(mediaFiles);
          }}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block font-medium mb-1" htmlFor="name">Name</label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter rental name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 min-h-[80px]"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1" htmlFor="category">Category</label>
            <select
              id="category"
              value={form.categoryId ?? ""}
              onChange={(e) => {
                const id = Number(e.target.value);
                setForm({
                  ...form,
                  categoryId: id,
                  customFieldAnswers: initializeCustomFieldAnswers(id),
                });
                onCategoryChange(id);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Fields */}
          {renderCustomFields()}

          {/* Shop */}
          <div>
            <label className="block font-medium mb-1" htmlFor="shop">Shop</label>
            <select
              id="shop"
              value={form.shopId ?? ""}
              onChange={(e) => handleInputChange("shopId", Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Shop</option>
              {shops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reservation Fee */}
          <div>
            <label className="block font-medium mb-1" htmlFor="reservationAmt">Reservation Fee</label>
            <Input
              id="reservationAmt"
              type="number"
              min={0}
              value={form.reservationAmt}
              onChange={(e) => handleInputChange("reservationAmt", parseFloat(e.target.value))}
              required
              step="0.01"
            />
          </div>

          {/* Media Uploads */}
          <div>
            <label className="block font-medium mb-2">Images / Videos</label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              id="media"
              className="hidden"
              onChange={handleMediaChange}
            />
            <label
              htmlFor="media"
              className="px-4 py-2 bg-orange-600 text-white rounded-md cursor-pointer hover:bg-orange-500"
            >
              Upload Media
            </label>

            {/* Previews */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              {/* Existing */}
              {Array.isArray(form.media_paths) && form.media_paths.length > 0 &&
                form.media_paths.map((path, i) => (
                  <div key={i} className="relative group">
                    <img src={`/storage/${path}`} className="w-full h-24 object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => removeExistingMedia(path)}
                      className="absolute top-1 right-1 bg-black/60 text-white px-2 rounded opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
              ))}

              {/* New files */}
              {mediaFiles.map((file, i) => (
                <div key={i} className="relative group">
                  {file.type.startsWith("video") ? (
                    <video src={URL.createObjectURL(file)} className="w-full h-24 object-cover rounded-md" controls />
                  ) : (
                    <img src={URL.createObjectURL(file)} className="w-full h-24 object-cover rounded-md" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeNewMedia(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white px-2 rounded opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
            <Button type="submit" className="bg-orange-600 text-white hover:bg-orange-500">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
