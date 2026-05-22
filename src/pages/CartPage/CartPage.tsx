import { useState, useEffect } from 'react';
import {
    Typography,
    Table,
    Button,
    Space,
    Row,
    Col,
    message,
    List,
    Card,
} from 'antd';
import { DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { RootState } from '@/store/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import type { CartItem } from '@/types/product';
import { useGetExchangeRatesQuery } from '@/api/exchangeApi';
import { CURRENCIES } from '@/constants/currencies';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal';
import ClearCartConfirmationModal from './modals/ClearCartConfirmationModal';
import { PageHeader } from '@/components/PageHeader';
import './CartPage.scss';

const { Title, Text } = Typography;

export default function CartPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1065);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1065);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const savedCurrency = useLocalStorage('appCurrency', 'USD');
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { data: exchangeData, isLoading: isRatesLoading } =
        useGetExchangeRatesQuery();

    if (isRatesLoading || !exchangeData) {
        return <LoadingSpinner tip={t('cartPage.loading')} />;
    }

    const exchangeRates = exchangeData.rates;
    const currentCurrency =
        searchParams.get('currency') || savedCurrency || 'USD';
    const currentRate = exchangeRates[currentCurrency] || 1;
    const currentSymbol =
        CURRENCIES.find((c) => c.value === currentCurrency)?.symbol || '$';
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity * currentRate,
        0,
    );
    const handleDeleteClick = (id: number) => {
        setItemToDelete(id);
        setIsDeleteModalOpen(true);
    };
    const handleConfirmDelete = () => {
        if (itemToDelete !== null) {
            dispatch(removeFromCart(itemToDelete));
            message.success(t('cartPage.messages.itemRemoved'));
        }
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
    };
    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
    };
    const handleClearClick = () => {
        setIsClearModalOpen(true);
    };
    const handleConfirmClear = () => {
        dispatch(clearCart());
        message.success(t('cartPage.messages.cartCleared'));
        setIsClearModalOpen(false);
    };
    const handleCancelClear = () => {
        setIsClearModalOpen(false);
    };
    const handleCheckout = () => {
        if (!isAuthenticated) {
            message.warning(t('cartPage.messages.loginRequired'));
            navigate('/login');
            return;
        }
        navigate('/checkout');
    };
    const QuantityControls = ({
        record,
        quantity,
    }: {
        record: CartItem;
        quantity: number;
    }) => (
        <Space align="center">
            <Button
                shape="circle"
                size="small"
                icon={<MinusOutlined />}
                onClick={() => {
                    if (quantity > 1) {
                        dispatch(
                            updateQuantity({
                                id: record.id,
                                quantity: quantity - 1,
                            }),
                        );
                    }
                }}
                disabled={quantity <= 1}
            />
            <Text>{quantity}</Text>
            <Button
                shape="circle"
                size="small"
                icon={<PlusOutlined />}
                onClick={() =>
                    dispatch(
                        updateQuantity({
                            id: record.id,
                            quantity: quantity + 1,
                        }),
                    )
                }
            />
        </Space>
    );
    const columns = [
        {
            title: t('cartPage.columns.product'),
            dataIndex: 'product',
            key: 'product',
            width: 450,
            render: (_: unknown, record: CartItem) => (
                <div
                    className="cart-product-link"
                    onClick={() =>
                        navigate(`/catalog/${record.id}`, {
                            state: { from: 'cart' },
                        })
                    }
                >
                    <Space>
                        <img
                            src={record.image}
                            alt={record.title}
                            className="cart-item-image"
                        />
                        <Text strong>{record.title}</Text>
                    </Space>
                </div>
            ),
        },
        {
            title: t('cartPage.columns.price'),
            dataIndex: 'price',
            key: 'price',
            align: 'center' as const,
            render: (_: unknown, record: CartItem) => (
                <Text>
                    {currentSymbol}
                    {(record.price * currentRate).toFixed(2)}
                </Text>
            ),
        },
        {
            title: t('cartPage.columns.quantity'),
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            align: 'center' as const,
            render: (quantity: number, record: CartItem) => (
                <QuantityControls record={record} quantity={quantity} />
            ),
        },
        {
            title: t('cartPage.columns.total'),
            key: 'total',
            align: 'center' as const,
            render: (_: unknown, record: CartItem) => (
                <Text strong>
                    {currentSymbol}
                    {(record.price * record.quantity * currentRate).toFixed(2)}
                </Text>
            ),
        },
        {
            title: t('cartPage.columns.action'),
            key: 'action',
            width: 50,
            align: 'center' as const,
            render: (_: unknown, record: CartItem) => (
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteClick(record.id)}
                />
            ),
        },
    ];

    return (
        <div className="cart-page-root">
            <PageHeader
                title={t('cartPage.title')}
                actionNode={
                    cartItems.length > 0 && (
                        <Button
                            danger
                            type="primary"
                            onClick={handleClearClick}
                        >
                            {t('cartPage.clearCart')}
                        </Button>
                    )
                }
            />
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <Text type="secondary">{t('cartPage.emptyMessage')}</Text>
                    <Button
                        type="primary"
                        onClick={() => navigate('/catalog/all')}
                    >
                        {t('cartPage.goToCatalog')}
                    </Button>
                </div>
            ) : (
                <>
                    {isMobile ? (
                        <List
                            className="mobile-cart-list"
                            dataSource={cartItems}
                            renderItem={(item) => (
                                <List.Item className="mobile-cart-item">
                                    <Card size="small" className="full-width">
                                        <div className="mobile-item-header">
                                            <div
                                                className="cart-product-link"
                                                onClick={() =>
                                                    navigate(
                                                        `/catalog/${item.id}`,
                                                        {
                                                            state: {
                                                                from: 'cart',
                                                            },
                                                        },
                                                    )
                                                }
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="cart-item-image"
                                                />
                                                <Text
                                                    strong
                                                    className="mobile-item-title"
                                                >
                                                    {item.title}
                                                </Text>
                                            </div>
                                            <Button
                                                type="text"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() =>
                                                    handleDeleteClick(item.id)
                                                }
                                            />
                                        </div>
                                        <div className="mobile-item-footer">
                                            <QuantityControls
                                                record={item}
                                                quantity={item.quantity}
                                            />
                                            <Text
                                                strong
                                                className="mobile-item-price"
                                            >
                                                {currentSymbol}
                                                {(
                                                    item.price *
                                                    item.quantity *
                                                    currentRate
                                                ).toFixed(2)}
                                            </Text>
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={cartItems}
                            rowKey="id"
                            className="cart-table"
                            pagination={false}
                        />
                    )}

                    <Row justify={isMobile ? 'center' : 'end'}>
                        <Col xs={24} sm={12} md={8} className="cart-summary">
                            <Space
                                direction="vertical"
                                size="middle"
                                className="full-width"
                            >
                                <div className="summary-row">
                                    <Title level={3} className="no-margin">
                                        {t('cartPage.total')}
                                    </Title>
                                    <Title level={3} className="total-price">
                                        {currentSymbol}
                                        {totalPrice.toFixed(2)}
                                    </Title>
                                </div>
                                <Button
                                    type="primary"
                                    size="large"
                                    block
                                    onClick={handleCheckout}
                                >
                                    {t('cartPage.proceedToCheckout')}
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </>
            )}
            <DeleteConfirmationModal
                open={isDeleteModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <ClearCartConfirmationModal
                open={isClearModalOpen}
                onConfirm={handleConfirmClear}
                onCancel={handleCancelClear}
            />
        </div>
    );
}
