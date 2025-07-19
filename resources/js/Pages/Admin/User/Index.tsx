import React, { useState } from 'react';
import { Table, Input, Button, Card, Tag } from 'antd';
import { usePage, router } from '@inertiajs/react';
import type { ColumnsType } from 'antd/es/table';
import { PageWithAdminLayout, PageProps } from '@/types';
import AdminLayoutAntD from '@/Layouts/AdminLayoutAntD';

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
  kyc?: {
    kyc_status?: string;
    kyc_verified?: boolean;
  };
  contact?: {
    mobile?: string;
    telephone?: string;
  };
  company?: {
    name?: string;
    email?: string;
    business_address?: string;
  };
}

type Props = PageProps & {
  users: {
    data: User[];
    meta: {
      total: number;
      current_page: number;
      per_page: number;
    };
    links: any;
  };
  filters?: {
    search?: string;
  };
};

const getKycColor = (status: string) => {
  switch (status) {
    case 'Approve': return 'green';
    case 'Pending': return 'orange';
    case 'Rejected': return 'red';
    default: return 'gray';
  }
};

const UserList: PageWithAdminLayout = () => {
  const { users, filters } = usePage<Props>().props;
  const [search, setSearch] = useState(filters?.search ?? '');

  const handleSearch = (value: string) => {
    router.get(route('admin.users.index'), { search: value }, { preserveState: true });
  };

  const handleTableChange = (pagination: any) => {
    router.get(route('admin.users.index'), {
      page: pagination.current,
      search: search,
    }, { preserveState: true });
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Image',
      key: 'image',
      render: (_, record) => (
        <img
          src={record.photo ? `/storage/${record.photo}` : 'img/defaultImage.png'}
          alt="user"
          className="w-12 h-12 rounded-full object-cover"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'KYC Status',
      key: 'kyc_status',
      render: (_, record) => {
        const status = record.kyc?.kyc_status ?? 'N/A';
        return <Tag color={getKycColor(status)}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <div>
          <p><strong>Mobile:</strong> {record.contact?.mobile ?? 'N/A'}</p>
          <p><strong>Telephone:</strong> {record.contact?.telephone ?? 'N/A'}</p>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link">
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">User List</h1>

      <Card>
        <Input.Search
          placeholder="Search by name or email"
          allowClear
          value={search}
          onSearch={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={users?.data}
          rowKey="id"
          pagination={{
            total: users?.meta?.total || 0,
            current: users?.meta?.current_page || 1,
            pageSize: users?.meta?.per_page || 10,
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

UserList.layout = (page: React.ReactNode) => (
  <AdminLayoutAntD
    active_keys={['/admin/users/index']}
    active_selected_keys={['/admin/users']}
  >
    {page}
  </AdminLayoutAntD>
);

export default UserList;
    