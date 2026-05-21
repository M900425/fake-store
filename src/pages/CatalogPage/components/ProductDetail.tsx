import { Row, Col, Typography, Button, Rate, Space, message } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { type Product } from '@/types/product';

const { Title, Text, Paragraph } = Typography;

interface IProps {
    product: Product;
    currentRate: number;
    currentSymbol: string;
    fromPage: string;
    onBack: () => void;
    onAddToCart: () => void;
}

export default function ProductDetail({
    product,
    currentRate,
    currentSymbol,
    fromPage,
    onBack,
    onAddToCart,
}: IProps) {
    const { t } = useTranslation();
    const displayPrice = (product.price * currentRate).toFixed(2);
    const handleAddToCart = () => {
        onAddToCart();
        message.success(t('productDetail.messages.addedToCart'));
    };

    return (
        <div>
            <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={onBack}
                className="back-btn"
            >
                {fromPage === 'cart'
                    ? t('productDetail.backCart')
                    : t('productDetail.back')}
            </Button>
            <Row>
                <Col xs={24} md={10} className="image-col">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="main-image"
                    />
                </Col>
                <Col xs={24} md={14}>
                    <Space
                        direction="vertical"
                        size="middle"
                        className="info-space"
                    >
                        <Text type="secondary">
                            {t(`categories.${product.category}`)}
                        </Text>
                        <Title level={2} className="no-margin">
                            {product.title}
                        </Title>
                        <Space>
                            <Rate
                                disabled
                                defaultValue={product.rating.rate}
                                allowHalf
                            />
                            <Text type="secondary">
                                ({product.rating.count}{' '}
                                {t('productDetail.reviews')})
                            </Text>
                        </Space>
                        <Title level={1} className="no-margin">
                            {currentSymbol}
                            {displayPrice}
                        </Title>
                        <div>
                            <Title level={4} className="no-margin">
                                {t('productDetail.description')}
                            </Title>
                            <Paragraph className="no-margin">
                                {product.description}
                            </Paragraph>
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            onClick={handleAddToCart}
                        >
                            {t('productDetail.addToCart')}
                        </Button>
                    </Space>
                </Col>
            </Row>
        </div>
    );
}
