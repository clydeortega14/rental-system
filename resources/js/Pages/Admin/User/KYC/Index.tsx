import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Swal from 'sweetalert2';
import { PageProps, PageWithAdminLayout } from '@/types';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  kyc?: {
    kyc_status: 'Pending' | 'Approved' | 'Rejected';
    kyc_verified: boolean;
    document_path: string;
    selfie_path: string;
    document_number: string;
    document_type: string;
  };
}

type Props = PageProps & {
  users: {
    data: User[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
};

const getKycColor = (status?: string) => {
  switch (status?.toLowerCase()) {
    case 'approved': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const KycUserList: PageWithAdminLayout = () => {
  const { users } = usePage<Props>().props;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const handleStatusChange = (userId: number, status: 'approved' | 'rejected') => {
    router.post(route('admin.user.kyc.update', userId), { status }, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: `User KYC ${status === 'approved' ? 'Approved' : 'Rejected'}`,
          toast: true,
          timer: 2000,
          position: 'top-end',
          showConfirmButton: false
        });
      },
      onError: () => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to update KYC status',
          toast: true,
          timer: 2000,
          position: 'top-end',
          showConfirmButton: false
        });
      }
    });
  };

  // Group users by KYC status
  const groupedUsers = {
    pending: users.data.filter(u => u.kyc?.kyc_status?.toLowerCase() === 'pending'),
    approved: users.data.filter(u => u.kyc?.kyc_status?.toLowerCase() === 'approved'),
    rejected: users.data.filter(u => u.kyc?.kyc_status?.toLowerCase() === 'rejected'),
  };

  const renderTable = (usersList: User[]) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">Image</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">KYC Status</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usersList.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            usersList.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img
                    src={user.avatar ? `/storage/${user.avatar}` : '/img/defaultImage.png'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getKycColor(user.kyc?.kyc_status)}`}
                  >
                    {(user.kyc?.kyc_status || 'N/A').toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setModalVisible(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition"
                    aria-label={`View details of ${user.name}`}
                  >
                    <Eye size={16} />
                    View
                  </button>

                  {user.kyc?.kyc_status?.toLowerCase() === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(user.id, 'approved')}
                        className="inline-flex items-center gap-1 px-3 py-1 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
                        aria-label={`Approve KYC for ${user.name}`}
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>

                      <button
                        onClick={() => handleStatusChange(user.id, 'rejected')}
                        className="inline-flex items-center gap-1 px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
                        aria-label={`Reject KYC for ${user.name}`}
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6 p-4 max-w-8xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">KYC Users</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-300">
        {(['pending', 'approved', 'rejected'] as const).map(status => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`py-2 px-4 font-semibold border-b-2 ${
              activeTab === status
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-indigo-600'
            } transition`}
            aria-current={activeTab === status ? 'page' : undefined}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table for active tab */}
      {activeTab === 'pending' && renderTable(groupedUsers.pending)}
      {activeTab === 'approved' && renderTable(groupedUsers.approved)}
      {activeTab === 'rejected' && renderTable(groupedUsers.rejected)}

      {/* Modal */}
      {modalVisible && selectedUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setModalVisible(false)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
            onClick={e => e.stopPropagation()}
          >
            {/* Left: User info */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 font-medium">Full Name</p>
                <p className="text-lg font-semibold">{selectedUser.name}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Email</p>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">ID Type</p>
                <p>{selectedUser.kyc?.document_type || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">ID Number</p>
                <p>{selectedUser.kyc?.document_number || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">KYC Status</p>
                <span
                  className={`inline-block px-2 py-1 text-sm font-semibold rounded ${getKycColor(selectedUser.kyc?.kyc_status)}`}
                >
                  {selectedUser.kyc?.kyc_status || 'N/A'}
                </span>
              </div>
            </div>

            {/* Right: Images */}
            <div className="flex flex-col gap-6">
              {selectedUser.kyc?.selfie_path && (
                <div>
                  <p className="text-gray-500 font-medium mb-1">Selfie with ID</p>
                  <img
                    src={`/storage/${selectedUser.kyc.selfie_path}`}
                    alt="Selfie with ID"
                    className="w-full h-48 object-cover rounded border shadow"
                  />
                </div>
              )}

              {selectedUser.kyc?.document_path && (
                <div>
                  <p className="text-gray-500 font-medium mb-1">Identification Card</p>
                  <img
                    src={`/storage/${selectedUser.kyc.document_path}`}
                    alt="Identification Card"
                    className="w-full h-48 object-contain rounded border shadow"
                  />
                </div>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={() => setModalVisible(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

KycUserList.layout = (page: React.ReactNode) => (
  <AdminLayout active_keys={['/admin/users/kyc/list']} active_selected_keys={['/admin/users']}>
    {page}
  </AdminLayout>
);

export default KycUserList;
