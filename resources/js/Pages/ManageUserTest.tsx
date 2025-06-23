import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, User as AppUser } from "@/types";

interface Role {
    id: number;
    name: string;
    slug: string;
}

interface User extends AppUser {
    roles: Role[];
}

const ManageUserTest: React.FC<PageProps> = ({ auth }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [selectedUserRoles, setSelectedUserRoles] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [assignLoading, setAssignLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userPermissions, setUserPermissions] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Add this state

    useEffect(() => {
        fetch("/access-rights/my-permissions")
            .then((res) => (res.ok ? res.json() : []))
            .then(setUserPermissions);
    }, []);

    // Permission checks
    const canManageRoles = userPermissions.includes("can-manage-roles");

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        const response = await fetch("/access-rights/users/all");
        if (response.ok) {
            setUsers(await response.json());
        }
        setIsLoading(false);
    };

    const fetchRoles = async () => {
        const response = await fetch("/access-rights/roles");
        if (response.ok) {
            setRoles(await response.json());
        }
    };

    const handleEditRoles = (user: User) => {
        setEditingUserId(user.id);
        setSelectedUserRoles(user.roles ? user.roles.map((r) => r.id) : []);
    };

    const handleRoleChange = (roleId: number) => {
        setSelectedUserRoles((prev) =>
            prev.includes(roleId)
                ? prev.filter((id) => id !== roleId)
                : [...prev, roleId],
        );
    };

    const handleAssignRoles = async (userId: number) => {
        setAssignLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `/access-rights/users/${userId}/roles`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN":
                            document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content") || "",
                    },
                    body: JSON.stringify({ roles: selectedUserRoles }),
                },
            );
            if (!response.ok) throw new Error("Failed to assign roles");
            await fetchUsers(); // refresh user roles
            setEditingUserId(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setAssignLoading(false);
        }
    };

    // Filtering and Pagination
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()),
    );
    const totalUsers = filteredUsers.length;
    const totalPages = Math.ceil(totalUsers / pageSize);
    const paginatedUsers = filteredUsers.slice(
        (page - 1) * pageSize,
        page * pageSize,
    );

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
    };

    useEffect(() => {
        // Reset to first page if search changes
        setPage(1);
    }, [search]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manage User Roles" />
            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Title and Search Bar inside the card */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                User Roles Management
                            </h2>
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:border-blue-400 min-w-52"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div
                                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                                role="alert"
                            >
                                <p>{error}</p>
                            </div>
                        )}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 mb-8">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Roles
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-4 py-2">
                                                {user.name}{" "}
                                                <span className="text-xs text-gray-400">
                                                    ({user.email})
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {user.roles &&
                                                user.roles.length > 0 ? (
                                                    <ul className="list-disc list-inside space-y-1">
                                                        {user.roles.map(
                                                            (role) => (
                                                                <li
                                                                    key={
                                                                        role.id
                                                                    }
                                                                    className="text-xs text-gray-700"
                                                                >
                                                                    {role.name}
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
                                            <td className="px-4 py-2">
                                                <button
                                                    className={`px-3 py-1 rounded transition ${
                                                        canManageRoles
                                                            ? "bg-blue-500 text-white hover:bg-blue-700"
                                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    }`}
                                                    onClick={() =>
                                                        canManageRoles && handleEditRoles(user)
                                                    }
                                                    disabled={!canManageRoles}
                                                >
                                                    Assign Roles
                                                </button>
                                                {editingUserId === user.id && canManageRoles && (
                                                    <div className="mt-2 bg-gray-50 border rounded shadow p-4 absolute z-10">
                                                        <div className="mb-2 font-semibold text-gray-700">
                                                            Assign Roles to {user.name}
                                                        </div>
                                                        <div className="flex flex-col gap-2 mb-4">
                                                            {roles.map(
                                                                (role) => (
                                                                    <label
                                                                        key={
                                                                            role.id
                                                                        }
                                                                        className="flex items-center space-x-2"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedUserRoles.includes(
                                                                                role.id,
                                                                            )}
                                                                            onChange={() =>
                                                                                handleRoleChange(
                                                                                    role.id,
                                                                                )
                                                                            }
                                                                        />
                                                                        <span>
                                                                            {
                                                                                role.name
                                                                            }
                                                                        </span>
                                                                    </label>
                                                                ),
                                                            )}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                                                onClick={() =>
                                                                    handleAssignRoles(
                                                                        user.id,
                                                                    )
                                                                }
                                                                disabled={
                                                                    assignLoading
                                                                }
                                                            >
                                                                {assignLoading
                                                                    ? "Assigning..."
                                                                    : "Save"}
                                                            </button>
                                                            <button
                                                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                                                                onClick={() =>
                                                                    setEditingUserId(
                                                                        null,
                                                                    )
                                                                }
                                                                type="button"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination and count */}
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                Showing
                                <select
                                    className="mx-1 border border-gray-300 rounded px-4 py-1 text-sm appearance-none custom-select-bg"
                                    value={pageSize}
                                    onChange={e => {
                                        setPageSize(Number(e.target.value));
                                        setPage(1);
                                    }}
                                    title="Select number of users per page"
                                >
                                    {[5, 10, 20, 30].map(size => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                                out of <span className="font-semibold">{filteredUsers.length}</span> users
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                >
                                    &lt; Back
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`px-3 py-1 rounded ${
                                            page === i + 1
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                                        }`}
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                >
                                    Next &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ManageUserTest;
