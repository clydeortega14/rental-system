import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Swal from 'sweetalert2';

const modeOfPayments = [
  "Recurring/Periodic",
  "One-Time Full Payment",
  "Partial/Advance Payment",
  "Overdue Payment with Late Fee",
  "Manual Payment Recording",
];

const pricingDurations = ['Hourly', 'Daily', 'Weekly', 'Monthly'];

type CustomField = {
  label: string;
  type: string;
  options?: string[];
};

const CreateCategory = () => {
  const { data, setData, post, processing } = useForm<{
    name: string;
    description: string;
    service_fee_value: string;
    service_fee_type: string;
    mode_of_payment: string[];
    pricing_duration: string[];
    custom_fields: CustomField[];
  }>({
    name: '',
    description: '',
    service_fee_value: '',
    service_fee_type: 'amount',
    mode_of_payment: [],
    pricing_duration: [],
    custom_fields: [{ label: '', type: '' }],
  });

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post(route('admin.configurations.categories.store'), data, {
      onSuccess: () => {
        Toast.fire({ icon: 'success', title: 'Category saved successfully' });
      },
      onError: () => {
        Toast.fire({ icon: 'error', title: 'Failed to save category' });
      },
    });
  };

  return (
    <div className="space-y-6 p-4 max-w-8xl mx-auto">
      <Head title="Create Category" />
      <h1 className="text-2xl font-semibold mb-6">Create New Category</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
            />

            <label className="block font-medium mt-4 mb-1">Description</label>
            <textarea
              className="w-full border rounded px-3 py-2 h-32"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
          </div>

          {/* Right Column */}
          <div>
            <label className="block font-medium mb-1">Service Fee</label>
            <div className="flex gap-2">
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                value={data.service_fee_value}
                onChange={(e) => setData('service_fee_value', e.target.value)}
              />
              <select
                className="border rounded px-3 py-2"
                value={data.service_fee_type}
                onChange={(e) => setData('service_fee_type', e.target.value)}
              >
                <option value="amount">₱</option>
                <option value="percent">%</option>
              </select>
            </div>

            <label className="block font-medium mt-4 mb-1">Mode of Payment</label>
            <select
              multiple
              className="w-full border rounded px-3 py-2 h-32"
              value={data.mode_of_payment}
              onChange={(e) =>
                setData('mode_of_payment', Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
            >
              {modeOfPayments.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>

            <label className="block font-medium mt-4 mb-1">Pricing Duration</label>
            <select
              multiple
              className="w-full border rounded px-3 py-2 h-32"
              value={data.pricing_duration}
              onChange={(e) =>
                setData('pricing_duration', Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
            >
              {pricingDurations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Fields */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Custom Fields</h2>
          {data.custom_fields.map((field, index) => (
            <div key={index} className="mb-4 border p-4 rounded bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  className="border rounded px-3 py-2"
                  placeholder="Field Label"
                  value={field.label}
                  onChange={(e) => {
                    const updated = [...data.custom_fields];
                    updated[index].label = e.target.value;
                    setData('custom_fields', updated);
                  }}
                />
                <select
                  className="border rounded px-3 py-2"
                  value={field.type}
                  onChange={(e) => {
                    const updated = [...data.custom_fields];
                    updated[index].type = e.target.value;
                    if (['select', 'checkbox'].includes(e.target.value)) {
                      updated[index].options = [''];
                    } else {
                      delete updated[index].options;
                    }
                    setData('custom_fields', updated);
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                </select>

                <button
                  type="button"
                  className="bg-brandYellow text-white rounded px-3 py-2"
                  onClick={() => {
                    const updated = [...data.custom_fields];
                    updated.splice(index, 1);
                    setData('custom_fields', updated);
                  }}
                >
                  Remove Field
                </button>
              </div>

              {/* Options for Select/Checkbox */}
              {(field.type === 'select' || field.type === 'checkbox') && (
                <div className="mt-4 space-y-2">
                  {(field.options || []).map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="border rounded px-3 py-2 w-full"
                        placeholder={`Option ${optIndex + 1}`}
                        value={option}
                        onChange={(e) => {
                          const updated = [...data.custom_fields];
                          updated[index].options![optIndex] = e.target.value;
                          setData('custom_fields', updated);
                        }}
                      />
                      <button
                        type="button"
                        className="text-sm bg-gray-200 px-2 py-1 rounded"
                        onClick={() => {
                          const updated = [...data.custom_fields];
                          updated[index].options!.splice(optIndex, 1);
                          setData('custom_fields', updated);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-sm text-blue-600"
                    onClick={() => {
                      const updated = [...data.custom_fields];
                      updated[index].options!.push('');
                      setData('custom_fields', updated);
                    }}
                  >
                    + Add Option
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setData('custom_fields', [...data.custom_fields, { label: '', type: '' }])
            }
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Add Custom Field
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={processing}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded"
        >
          Save Category
        </button>
      </form>
    </div>
  );
};

CreateCategory.layout = (page: React.ReactNode) => (
  <AdminLayout
    active_keys={['/admin/categories']}
    active_selected_keys={['/admin/categories/create']}
  >
    {page}
  </AdminLayout>
);

export default CreateCategory;
