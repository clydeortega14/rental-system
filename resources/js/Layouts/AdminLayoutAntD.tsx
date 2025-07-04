import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    SettingOutlined,
    MailOutlined,
    AppstoreOutlined,
    DashboardFilled,
    LockOutlined
} from '@ant-design/icons';
import AdminSiderAntd from './AdminSiderAntD';
import { Button, Layout, Menu, MenuProps, theme, Image, Breadcrumb, ConfigProvider, Row, Col } from 'antd';
import logo from '../../img/initialLogo.png';
import { Link, useForm } from '@inertiajs/react';
import { AdminLayoutProps } from '@/types';
import '../../css/admin-compact.css';

const { Header, Sider, Content, Footer } = Layout;

const App: React.FC<AdminLayoutProps> = ({ children, active_keys, active_selected_keys }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { post } = useForm();

    return (
        <ConfigProvider
            componentSize="small"
            theme={{ token: { fontSize: 12 } }}
        >
            <Layout>
                <AdminSiderAntd
                    collapsible_status={collapsed}
                    active_keys={active_keys}
                    active_selected_keys={active_selected_keys}
                />
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />

                        <div
                            onClick={() => {
                                post(route('admin.logout'));
                            }}
                            style={{ float: 'right', marginRight: 20, cursor: 'pointer' }}>
                            Logout
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={24} lg={24} xl={24}>
                                {children}
                            </Col>
                        </Row>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default App;
