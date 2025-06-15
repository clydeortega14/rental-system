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
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedUserRoles, setSelectedUserRoles] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [assignLoading, setAssignLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userPermissions, setUserPermissions] = useState<string[]>([]);

    useEffect(() => {
        fetch("/access-rights/my-permissions")
            .then((res) => (res.ok ? res.json() : []))
            .then(setUserPermissions);
    }, []);

    const canOpenButton1 = userPermissions.includes("can-open-button-1");
    const canOpenButton2 = userPermissions.includes("can-open-button-2");

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

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = Number(e.target.value);
        setSelectedUserId(userId);
        const user = users.find((u) => u.id === userId);
        setSelectedUserRoles(user?.roles ? user.roles.map((r) => r.id) : []);
    };

    const handleRoleChange = (roleId: number) => {
        setSelectedUserRoles((prev) =>
            prev.includes(roleId)
                ? prev.filter((id) => id !== roleId)
                : [...prev, roleId],
        );
    };

    const handleAssignRoles = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUserId) return;
        setAssignLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `/access-rights/users/${selectedUserId}/roles`,
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
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setAssignLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage User Roles
                </h2>
            }
        >
            <Head title="Manage User Roles" />
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
                            onSubmit={handleAssignRoles}
                            className="space-y-4 max-w-lg"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select User
                                </label>
                                <select
                                    value={selectedUserId ?? ""}
                                    onChange={handleUserChange}
                                    className="w-full rounded border-gray-300"
                                    required
                                >
                                    <option value="" disabled>
                                        -- Select a user --
                                    </option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedUserId && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Assign Roles
                                    </label>
                                    <div className="flex flex-col gap-2">
                                        {roles.map((role) => (
                                            <label
                                                key={role.id}
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
                                                <span>{role.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                disabled={assignLoading || !selectedUserId}
                            >
                                {assignLoading
                                    ? "Assigning..."
                                    : "Assign Roles"}
                            </button>
                        </form>
                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-2">
                                User Roles Overview
                            </h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Roles
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <button
                                className={`px-4 py-2 rounded ${canOpenButton1 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-500"}`}
                                disabled={!canOpenButton1}
                            >
                                Button 1 (requires can-open-button-1)
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${canOpenButton2 ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"}`}
                                disabled={!canOpenButton2}
                            >
                                Button 2 (requires can-open-button-2)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ManageUserTest;
