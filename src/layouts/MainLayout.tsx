import { useState } from 'react';
import { Layout, Menu, Badge, Avatar, Dropdown } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    ShoppingCartOutlined,
    ShopOutlined,
    UserOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store/store';
import { useTranslation } from 'react-i18next';
import i18n from '@/locales/i18n';
import ReactCountryFlag from 'react-country-flag';
import { LANGUAGES } from '@/constants/languages';
import './MainLayout.scss';

const { Sider, Content } = Layout;

export default function MainLayout() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth,
    );
    const uniqueItemCount = cartItems.length;
    const languages = LANGUAGES;
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };
    const langMenuItems = languages.map((lang) => ({
        key: lang.code,
        label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ReactCountryFlag
                    countryCode={lang.countryCode}
                    svg
                    style={{ width: '1.2em', height: '1.2em' }}
                />
                {lang.label}
            </div>
        ),
        onClick: () => changeLanguage(lang.code),
    }));
    const menuItems = [
        {
            key: '/catalog/all',
            icon: <ShopOutlined />,
            label: t('layout.catalog'),
        },
        {
            key: '/cart',
            icon: (
                <Badge count={uniqueItemCount} className="cart-badge">
                    <ShoppingCartOutlined />
                </Badge>
            ),
            label: t('layout.cart'),
        },
        { key: '/profile', icon: <UserOutlined />, label: t('layout.profile') },
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
                <div className="sider-inner">
                    <div className="sider-top">
                        <div
                            className="sidebar-logo-container"
                            onClick={() => navigate('/catalog/all')}
                        >
                            <img
                                src="/logo.svg"
                                alt="Logo"
                                className="sidebar-logo-icon"
                            />
                            <span className="sidebar-logo-title">
                                Fake Store
                            </span>
                        </div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={[currentActiveKey]}
                            items={menuItems}
                            onClick={(info) => navigate(info.key)}
                        />
                    </div>

                    <div className="sider-bottom">
                        <div
                            className="sidebar-user-section"
                            onClick={() => navigate('/profile')}
                        >
                            <Avatar
                                icon={<UserOutlined />}
                                className="sidebar-avatar"
                            />
                            <span className="sidebar-username">
                                {isAuthenticated
                                    ? user?.name
                                    : t('layout.notLoggedIn')}
                            </span>
                        </div>
                        <Dropdown
                            overlayClassName="language-list"
                            menu={{ items: langMenuItems }}
                            placement="top"
                            trigger={['click']}
                        >
                            <div className="sidebar-lang-section">
                                <GlobalOutlined />
                                <span>
                                    {languages.find(
                                        (l) => l.code === i18n.language,
                                    )?.label || 'Language'}
                                </span>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </Sider>
            <Layout>
                <Content className="main-layout-content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
