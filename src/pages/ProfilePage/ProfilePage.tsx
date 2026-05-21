import { useState } from 'react';
import { Typography, Space, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { RootState } from '@/store/store';
import { logout } from '@/store/authSlice';
import { LoginPrompt } from '@/components/LoginPrompt';
import { PageHeader } from '@/components/PageHeader';
import LogoutConfirmationModal from './modals/LogoutConfirmationModal';
import { MOCK_USER_PROFILE } from '@/constants/mockProfile';
import './ProfilePage.scss';

const { Title, Text } = Typography;

export default function ProfilePage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth,
    );
    const handleConfirmLogout = () => {
        dispatch(logout());
        message.success(t('profilePage.messages.logoutSuccess'));
        setIsLogoutModalOpen(false);
    };

    if (!isAuthenticated) return <LoginPrompt />;

    return (
        <div>
            <PageHeader
                title={t('profilePage.title')}
                actionNode={
                    <Button
                        danger
                        type="primary"
                        onClick={() => setIsLogoutModalOpen(true)}
                    >
                        {t('profilePage.logout')}
                    </Button>
                }
            />
            <Space direction="vertical" className="info-section">
                <div className="profile-section">
                    <Title level={4}>{t('profilePage.accountDetails')}</Title>
                    <Text strong>{t('profilePage.labels.username')} </Text>
                    <Text>{user?.name}</Text>
                </div>
                <div className="profile-section">
                    <Title level={4}>{t('profilePage.deliveryAddress')}</Title>
                    <Text strong>{t('profilePage.labels.address')} </Text>
                    <Text>
                        {MOCK_USER_PROFILE.address.street},{' '}
                        {MOCK_USER_PROFILE.address.city}
                    </Text>
                </div>
                <div className="profile-section">
                    <Title level={4}>{t('profilePage.paymentMethod')}</Title>
                    <Text strong>{t('profilePage.labels.card')} </Text>
                    <Text>{MOCK_USER_PROFILE.paymentMethod.number}</Text>
                </div>
                <div className="profile-section">
                    <Title level={4}>{t('profilePage.orderHistory')}</Title>
                    <Text>{t('profilePage.noOrders')}</Text>
                </div>
            </Space>
            <LogoutConfirmationModal
                open={isLogoutModalOpen}
                onConfirm={handleConfirmLogout}
                onCancel={() => setIsLogoutModalOpen(false)}
            />
        </div>
    );
}
