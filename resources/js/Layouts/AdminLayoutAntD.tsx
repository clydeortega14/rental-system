import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    SettingOutlined,
    MailOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps, theme, Image } from 'antd';
import logo from '../../img/initialLogo.png';
import { Link } from '@inertiajs/react';
import { AdminLayoutProps } from '@/types';

const { Header, Sider, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: '/admin/dashboard',
        icon: <UserOutlined />,
        label: <Link href="/admin/dashboard">Dashboard</Link>,
    },
    {
        key: '/admin/users',
        icon: <UserOutlined />,
        label: 'Users',
        children: [
            { key: '/admin/users/index', label: <Link href="/admin/users">List</Link> }
        ],
    }
];

interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const App: React.FC<AdminLayoutProps> = ({children, activemenu, activesubmenu}) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    console.log(activemenu, activesubmenu);
    const [stateOpenKeys, setStateOpenKeys] = useState([activemenu, activesubmenu]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}
                style={
                    {
                        overflow: 'auto',
                        height: '100vh',
                        position: 'sticky',
                        insetInlineStart: 0,
                        top: 0,
                        bottom: 0,
                        scrollbarWidth: 'thin',
                        scrollbarGutter: 'stable',
                    }
                }
            >
                <div className="admin-logo" style={
                    {
                        height: '32px',
                        margin: '16px',
                        background: 'rgba(255, 255, 255, .2)',
                        borderRadius: '6px',
                    }
                } />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={ items }
                    openKeys={stateOpenKeys}
                    onOpenChange={onOpenChange}
                />
            </Sider>
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
                    {children}
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;
