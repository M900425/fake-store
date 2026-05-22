import { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Avatar, Dropdown, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    ShoppingCartOutlined,
    ShopOutlined,
    UserOutlined,
    GlobalOutlined,
    MenuOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store/store';
import { useTranslation } from 'react-i18next';
import i18n from '@/locales/i18n';
import ReactCountryFlag from 'react-country-flag';
import { LANGUAGES } from '@/constants/languages';
import './MainLayout.scss';

const { Sider, Content, Header } = Layout;

export default function MainLayout() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1065);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth,
    );
    const uniqueItemCount = cartItems.length;

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 1065;
            setIsMobile(mobile);
            if (!mobile) setMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };
    const langMenuItems = LANGUAGES.map((lang) => ({
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
    const handleMenuClick = (path: string) => {
        navigate(path);
        if (isMobile) setMobileMenuOpen(false);
    };
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
            {isMobile && (
                <Header className="mobile-top-header">
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setMobileMenuOpen(true)}
                        className="mobile-header-menu-btn"
                    />
                    <div
                        className="mobile-header-logo"
                        onClick={() => handleMenuClick('/catalog/all')}
                    >
                        <img src="/logo.svg" alt="Logo" />
                        <span>Fake Store</span>
                    </div>
                    <div
                        className="mobile-header-cart-btn"
                        onClick={() => handleMenuClick('/cart')}
                    >
                        <Badge count={uniqueItemCount} className="cart-badge">
                            <ShoppingCartOutlined />
                        </Badge>
                    </div>
                </Header>
            )}
            <Layout>
                <Sider
                    width={isMobile ? '100vw' : 200}
                    collapsible={!isMobile}
                    collapsed={isMobile ? !mobileMenuOpen : collapsed}
                    collapsedWidth={isMobile ? 0 : 80}
                    onCollapse={(value) => setCollapsed(value)}
                    trigger={isMobile ? null : undefined}
                    style={
                        isMobile
                            ? {
                                  position: 'fixed',
                                  zIndex: 1000,
                                  height: '100vh',
                                  left: 0,
                                  top: 0,
                              }
                            : {}
                    }
                >
                    <div className="sider-inner">
                        <div className="sider-top">
                            {isMobile && (
                                <div className="mobile-close-container">
                                    <Button
                                        type="text"
                                        icon={<CloseOutlined />}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="mobile-close-btn"
                                    />
                                </div>
                            )}
                            <div
                                className="sidebar-logo-container"
                                onClick={() => handleMenuClick('/catalog/all')}
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
                                onClick={(info) => handleMenuClick(info.key)}
                            />
                        </div>
                        <div className="sider-bottom">
                            <div
                                className="sidebar-user-section"
                                onClick={() => handleMenuClick('/profile')}
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
                                        {LANGUAGES.find(
                                            (l) => l.code === i18n.language,
                                        )?.label || 'Language'}
                                    </span>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </Sider>
                <Content className="main-layout-content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
