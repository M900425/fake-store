import { Typography, Table, Button, Space, InputNumber, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '@/store/store';
import {
    removeFromCart,
    updateQuantity,
    type CartItem,
} from '@/store/cartSlice';
import { useGetExchangeRatesQuery } from '@/api/exchangeApi';
import { CURRENCIES } from '@/constants/currencies';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import './CartPage.scss';

const { Title, Text } = Typography;

export default function CartPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const savedCurrency = useLocalStorage('appCurrency', 'USD');
    const { data: exchangeData, isLoading: isRatesLoading } =
        useGetExchangeRatesQuery();

    if (isRatesLoading || !exchangeData) {
        return <LoadingSpinner tip="Loading data..." />;
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
    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (_: unknown, record: CartItem) => (
                <Space>
                    <img
                        src={record.image}
                        alt={record.title}
                        className="cart-item-image"
                    />
                    <Text strong>{record.title}</Text>
                </Space>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_: unknown, record: CartItem) => (
                <Text>
                    {currentSymbol}
                    {(record.price * currentRate).toFixed(2)}
                </Text>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity: number, record: CartItem) => (
                <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) =>
                        dispatch(
                            updateQuantity({
                                id: record.id,
                                quantity: value || 1,
                            }),
                        )
                    }
                />
            ),
        },
        {
            title: 'Total',
            key: 'total',
            render: (_: unknown, record: CartItem) => (
                <Text strong>
                    {currentSymbol}
                    {(record.price * record.quantity * currentRate).toFixed(2)}
                </Text>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: unknown, record: CartItem) => (
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => dispatch(removeFromCart(record.id))}
                />
            ),
        },
    ];

    return (
        <div className="cart-page-root">
            <Title level={2} className="header-cart">
                Shopping Cart
            </Title>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <Text type="secondary">Your cart is currently empty.</Text>
                    <Button
                        type="primary"
                        onClick={() => navigate('/catalog/all')}
                    >
                        Go to Catalog
                    </Button>
                </div>
            ) : (
                <>
                    <Table
                        columns={columns}
                        dataSource={cartItems}
                        rowKey="id"
                        className="cart-table"
                        pagination={false}
                    />
                    <Row justify="end">
                        <Col xs={24} sm={12} md={8} className="cart-summary">
                            <Space
                                direction="vertical"
                                size="middle"
                                className="full-width"
                            >
                                <div className="summary-row">
                                    <Title level={3} className="no-margin">
                                        Total:
                                    </Title>
                                    <Title level={3} className="total-price">
                                        {currentSymbol}
                                        {totalPrice.toFixed(2)}
                                    </Title>
                                </div>
                                <Button type="primary" size="large" block>
                                    Proceed to Checkout
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}
