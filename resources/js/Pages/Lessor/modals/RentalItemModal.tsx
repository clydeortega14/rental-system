import React from "react";
import { Dialog } from "@/Components/Lessor/ui/dialog";
import { Button } from "@/Components/Lessor/ui/button";
import { Input } from "@/Components/Lessor/ui/input";

export interface CustomField {
  id: number;
  label: string;
  slug: string;
  options: string; // JSON or CSV string
}

export interface Category {
  id: number;
  name: string;
  custom_fields: CustomField[];
}

export interface RentalItem {
  id: number;
  name: string;
  description: string;
  category: string;
  categoryId?: number | null;
  categoryType: string;
  reservationAmt: number;
  imageUrl: string;
  address?: string;
  customFieldAnswers?: {
    [slug: string]: string[];
  };
}

interface RentalItemModalProps {
  form: RentalItem;
  setForm: (form: RentalItem) => void;
  onClose: () => void;
  onSave: () => void;
  categories: Category[];
  onCategoryChange: (categoryId: number) => void;
}

export default function RentalItemModal({
  form,
  setForm,
  onClose,
  onSave,
  categories,
  onCategoryChange,
}: RentalItemModalProps) {
  const selectedCategory = categories.find((cat) => cat.id === form.categoryId);
  const customFields = selectedCategory?.custom_fields ?? [];

  const handleInputChange = (field: keyof RentalItem, value: string | number) => {
    setForm({ ...form, [field]: value });
  };

  const handleCheckboxChange = (fieldSlug: string, value: string) => {
    const selected = form.customFieldAnswers?.[fieldSlug] || [];
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    setForm({
      ...form,
      customFieldAnswers: {
        ...form.customFieldAnswers,
        [fieldSlug]: updated,
      },
    });
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

  const renderCustomFields = () =>
    customFields.map((field) => {
      const options = parseOptions(field.options);
      const selectedValues = form.customFieldAnswers?.[field.slug] || [];

      return (
        <div key={field.id} className="mb-4">
          <label className="block font-semibold mb-2 text-orange-600">
            {field.label}
          </label>
          <div className="flex flex-wrap gap-3">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 text-sm cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => handleCheckboxChange(field.slug, option)}
                  className="accent-orange-600 w-4 h-4"
                />
                <span className="select-none">{option}</span>
              </label>
            ))}
          </div>
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
            onSave();
          }}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block font-medium mb-1" htmlFor="name">
              Name
            </label>
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
            <label className="block font-medium mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Write a short description"
              className="w-full border border-gray-300 rounded-md p-2 resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={form.categoryId ?? ""}
              onChange={(e) => onCategoryChange(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reservation Amount */}
          <div>
            <label className="block font-medium mb-1" htmlFor="reservationAmt">
              Reservation Fee
            </label>
            <Input
              id="reservationAmt"
              type="number"
              min={0}
              value={form.reservationAmt}
              onChange={(e) =>
                handleInputChange("reservationAmt", parseFloat(e.target.value))
              }
              required
              step="0.01"
            />
          </div>

          {/* Custom Fields */}
          {renderCustomFields()}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-600 text-white hover:bg-orange-500"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
