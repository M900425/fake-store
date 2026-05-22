import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearCart } from '@/store/cartSlice';
import type { RootState } from '@/store/store';
import { MOCK_USER_PROFILE } from '@/constants/mockProfile';
import './CheckoutPage.scss';

const { Title, Text } = Typography;

export default function CheckoutPage() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            message.warning({
                content: t('cartPage.messages.loginRequired'),
                key: 'checkout-login-warning',
            });
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, navigate, t]);

    const handleSimulatePayment = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            message.success(t('checkoutPage.messages.success'));
            dispatch(clearCart());
            navigate('/catalog/all');
        }, 2000);
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="checkout-page-root">
            <Title level={2}>{t('checkoutPage.title')}</Title>
            <Text type="secondary" className="checkout-warning-text">
                {t('checkoutPage.warning')}
            </Text>
            <Card title={t('checkoutPage.cardTitle')}>
                <Form layout="vertical" onFinish={handleSimulatePayment}>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t('checkoutPage.labels.ownerName')}
                            >
                                <Input
                                    disabled
                                    value={
                                        MOCK_USER_PROFILE.paymentMethod.holder
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label={t('checkoutPage.labels.country')}>
                                <Input
                                    disabled
                                    value={MOCK_USER_PROFILE.address.country}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} md={16}>
                            <Form.Item label={t('checkoutPage.labels.street')}>
                                <Input
                                    disabled
                                    value={MOCK_USER_PROFILE.address.street}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={t('checkoutPage.labels.city')}>
                                <Input
                                    disabled
                                    value={MOCK_USER_PROFILE.address.city}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t('checkoutPage.labels.cardNumber')}
                            >
                                <Input
                                    disabled
                                    value={
                                        MOCK_USER_PROFILE.paymentMethod.number
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label={t('checkoutPage.labels.expiry')}>
                                <Input
                                    disabled
                                    value={
                                        MOCK_USER_PROFILE.paymentMethod.expiry
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Item label={t('checkoutPage.labels.cvv')}>
                                <Input.Password disabled value="***" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="checkout-actions">
                        <Button
                            onClick={() => navigate('/cart')}
                            disabled={loading}
                            className="checkout-back-btn"
                        >
                            {t('checkoutPage.buttons.return')}
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="checkout-submit-btn"
                        >
                            {t('checkoutPage.buttons.confirmAndPay')}
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}
