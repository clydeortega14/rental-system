import { useForm } from '@inertiajs/react';
import { Form, Input, Button, Space, Card, Typography, Select, Tag, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { PageWithAdminLayout } from '@/types';

import AdminLayoutAntD from '../../../../../../../js/Layouts/AdminLayoutAntD';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

interface CategoryFormProps {
    category?: {
        id: number;
        name: string;
        description?: string;
        tags?: number[];
    };
    tags: Array<{ value: number; label: string }>;
}

const CategoryForm: PageWithAdminLayout = () => {
    const { data, setData, post, put, processing, errors } = useForm({
        name: '',
        description: '',
        tags: [],
    });

    const onFinish = () => {
       /*  if (category) {
            put(`/categories/${category.id}`, {
                onSuccess: () => message.success('Category updated successfully!'),
                onError: () => message.error('Failed to update category'),
            });
        } else {
            post('/categories', {
                onSuccess: () => message.success('Category created successfully!'),
                onError: () => message.error('Failed to create category'),
            });
        } */
    };

    const tagRender = (props: any) => {
        const { label, closable, onClose } = props;
        return (
            <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
                {label}
            </Tag>
        );
    };

    return (
        <Card>
            <Title level={4} className="mb-6">
                Create New Category
            </Title>
            <Form
                layout="vertical"
                initialValues={data}
                onFinish={onFinish}
                onValuesChange={(changedValues) => setData({ ...data, ...changedValues })}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    validateStatus={errors.name ? 'error' : ''}
                    help={errors.name}
                    rules={[{ required: true, message: 'Please input the category name!' }]}
                >
                    <Input placeholder="Enter category name" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    validateStatus={errors.description ? 'error' : ''}
                    help={errors.description}
                >
                    <TextArea rows={4} placeholder="Enter category description (optional)" />
                </Form.Item>

                {/* <Form.Item
                    label="Tags"
                    name="tags"
                    validateStatus={errors.tags ? 'error' : ''}
                    help={errors.tags}
                >
                    <Select
                        mode="multiple"
                        showArrow
                        tagRender={tagRender}
                        style={{ width: '100%' }}
                        options={tags}
                        placeholder="Select tags"
                        onChange={(value) => setData('tags', value)}
                    />
                </Form.Item> */}

                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={processing}
                            icon={processing ? <LoadingOutlined /> : null}
                        >
                            Create
                        </Button>
                        <Button href="/categories" type="default">
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    );
}

CategoryForm.layout = (page) => (
    <AdminLayoutAntD
        active_keys={['/admin/configurations/categories']}
        active_selected_keys={['/admin/configurations']}
    >
        {page}
    </AdminLayoutAntD>
);
export default CategoryForm;
