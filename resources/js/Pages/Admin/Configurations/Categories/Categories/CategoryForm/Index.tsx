import { useForm } from '@inertiajs/react';
import { PageWithAdminLayout } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';

const CategoryForm: PageWithAdminLayout = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        tags: [],
        image: null as File | null, // ✅ add image field
    });

    const [preview, setPreview] = useState<string | null>(null);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/categories', {
            forceFormData: true, // ✅ required for file uploads
            onSuccess: () => alert('Category created successfully!'),
            onError: () => alert('Failed to create category'),
        });
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-6">Create New Categoryssssssss</h1>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={`mt-1 block w-full rounded-md border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        } shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Enter category name"
                        required
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className={`mt-1 block w-full rounded-md border ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                        } shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        placeholder="Enter description (optional)" 
                    ></textarea>
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Category Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files ? e.target.files[0] : null;
                            console.log("Selected file:", file);
                            setData('image', file);
                            setPreview(file ? URL.createObjectURL(file) : null);
                        }}
                        className="mt-1 block w-full text-sm text-gray-700"
                    />
                    {errors.image && (
                        <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                    )}

                    {/* Preview */}
                    {preview && <img src={preview} alt="Preview" className="mt-3 border" />}
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition ${
                            processing ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {processing ? 'Creating...' : 'Create'}
                    </button>
                    <a
                        href="/categories"
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    >
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    );
};

CategoryForm.layout = (page) => (
    <AdminLayout
        active_keys={['/admin/configurations/categories']}
        active_selected_keys={['/admin/configurations']}
    >
        {page}
    </AdminLayout>
);

export default CategoryForm;
