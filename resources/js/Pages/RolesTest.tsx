import React, { ReactNode, useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";

interface Role {
    id: number;
    name: string;
    slug: string;
    description?: string;
    active: boolean;
    permissions?: {
        name: ReactNode;
        id: number;
    }[];
}

interface Permission {
    description: any;
    id: number;
    name: string;
    slug: string;
}

const RolesTest: React.FC<PageProps> = ({ auth }) => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        active: true,
        permissions: [] as number[],
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [permissions, setPermissions] = useState<Permission[]>([]);

    useEffect(() => {
        fetchRoles();
        fetchPermissions();
    }, []);

    const fetchRoles = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/access-rights/roles");
            if (!response.ok) throw new Error("Failed to fetch roles");
            const data = await response.json();
            setRoles(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const url = editingId
                ? `/access-rights/roles/${editingId}`
                : "/access-rights/roles";
            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save role");
            }

            await fetchRoles();
            resetForm();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (role: Role) => {
        setEditingId(role.id);
        setForm({
            name: role.name,
            slug: role.slug,
            description: role.description || "",
            active: role.active,
            permissions: role.permissions
                ? role.permissions.map((p: any) => p.id)
                : [],
        });
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this role?"))
            return;

        setIsLoading(true);
        try {
            const response = await fetch(`/access-rights/roles/${id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                            "Accept": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to delete role");

            await fetchRoles();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setForm({
            name: "",
            slug: "",
            description: "",
            active: true,
            permissions: [] as number[],
        });
        setEditingId(null);
    };

    //Permissions
    const fetchPermissions = async () => {
        const response = await fetch("/access-rights/permissions/all");
        if (response.ok) {
            setPermissions(await response.json());
        }
    };

    const handlePermissionChange = (id: number) => {
        setForm((prev) => ({
            ...prev,
            permissions: prev.permissions.includes(id)
                ? prev.permissions.filter((pid) => pid !== id)
                : [...prev.permissions, id],
        }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Roles Test
                </h2>
            }
        >
            <Head title="Roles Test" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {error && (
                            <div
                                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                                role="alert"
                            >
                                <p>{error}</p>
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mb-8 space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name*
                                </label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Admin"
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Administrator role with full access"
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    rows={3}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={form.active}
                                    onChange={handleChange}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    disabled={isLoading}
                                    title="Active"
                                    placeholder="Active"
                                />
                                <label className="ml-2 text-sm text-gray-600">
                                    Active
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Permissions
                                </label>
                                <div className="flex flex-col gap-2">
                                    {permissions.map((perm) => (
                                        <label
                                            key={perm.id}
                                            className="flex items-start space-x-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={form.permissions.includes(
                                                    perm.id,
                                                )}
                                                onChange={() =>
                                                    handlePermissionChange(
                                                        perm.id,
                                                    )
                                                }
                                                className="mt-1"
                                            />
                                            <div>
                                                <span className="font-medium">
                                                    {perm.name}
                                                </span>
                                                {perm.description && (
                                                    <div className="text-xs text-gray-500">
                                                        {perm.description}
                                                    </div>
                                                )}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Processing..."
                                        : editingId
                                          ? "Update Role"
                                          : "Create Role"}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

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
                                            Permissions
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
                                    {isLoading && roles.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-6 py-4 text-center"
                                            >
                                                Loading roles...
                                            </td>
                                        </tr>
                                    ) : roles.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-6 py-4 text-center"
                                            >
                                                No roles found
                                            </td>
                                        </tr>
                                    ) : (
                                        roles.map((role) => (
                                            <tr key={role.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium">
                                                        {role.name}
                                                    </div>
                                                    {role.description && (
                                                        <div className="text-sm text-gray-500">
                                                            {role.description}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                        {role.slug}
                                                    </code>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {role.permissions &&
                                                    role.permissions.length >
                                                        0 ? (
                                                        <ul className="list-disc list-inside space-y-1">
                                                            {role.permissions.map(
                                                                (perm) => (
                                                                    <li
                                                                        key={
                                                                            perm.id
                                                                        }
                                                                        className="text-xs text-gray-700"
                                                                    >
                                                                        {
                                                                            perm.name
                                                                        }
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">
                                                            None
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${role.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                                    >
                                                        {role.active
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(role)
                                                        }
                                                        className="text-blue-600 hover:text-blue-900 mr-3 disabled:opacity-50"
                                                        disabled={isLoading}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                role.id,
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                        disabled={isLoading}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default RolesTest;
