import React, { useState } from 'react';
import { Table, Input, Button, Card } from 'antd';
import { usePage, router } from '@inertiajs/react';
import type { ColumnsType } from 'antd/es/table';
import { PageWithAdminLayout, PageProps } from '@/types';
import AdminLayoutAntD from '../../../../../js/Layouts/AdminLayoutAntD';

interface Lessor {
  id: number;
  approved_at: string;
  user: {
    name: string;
    photo?: string;
    contact?: {
      mobile?: string;
      telephone?: string;
    };
    company?: {
      name?: string;
      email?: string;
      business_address?: string;
    };
  };
}

type Props = PageProps & {
  lessors: {
    data: Lessor[];
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

const LessorList: PageWithAdminLayout = () => {
  const { lessors, filters } = usePage<Props>().props;
  const [search, setSearch] = useState(filters?.search ?? '');

  const handleSearch = (value: string) => {
    router.get(route('admin.lessors.index'), { search: value }, { preserveState: true });
  };

  const handleTableChange = (pagination: any) => {
    router.get(route('admin.lessors.index'), {
      page: pagination.current,
      search: search,
    }, { preserveState: true });
  };

  const columns: ColumnsType<Lessor> = [
    {
      title: 'Image',
      key: 'image',
      render: (_, record) => (
        <img
          src={record.user?.photo ? `/storage/${record.user.photo}` : 'img/defaultImage.png'}
          alt="user"
          className="w-12 h-12 rounded-full object-cover"
        />
      ),
    },
    {
      title: 'Lessor Name',
      dataIndex: ['user', 'name'],
      key: 'name',
    },
    {
      title: 'Company Name',
      key: 'company_name',
      render: (_, record) => (
        <span>{record.user.company?.name ?? 'N/A'}</span>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => {
        const contact = record.user.contact;
        return (
          <div>
            <p><strong>Mobile:</strong> {contact?.mobile ?? 'N/A'}</p>
            <p><strong>Telephone:</strong> {contact?.telephone ?? 'N/A'}</p>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Lessor List</h1>

      <Card>
        <Input.Search
          placeholder="Search by name or company"
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
          dataSource={lessors.data}
          rowKey="id"
          pagination={{
            total: lessors.meta?.total || 0,
            current: lessors.meta?.current_page || 1,
            pageSize: lessors.meta?.per_page || 10,
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

LessorList.layout = (page: React.ReactNode) => (
  <AdminLayoutAntD
    active_keys={['/admin/lessors/index']}
    active_selected_keys={['/admin/lessors']}
  >
    {page}
  </AdminLayoutAntD>
);

export default LessorList;
