import React, { useState } from 'react';
import { Table, Tag, Button, Modal, Tabs } from 'antd';
import { usePage, router } from '@inertiajs/react';
import type { ColumnsType } from 'antd/es/table';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import AdminLayoutAntD from '@/Layouts/AdminLayoutAntD';
import Swal from 'sweetalert2';
import { PageProps, PageWithAdminLayout } from '@/types';

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
    case 'approved': return 'green';
    case 'pending': return 'orange';
    case 'rejected': return 'red';
    default: return 'gray';
  }
};

const KycUserList: PageWithAdminLayout = () => {
  const { users } = usePage<Props>().props;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const columns: ColumnsType<User> = [
    {
      title: 'Image',
      key: 'image',
      render: (_, record) => (
        <img
          src={record.avatar ? `/storage/${record.avatar}` : '/img/defaultImage.png'}
          alt="user"
          className="w-10 h-10 rounded-full object-cover"
        />
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'KYC Status',
      key: 'kyc_status',
      render: (_, record) => (
        <Tag color={getKycColor(record.kyc?.kyc_status)}>
          {record.kyc?.kyc_status?.toUpperCase() || 'N/A'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<Eye size={16} />}
            className="text-black flex items-center gap-1"
            onClick={() => {
              setSelectedUser(record);
              setModalVisible(true);
            }}
          >
            View
          </Button>
          {record.kyc?.kyc_status?.toLowerCase() === 'pending' && (
            <>
              <Button
                type='primary'
                icon={<CheckCircle size={16} />}
                className="text-black flex items-center gap-1"
                onClick={() => handleStatusChange(record.id, 'approved')}
              >
                Approve
              </Button>
              <Button
                type='primary'
                danger
                icon={<XCircle size={16} />}
                className="flex items-center gap-1"
                onClick={() => handleStatusChange(record.id, 'rejected')}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  // Filter users by status
  const groupedUsers = {
    pending: users.data.filter(user => user.kyc?.kyc_status?.toLowerCase() === 'pending'),
    approved: users.data.filter(user => user.kyc?.kyc_status?.toLowerCase() === 'approved'),
    rejected: users.data.filter(user => user.kyc?.kyc_status?.toLowerCase() === 'rejected'),
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">KYC Users</h1>

      <Tabs
        defaultActiveKey="pending"
        items={[
          {
            key: 'pending',
            label: 'Pending',
            children: (
              <Table
                columns={columns}
                dataSource={groupedUsers.pending}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            ),
          },
          {
            key: 'approved',
            label: 'Approved',
            children: (
              <Table
                columns={columns}
                dataSource={groupedUsers.approved}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            ),
          },
          {
            key: 'rejected',
            label: 'Rejected',
            children: (
              <Table
                columns={columns}
                dataSource={groupedUsers.rejected}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            ),
          },
        ]}
      />

      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        title="KYC Verification Details"
        width={700}
      >
        {selectedUser && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Left: User Info */}
            <div className="space-y-2">
              <div>
                <p className="text-gray-500 font-medium">Full Name</p>
                <p className="text-base">{selectedUser.name}</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Email</p>
                <p className="text-base">{selectedUser.email}</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">ID Type</p>
                <p className="text-base">{selectedUser.kyc?.document_type}</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">ID Number</p>
                <p className="text-base">{selectedUser.kyc?.document_number}</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">KYC Status</p>
                <Tag color={getKycColor(selectedUser.kyc?.kyc_status)}>
                  {selectedUser.kyc?.kyc_status || 'N/A'}
                </Tag>
              </div>
            </div>

            {/* Right: Images */}
            <div className="flex flex-col gap-4">
              {selectedUser.kyc?.selfie_path && (
                <div>
                  <p className="text-gray-500 font-medium mb-1">Selfie with ID</p>
                  <img
                    src={`/storage/${selectedUser.kyc.selfie_path}`}
                    alt="Selfie"
                    className="w-full h-48 object-cover rounded shadow border"
                  />
                </div>
              )}

              {selectedUser.kyc?.document_path && (
                <div>
                  <p className="text-gray-500 font-medium mb-1">Identification Card</p>
                  <img
                    src={`/storage/${selectedUser.kyc.document_path}`}
                    alt="Document"
                    className="w-full h-48 object-contain rounded shadow border"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

KycUserList.layout = (page: React.ReactNode) => (
  <AdminLayoutAntD
    active_keys={['/admin/users/kyc/list']}
    active_selected_keys={['/admin/users']}
  >
    {page}
  </AdminLayoutAntD>
);

export default KycUserList;
