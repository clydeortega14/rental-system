import React, { useState, useMemo } from 'react';
import { Eye, MessageSquare, CheckCircle  } from 'lucide-react';
import { Table, Input, Tag, Modal, Button } from 'antd';
import { usePage, Link,router } from '@inertiajs/react';
import { format } from 'date-fns';
import AdminLayoutAntD from '../../../../../js/Layouts/AdminLayoutAntD';
import type { ColumnsType } from 'antd/es/table';
import { PageWithAdminLayout, PageProps } from '@/types';
import logoMobile from '@/../../resources/img/defaultImage.png';
import front from '@/../../resources/img/ids/front.png';
import back from '@/../../resources/img/ids/back.png';
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
  const [loading, setLoading] = useState(false); // loading state

  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [approvingId, setApprovingId] = useState<number | null>(null);

  // Add activeTab state: 'pending' | 'approved' | 'cancelled'
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'cancelled'>('pending');

  const showModalWithLoading = (app: Application) => {
    setSelectedApp(app);
    setModalVisible(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // simulate loading
  };

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

  const handleApprove = (uuid: number) => {
    
    setApprovingId(uuid);
    setApproveModalVisible(true);
  };

 

  const columns: ColumnsType<Application> = [
    {
      title: 'Name of Applicant',
      dataIndex: ['user', 'name'],
      key: 'name',
    },
    {
      title: 'Contact Number',
      key: 'contact',
      render: (_, record) => {
        const mobile = record.user?.contact?.mobile;
        const telephone = record.user?.contact?.telephone;
        return mobile || telephone || 'N/A';
      },
    },
    {
      title: 'Company',
      dataIndex: ['user', 'company', 'name'],
      key: 'company',
      render: (name: string) => name ?? 'N/A',
    },
    {
      title: 'Date Submitted',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (d: string) => format(new Date(d), 'PPP'),
    },
    {
      title: 'Status',
      dataIndex: ['status', 'name'],
      key: 'status',
      render: (s: string) => {
        const color =
          s === 'approved' ? 'green' : s === 'pending' ? 'orange' : 'red';
        return <Tag color={color}>{s?.toUpperCase() ?? 'UNKNOWN'}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            onClick={() => showModalWithLoading(record)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-brandYellow transition"
          >
            <Eye className="w-4 h-4" />
            View
          </Button>

          {record.status?.name !== 'approved' && ( // or check record.status_id !== 2
            <Button
              onClick={() => handleApprove(record.user_uuid)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </Button>
          )}
          
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
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

      <Input.Search
        placeholder="Search by applicant or company"
        allowClear
        onChange={e => setSearchTerm(e.target.value)}
        style={{ maxWidth: 400 }}
      />

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* Modal for View Details */}
        <Modal
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={
            <Button
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-brandYellow transition"
                onClick={() => {
                if (selectedApp) showModalWithLoading(selectedApp);
                }}
            >
                Reload
            </Button>
            }
            width="75%" // <-- Make modal large
        >
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : (
         selectedApp && (
            <div className="space-y-6 text-sm">
                {/* Lessor Details */}
                <h2 className="text-lg font-semibold text-gray-700">Lessor Details</h2>
                <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row items-center gap-4">
                    <img
                    src={logoMobile}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                    <p><strong>Name:</strong> {selectedApp.user?.name ?? 'N/A'}</p>
                    <p>
                        <strong>Status:</strong>{' '}
                        <Tag
                        color={
                            selectedApp.status?.name === 'approved'
                            ? 'green'
                            : selectedApp.status?.name === 'pending'
                            ? 'orange'
                            : 'red'
                        }
                        >
                        {selectedApp.status?.name?.toUpperCase() ?? 'UNKNOWN'}
                        </Tag>
                    </p>
                    <p><strong>Submitted At:</strong> {format(new Date(selectedApp.created_at), 'PPP')}</p>
                    </div>
                </div>

                {/* Company Details */}
                <h2 className="text-lg font-semibold text-gray-700">Company Details</h2>
                <div className="bg-white p-4 rounded-lg shadow space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-8 gap-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedApp.user?.company?.name ?? 'N/A'}</p>
                    <p><strong>TIN:</strong> {selectedApp.user?.company?.tin ?? 'N/A'}</p>
                    <p><strong>Email:</strong> {selectedApp.user?.company?.email ?? 'N/A'}</p>
                    <p><strong>Business Type:</strong> {selectedApp.user?.company?.business_type ?? 'N/A'}</p>
                    <p><strong>Business Registration No.:</strong> {selectedApp.user?.company?.business_reg_number ?? 'N/A'}</p>
                    <p><strong>Address:</strong> {selectedApp.user?.company?.business_address ?? 'N/A'}</p>
                    <p><strong>Street:</strong> {selectedApp.user?.company?.street ?? 'N/A'}</p>
                    <p><strong>Postal Code:</strong> {selectedApp.user?.company?.postal_code ?? 'N/A'}</p>
                    <p><strong>Region:</strong> {selectedApp.user?.company?.region ?? 'N/A'}</p>
                    <p><strong>Province:</strong> {selectedApp.user?.company?.province ?? 'N/A'}</p>
                    <p><strong>City:</strong> {selectedApp.user?.company?.city ?? 'N/A'}</p>
                    <p><strong>Barangay:</strong> {selectedApp.user?.company?.barangay ?? 'N/A'}</p>
                    <p><strong>Country:</strong> {selectedApp.user?.company?.country ?? 'N/A'}</p>
                    <p><strong>Registered At:</strong> {format(new Date(selectedApp.user?.company?.created_at ?? ''), 'PPP')}</p>
                    </div>
                </div>
                
                {/* Contact Details */}
                <h2 className="text-lg font-semibold text-gray-700">Contact Details</h2>
                <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                        <p><strong>Mobile:</strong> {selectedApp.user?.contact?.mobile ?? 'N/A'}</p>
                        <p><strong>Telephone:</strong> {selectedApp.user?.contact?.telephone ?? 'N/A'}</p>
                    </div>
                </div>
                
              {/* Business Documents */}
              <h2 className="text-lg font-semibold text-gray-700">Business Documents</h2>
              <div className="bg-white p-4 rounded-lg shadow space-y-4">
                {selectedApp.user?.company?.documents?.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {selectedApp.user.company.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg shadow-sm  p-4 flex flex-col items-center"
                      >
                        <div className="w-full text-center mb-2">
                          <p className="text-sm font-semibold text-gray-800 mb-1">
                            {doc.document_name}
                          </p>
                        </div>

                        <div className="w-full">
                          <a
                            href={`/storage/${doc.file_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={`/storage/${doc.file_path}`}
                              alt={doc.document_name}
                              className="w-full h-48 object-contain rounded border hover:scale-105 transition-transform duration-200"
                            />
                          </a>
                        </div>

                        <p className="mt-2 text-xs text-gray-500 break-words">
                          {doc.file_name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No business documents uploaded.</p>
                )}
              </div>
        </div>
                
         )
        )}
        </Modal>
      {/* Modal for Approve Application */}
      <Modal
        open={approveModalVisible}
        title={
          <span className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-amber-500" />
            Approve Application
          </span>
        }
        onCancel={() => {
          setApproveModalVisible(false);
          setApprovingId(null);
        }}
        onOk={() => {
          if (approvingId) {
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
              },
            });
          }
        }}
        okText="Yes, Approved"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            backgroundColor: '#f59e0b',
            borderColor: '#f59e0b',
            color: 'white',
          },
        }}
      >
        <p>Are you sure you want to approve this application?</p>
      </Modal>
    </div>
  );
};

ApplicationsIndex.layout = (page: React.ReactNode) => (
  <AdminLayoutAntD
    active_keys={['/admin/users/index']}
    active_selected_keys={['/admin/users']}
  >
    {page}
  </AdminLayoutAntD>
);

export default ApplicationsIndex;
