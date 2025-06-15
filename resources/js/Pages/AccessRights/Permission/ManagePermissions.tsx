import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useState } from "react";

interface Permission {
    id: number;
    name: string;
    slug: string;
    description?: string;
    active?: boolean;
}

interface ManagePermissionsProps extends PageProps {
    permissions: Permission[];
}

export default function ManagePermissions({
    auth,
    permissions,
}: ManagePermissionsProps) {
    const [newPermission, setNewPermission] = useState({
        name: "",
        slug: "",
        description: "",
        active: true,
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        router.post("/permissions", newPermission, {
            onSuccess: () =>
                setNewPermission({
                    name: "",
                    slug: "",
                    description: "",
                    active: true,
                }),
            onError: (errors) => {
                alert(
                    `Error creating permission: ${Object.values(errors).join("\n")}`,
                );
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this permission?")) {
            router.delete(`/permissions/${id}`, {
                preserveScroll: true,
                onError: () => alert("Failed to delete permission"),
            });
        }
    };

    const toggleStatus = (permission: Permission) => {
        router.patch(
            `/permissions/${permission.id}/toggle`,
            {
                active: !permission.active,
            },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Permission Management
                    </h2>
                    <Link
                        href={route("access-rights.index")}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Back to Access Rights
                    </Link>
                </div>
            }
        >
            <Head title="Manage Permissions" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Create Permission Form */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium mb-4">
                                    Create New Permission
                                </h3>
                                <form
                                    onSubmit={handleCreate}
                                    className="space-y-4 max-w-lg"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name*
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            value={newPermission.name}
                                            onChange={(e) =>
                                                setNewPermission({
                                                    ...newPermission,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                            placeholder="e.g., Create Users"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Slug* (system identifier)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            value={newPermission.slug}
                                            onChange={(e) =>
                                                setNewPermission({
                                                    ...newPermission,
                                                    slug: e.target.value,
                                                })
                                            }
                                            required
                                            placeholder="e.g., create-users"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            value={newPermission.description}
                                            onChange={(e) =>
                                                setNewPermission({
                                                    ...newPermission,
                                                    description: e.target.value,
                                                })
                                            }
                                            rows={2}
                                            placeholder="Optional description"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Create Permission
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Permissions List */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">
                                        System Permissions
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {permissions.length} permission(s)
                                    </span>
                                </div>

                                {permissions.length === 0 ? (
                                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                                        <p className="text-gray-500">
                                            No permissions found in the system.
                                        </p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Create your first permission using
                                            the form above
                                        </p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Slug
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {permissions.map(
                                                    (permission) => (
                                                        <tr key={permission.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="font-medium">
                                                                    {
                                                                        permission.name
                                                                    }
                                                                </div>
                                                                {permission.description && (
                                                                    <div className="text-sm text-gray-500 mt-1">
                                                                        {
                                                                            permission.description
                                                                        }
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-800">
                                                                    {
                                                                        permission.slug
                                                                    }
                                                                </code>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span
                                                                    onClick={() =>
                                                                        toggleStatus(
                                                                            permission,
                                                                        )
                                                                    }
                                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${permission.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                                                >
                                                                    {permission.active
                                                                        ? "Active"
                                                                        : "Inactive"}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <Link
                                                                    href={route(
                                                                        "permissions.edit",
                                                                        permission.id,
                                                                    )}
                                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            permission.id,
                                                                        )
                                                                    }
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
