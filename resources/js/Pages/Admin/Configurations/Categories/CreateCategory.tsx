import React, { useState } from 'react';
import { Head, useForm,router } from '@inertiajs/react';
import AdminLayoutAntD from '@/Layouts/AdminLayoutAntD';
import { SaveOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Space,
  Card,
  Row,
  Col,
} from 'antd';

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const modeOfPayments = [
  "Recurring/Periodic",
  "One-Time Full Payment",
  "Partial/Advance Payment",
  "Overdue Payment with Late Fee",
  "Manual Payment Recording",
];

const pricingDurations = ['Hourly', 'Daily', 'Weekly', 'Monthly'];

const CreateCategory = () => {
    const [form] = Form.useForm();
    type CustomField = {
        label: string;
        type: string;
        options?: string[]; // optional
    };
    
    // const { data, setData, post, processing } = useForm({
    //     name: '',
    //     description: '',
    //     service_fee_value: '',
    //     service_fee_type: 'amount',
    //     mode_of_payment: [], // now an array
    //     pricing_duration: [], // now an array
    //     custom_fields: [{ label: '', type: 'text' }],
    // });
    const { data, setData, post, processing } = useForm<{
    name: string;
    description: string;
    service_fee_value: string;
    service_fee_type: string;
    mode_of_payment: string[];
    pricing_duration: string[];
    custom_fields: CustomField[]; // ← properly typed!
    }>({
    name: '',
    description: '',
    service_fee_value: '',
    service_fee_type: 'amount',
    mode_of_payment: [],
    pricing_duration: [],
    custom_fields: [{ label: '', type: '' }], // no options by default
    });
  
//   const handleFinish = (values: any) => {
//     post('admin.configurations.categories.store'); // Replace with your actual endpoint
//   };
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end', // top right
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    });

    const handleSubmit = () => {
        router.post(route('admin.configurations.categories.store'), data, {
            onSuccess: () => {
            Toast.fire({
                icon: 'success',
                title: 'Category successfully saved',
            });
            form.resetFields(); // optional reset
            },
            onError: (errors) => {
            Toast.fire({
                icon: 'error',
                title: 'Something went wrong',
            });
            console.error(errors);
            },
        });
    };
  return (
    <div>
      <Head title="Create Category" />
      <Title level={3}>Create New Category</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={data}
      >
        <Row gutter={24}>
          {/* Column 1 */}
            <Col span={12}>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input
                    placeholder="Enter category name"
                    style={{borderRadius: '6px', height: '40px', padding: '6px 12px',}}
                    onChange={e => setData('name', e.target.value)}
                />
                </Form.Item>
                <Form.Item label="Description" name="description">
                <Input.TextArea
                    rows={4}
                    placeholder="Enter description"
                    style={{borderRadius: '6px', height: '150px', padding: '6px 12px',}}
                    onChange={e => setData('description', e.target.value)}
                />
                </Form.Item>
            </Col>

          {/* Column 2 */}
            <Col span={12}>
                <Form.Item label="Service Fee" name="service_fee" rules={[{ required: true }]}>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input
                        type="number"
                        placeholder="Enter service fee"
                        style={{
                            borderRadius: '6px 0 0 6px',
                            height: 40,
                            padding: '6px 12px',
                        }}
                        value={data.service_fee_value}
                        onChange={(e) => setData('service_fee_value', e.target.value)}
                        />
                        <Select
                        value={data.service_fee_type}
                        onChange={(value) => setData('service_fee_type', value)}
                        style={{
                            width: 80,
                            borderRadius: '0 6px 6px 0',
                            height: 40,
                        }}
                      
                        >
                        <Option value="amount">₱</Option>
                        <Option value="percent">%</Option>
                        </Select>
                    </Space.Compact>
                </Form.Item>
                <Form.Item
                label="Mode of Payment"
                name="mode_of_payment"
                rules={[{ required: true, message: 'Please select at least one mode' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select mode(s) of payment"
                        size="large"
                        value={data.mode_of_payment}
                        onChange={(value) => setData('mode_of_payment', value)}
                    >
                        {modeOfPayments.map(mode => (
                        <Option key={mode} value={mode}>
                            {mode}
                        </Option>
                        ))}
                    </Select>
                    
                </Form.Item>
                <Form.Item
                label="Pricing Duration"
                name="pricing_duration"
                rules={[{ required: true, message: 'Please select at least one duration' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select pricing duration(s)"
                        size="large"
                        value={data.pricing_duration}
                        onChange={(value) => setData('pricing_duration', value)}
                    >
                        {pricingDurations.map(duration => (
                        <Option key={duration} value={duration}>
                            {duration}
                        </Option>
                        ))}
                    </Select>
                </Form.Item>
                
            </Col>
        </Row>

        {/* Full Width Custom Fields Section */}
        <Card title="Custom Fields" className="mt-4">
            <Form.List name="custom_fields">
                {(fields, { add, remove }) => (
                    <>
                    {fields.map(({ key, name, ...restField }, index) => {
                        const currentType = data.custom_fields?.[index]?.type;

                        return (
                            <Row gutter={16} key={key}>
                            {/* Label Field */}
                            <Col span={6}>
                                <Form.Item
                                {...restField}
                                name={[name, 'label']}
                                label="Field Label"
                                rules={[{ required: true, message: 'Please input field label' }]}
                                >
                                <Input
                                    placeholder="Enter label"
                                    style={{ borderRadius: '6px', height: '40px', padding: '6px 12px' }}
                                    onChange={(e) => {
                                    const updated = [...(data.custom_fields || [])];
                                    if (!updated[index]) {
                                        updated[index] = { label: '', type: '', options: [] };
                                    }
                                    updated[index].label = e.target.value;
                                    setData('custom_fields', updated);
                                    }}
                                />
                                </Form.Item>
                            </Col>

                            {/* Type Field */}
                            <Col span={6}>
                                <Form.Item
                                {...restField}
                                name={[name, 'type']}
                                label="Field Type"
                                rules={[{ required: true, message: 'Please select field type' }]}
                                >
                                <Select
                                    placeholder="Select type"
                                    size="large"
                                    onChange={(value) => {
                                    const updated = [...(data.custom_fields || [])];
                                    updated[index].type = value;
                                    // Reset options if type is changed
                                    if (value === 'select' || value === 'checkbox') {
                                        updated[index].options = [''];
                                    } else {
                                        delete updated[index].options;
                                    }
                                    setData('custom_fields', updated);
                                    }}
                                >
                                    <Option value="text">Text</Option>
                                    <Option value="number">Number</Option>
                                    <Option value="select">Select</Option>
                                    <Option value="checkbox">Checkbox</Option>
                                </Select>
                                </Form.Item>
                            </Col>

                            {/* Conditional Options Field */}
                            {(currentType === 'select' || currentType === 'checkbox') && (
                                <Col span={8}>
                                <Form.Item label="Options">
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                    {(data.custom_fields?.[index]?.options || []).map((option, optIndex) => (
                                        <Space key={optIndex} style={{ display: 'flex', marginBottom: 4 }} align="start">
                                        <Input
                                        placeholder={`Option ${optIndex + 1}`}
                                        value={option}
                                        onChange={(e) => {
                                            const updated = [...(data.custom_fields || [])];

                                            // ✅ Ensure options is initialized
                                            if (!updated[index].options) {
                                            updated[index].options = [];
                                            }

                                            updated[index].options![optIndex] = e.target.value; // Non-null assertion since we just initialized
                                            setData('custom_fields', updated);
                                        }}
                                        />
                                        <Button
                                        danger
                                        onClick={() => {
                                            const updated = [...(data.custom_fields || [])];

                                            // ✅ Ensure options is initialized
                                            if (!updated[index].options) {
                                            updated[index].options = [];
                                            }

                                            updated[index].options!.splice(optIndex, 1);
                                            setData('custom_fields', updated);
                                        }}
                                        >
                                        Remove
                                        </Button>
                                        </Space>
                                    ))}
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                        const updated = [...(data.custom_fields || [])];
                                        updated[index].options = [...(updated[index].options || []), ''];
                                        setData('custom_fields', updated);
                                        }}
                                        icon={<PlusOutlined />}
                                    >
                                        Add Option
                                    </Button>
                                    </Space>
                                </Form.Item>
                                </Col>
                            )}

                            {/* Remove Field Button */}
                            <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                <Button
                                icon={<MinusCircleOutlined />}
                                onClick={() => {
                                    const updated = [...(data.custom_fields || [])];
                                    updated.splice(index, 1);
                                    setData('custom_fields', updated);
                                }}
                                danger
                                type="primary"
                                >
                                Remove
                                </Button>
                            </Col>
                            </Row>
                        );
                    })}

                    <Form.Item>
                        <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                        block
                        style={{ marginTop: 10 }}
                        >
                        Add Custom Field
                        </Button>
                    </Form.Item>
                    </>
                )}
                </Form.List>
        </Card>

        <Form.Item className="mt-6">
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-white border-none"
            icon={<SaveOutlined />}
            type="primary"
            htmlType="submit"
            loading={processing}
          >
            Save Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

CreateCategory.layout = (page: React.ReactNode) => (
  <AdminLayoutAntD
    active_keys={['/admin/categories']}
    active_selected_keys={['/admin/categories/create']}
  >
    {page}
  </AdminLayoutAntD>
);

export default CreateCategory;
