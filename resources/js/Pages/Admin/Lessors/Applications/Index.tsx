import React, { useState, useMemo } from 'react';
import { Eye, CheckCircle } from 'lucide-react';
import { usePage, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import AdminLayout from '../../../../../js/Layouts/AdminLayout';
import { PageWithAdminLayout, PageProps } from '@/types';
import Swal from 'sweetalert2';

interface Application {
  id: number;
  created_at: string;
  user_uuid: number;
  status?: { name: string };
  user: {
    name: string;
    contact?: {
      mobile?: string;
      telephone?: string;
    };
    company?: {
      name?: string;
      tin?: string;
      email?: string;
      business_type?: string;
      business_reg_number?: string;
      business_address?: string;
      street?: string;
      postal_code?: string;
      region?: string;
      province?: string;
      city?: string;
      barangay?: string;
      country?: string;
      created_at?: string;
      documents?: {
        id: number;
        document_name: string;
        file_name: string;
        file_path: string;
        file_type: string;
        file_size: number;
      }[];
    };
  };
}

type Paginator<T> = {
  data: T[];
  links: any;
  meta: any;
};

type Props = PageProps & {
  applications: Application[] | Paginator<Application>;
};

const ApplicationsIndex: PageWithAdminLayout = () => {
  const { applications } = usePage<Props>().props;

  const appsArray = useMemo<Application[]>(() => {
    if (Array.isArray(applications)) return applications;
    return applications?.data ?? [];
  }, [applications]);

  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [approvingId, setApprovingId] = useState<number | null>(null);

  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'cancelled'>('pending');

  const filtered = appsArray.filter(app => {
    const name = app.user?.name?.toLowerCase() || '';
    const company = app.user?.company?.name?.toLowerCase() || '';
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) || company.includes(searchTerm.toLowerCase());

    const statusName = app.status?.name?.toLowerCase() || '';

    const matchesTab =
      (activeTab === 'pending' && statusName === 'pending') ||
      (activeTab === 'approved' && statusName === 'approved') ||
      (activeTab === 'cancelled' && statusName === 'cancelled');

    return matchesSearch && matchesTab;
  });

  function statusColor(status?: string) {
    if (status === 'approved') return 'bg-green-100 text-green-800';
    if (status === 'pending') return 'bg-orange-100 text-orange-800';
    if (status === 'cancelled') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  }

  const openDetailsModal = (app: Application) => {
    setSelectedApp(app);
    setModalVisible(true);
  };

  const openApproveModal = (uuid: number) => {
    setApprovingId(uuid);
    setApproveModalVisible(true);
  };

  const handleApprove = () => {
    if (!approvingId) return;
    router.get(route('admin.lessors.application.approve', approvingId), {}, {
      onSuccess: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Application Approved.',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
        });
        setApproveModalVisible(false);
        setApprovingId(null);
      },
      onError: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Approval Failed',
          text: 'Something went wrong while approving the application.',
          timer: 3000,
          showConfirmButton: false,
          toast: true,
        });
      }
    });
  };

  return (
    <div className="space-y-6 p-4 max-w-8xl mx-auto">
      <h1 className="text-2xl font-bold">Lessor Applications</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-300 mb-4">
        {['pending', 'approved', 'cancelled'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'pending' | 'approved' | 'cancelled')}
            className={`px-4 py-2 font-semibold rounded-t-md ${
              activeTab === tab
                ? 'border-b-4 border-amber-500 text-amber-600'
                : 'text-gray-500 hover:text-amber-500'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="Search by applicant or company"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 max-w-md"
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name of Applicant</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Contact Number</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Company</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date Submitted</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No applications found.
                </td>
              </tr>
            ) : (
              filtered.map(app => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">{app.user?.name || 'N/A'}</td>
                  <td className="px-6 py-3">
                    {app.user?.contact?.mobile || app.user?.contact?.telephone || 'N/A'}
                  </td>
                  <td className="px-6 py-3">{app.user?.company?.name || 'N/A'}</td>
                  <td className="px-6 py-3">{format(new Date(app.created_at), 'PPP')}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColor(
                        app.status?.name,
                      )}`}
                    >
                      {app.status?.name?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center space-x-2">
                    <button
                      onClick={() => openDetailsModal(app)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>

                    {app.status?.name !== 'approved' && (
                      <button
                        onClick={() => openApproveModal(app.user_uuid)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {modalVisible && selectedApp && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={() => setModalVisible(false)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setModalVisible(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">Lessor Details</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-col sm:flex-row items-center gap-4">
              <img
                src="/img/defaultImage.png"
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1 text-center sm:text-left">
                <p><strong>Name:</strong> {selectedApp.user?.name || 'N/A'}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColor(
                      selectedApp.status?.name,
                    )}`}
                  >
                    {selectedApp.status?.name?.toUpperCase() || 'UNKNOWN'}
                  </span>
                </p>
                <p><strong>Submitted At:</strong> {format(new Date(selectedApp.created_at), 'PPP')}</p>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">Company Details</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 sm:grid-cols-4 gap-x-8 gap-y-2 text-sm">
              <p><strong>Name:</strong> {selectedApp.user?.company?.name || 'N/A'}</p>
              <p><strong>TIN:</strong> {selectedApp.user?.company?.tin || 'N/A'}</p>
              <p><strong>Email:</strong> {selectedApp.user?.company?.email || 'N/A'}</p>
              <p><strong>Business Type:</strong> {selectedApp.user?.company?.business_type || 'N/A'}</p>
              <p><strong>Business Registration No.:</strong> {selectedApp.user?.company?.business_reg_number || 'N/A'}</p>
              <p><strong>Address:</strong> {selectedApp.user?.company?.business_address || 'N/A'}</p>
              <p><strong>Street:</strong> {selectedApp.user?.company?.street || 'N/A'}</p>
              <p><strong>Postal Code:</strong> {selectedApp.user?.company?.postal_code || 'N/A'}</p>
              <p><strong>Region:</strong> {selectedApp.user?.company?.region || 'N/A'}</p>
              <p><strong>Province:</strong> {selectedApp.user?.company?.province || 'N/A'}</p>
              <p><strong>City:</strong> {selectedApp.user?.company?.city || 'N/A'}</p>
              <p><strong>Barangay:</strong> {selectedApp.user?.company?.barangay || 'N/A'}</p>
              <p><strong>Country:</strong> {selectedApp.user?.company?.country || 'N/A'}</p>
              <p><strong>Registered At:</strong> {selectedApp.user?.company?.created_at ? format(new Date(selectedApp.user.company.created_at), 'PPP') : 'N/A'}</p>
            </div>

            <h2 className="text-lg font-semibold mb-4">Contact Details</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 text-center sm:text-left">
                <p><strong>Mobile:</strong> {selectedApp.user?.contact?.mobile || 'N/A'}</p>
                <p><strong>Telephone:</strong> {selectedApp.user?.contact?.telephone || 'N/A'}</p>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">Business Documents</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              {selectedApp.user?.company?.documents && selectedApp.user.company.documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedApp.user.company.documents.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
                      <p className="text-sm font-semibold text-gray-800 mb-2">{doc.document_name}</p>
                      <a href={`/storage/${doc.file_path}`} target="_blank" rel="noopener noreferrer">
                        <img
                          src={`/storage/${doc.file_path}`}
                          alt={doc.document_name}
                          className="w-full h-48 object-contain rounded border hover:scale-105 transition-transform duration-200"
                        />
                      </a>
                      <p className="mt-2 text-xs text-gray-500 break-words">{doc.file_name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No business documents uploaded.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {approveModalVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={() => {
            setApproveModalVisible(false);
            setApprovingId(null);
          }}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => {
                setApproveModalVisible(false);
                setApprovingId(null);
              }}
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold">Approve Application</h3>
            </div>
            <p>Are you sure you want to approve this application?</p>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setApproveModalVisible(false);
                  setApprovingId(null);
                }}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 rounded bg-amber-400 text-white hover:bg-amber-500"
              >
                Yes, Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ApplicationsIndex.layout = (page: React.ReactNode) => (
  <AdminLayout active_keys={['/admin/users/index']} active_selected_keys={['/admin/users']}>
    {page}
  </AdminLayout>
);

export default ApplicationsIndex;
