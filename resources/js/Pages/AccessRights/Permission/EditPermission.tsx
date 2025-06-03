import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useState } from "react";

interface Permission {
    id: number;
    name: string;
    slug: string;
    description?: string;
    active: boolean;
}

interface EditPermissionProps extends PageProps {
    permission: Permission;
}

export default function EditPermission({
    auth,
    permission,
}: EditPermissionProps) {
    const [formData, setFormData] = useState({
        name: permission.name,
        slug: permission.slug,
        description: permission.description || "",
        active: permission.active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/permissions/${permission.id}`, formData, {
            onSuccess: () => {
                router.visit(route("permissions.index"));
            },
            onError: (errors) => {
                alert(
                    `Error updating permission: ${Object.values(errors).join("\n")}`,
                );
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Permission
                    </h2>
                    <Link
                        href={route("permissions.index")}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Back to Permissions
                    </Link>
                </div>
            }
        >
            <Head title={`Edit ${permission.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 max-w-2xl"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name*
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Slug* (system identifier)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={formData.slug}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                slug: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                    />
                                </div>

                                <div className="flex items-center">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            checked={formData.active}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    active: e.target.checked,
                                                })
                                            }
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Active
                                        </span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route("permissions.index")}
                                        className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Update Permission
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
