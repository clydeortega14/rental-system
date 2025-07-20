import { Head, Link, usePage } from '@inertiajs/react';
import { Table, Space, Button, Card, Typography, Tag, Badge, Input, Dropdown, Menu, Select, DatePicker, Breadcrumb } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SearchOutlined,
    FilterOutlined,
    MoreOutlined,
    SyncOutlined
} from '@ant-design/icons';
import AdminLayoutAntD from '../../../../../js/Layouts/AdminLayoutAntD';
import { useState } from 'react';
import { PageWithAdminLayout } from '@/types';
import type { MenuProps, TableColumnsType } from 'antd';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Category {
    id: number;
    name: string;
    description?: string;
    tags: {
        id: number;
        name: string;
    }[];
}

type PageProps = {
    categories: Category[];
};

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const AdminConfigurationCategoryIndex: PageWithAdminLayout = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const { categories } = usePage<PageProps>().props;
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [tagFilter, setTagFilter] = useState<number[]>([]);
    const [dateRange, setDateRange] = useState<any>(null);



    const data = {
        categories: categories || [],
        total: categories.length,
        current_page: 1,
        per_page: 10,
    }
    // Extract all unique tags for filter dropdown
    const allTags = [{ id: 1, name: 'Tag1' }, { id: 2, name: 'Tag2' }, { id: 3, name: 'Tag3' }];

    const filteredData = data.categories.filter((category: Category) => {
        const matchesSearch = category.name.toLowerCase().includes(searchText.toLowerCase()) ||
            category.description?.toLowerCase().includes(searchText.toLowerCase());
        const matchesTags = tagFilter.length > 0 ?
            category.tags.some(tag => tagFilter.includes(tag.id)) : true;

        return matchesSearch && matchesTags;
    });

    const getActionMenu = (record: Category): MenuProps['items'] => [
        {
            key: 'edit',
            label: (
                <Link href={`/categories/${record.id}/edit`}>Edit</Link>
            ),
            icon: <EditOutlined />,
        },
        /* {
            key: 'delete',
            label: (
                <Link
                    href={`/categories/${record.id}`}
                >
                    Delete
                </Link>
            ),
            icon: <DeleteOutlined />,
            danger: true,
        }, */
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: Category, b: Category) => a.name.localeCompare(b.name),
            render: (text: string, record: Category) => (
                <Space>
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            /* render: (tags: { id: number; name: string }[]) => (
                <Space size={[0, 8]} wrap>
                    {tags.map(tag => (
                        <Tag key={tag.id}>{tag.name}</Tag>
                    ))}
                </Space>
            ), */
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            render: (_: any, record: Category) => (
                <Dropdown menu={{ items: getActionMenu(record) }} trigger={['click']}>
                    <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];


    return (
        <div>
            <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[
                    { title: 'Configurations' },
                    { title: 'Categories' }
                ]} />
            <Card
                title={<Title level={4} style={{ margin: 0 }}>Categories</Title>}
                extra={
                    <Space>
                        <Link href="/admin/configurations/categories/create">
                            <Button type="primary" icon={<PlusOutlined />}
                                style={{
                                    backgroundColor: '#1677ff',
                                    background: '#1677ff',
                                    color: '#fff',
                                }}
                            >
                                Add Category
                            </Button>
                        </Link>
                    </Space>
                }
            >
                <div className="mb-6">
                    <Space size="large" wrap>
                        <Search
                            placeholder="Search categories..."
                            allowClear
                            enterButton={<SearchOutlined />}
                            onSearch={setSearchText}
                            onChange={e => setSearchText(e.target.value)}
                        />

                        {/* <Button
                            icon={<SyncOutlined />}
                            onClick={() => {
                                setSearchText('');
                                setStatusFilter(null);
                                setTagFilter([]);
                                setDateRange(null);
                            }}
                        >
                            Reset
                        </Button> */}
                    </Space>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    pagination={{
                        current: data.current_page,
                        total: data.total,
                        pageSize: data.per_page,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total}`,
                    }}
                    scroll={{ x: true }}
                    bordered
                />
            </Card>
        </div>
    );
}

AdminConfigurationCategoryIndex.layout = (page) => (
    <AdminLayoutAntD
        active_keys={['/admin/configurations/categories', '/admin/configurations/categories/index']}
        active_selected_keys={['/admin/configurations']}
    >
        <Head title="Categories" />
        {page}
    </AdminLayoutAntD>
);
export default AdminConfigurationCategoryIndex;
