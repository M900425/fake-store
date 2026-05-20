import { useState } from 'react';
import { Layout, Menu, Badge } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    ShoppingCartOutlined,
    ShopOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store/store';
import './MainLayout.scss';

const { Sider, Content } = Layout;

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const uniqueItemCount = cartItems.length;
    const menuItems = [
        {
            key: '/catalog/all',
            icon: <ShopOutlined />,
            label: 'Catalog',
        },
        {
            key: '/cart',
            icon: (
                <Badge count={uniqueItemCount} className="cart-badge">
                    <ShoppingCartOutlined />
                </Badge>
            ),
            label: 'Cart',
        },
        {
            key: '/profile',
            icon: <UserOutlined />,
            label: 'Profile',
        },
    ];

    const currentActiveKey = location.pathname.startsWith('/catalog')
        ? '/catalog/all'
        : location.pathname;

    return (
        <Layout className="main-layout-root">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div
                    className="sidebar-logo-container"
                    onClick={() => navigate('/catalog/all')}
                >
                    <img
                        src="/logo.svg"
                        alt="Logo"
                        className="sidebar-logo-icon"
                    />
                    <span className="sidebar-logo-title">Fake Store</span>
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[currentActiveKey]}
                    items={menuItems}
                    onClick={(info) => navigate(info.key)}
                />
            </Sider>
            <Layout>
                <Content className="main-layout-content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
