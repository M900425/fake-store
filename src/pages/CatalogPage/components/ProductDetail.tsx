import { Row, Col, Typography, Button, Rate, Space } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { type Product } from '@/types/product';

const { Title, Text, Paragraph } = Typography;

interface IProps {
    product: Product;
    currentRate: number;
    currentSymbol: string;
    onBack: () => void;
}

export default function ProductDetail({
    product,
    currentRate,
    currentSymbol,
    onBack,
}: IProps) {
    const displayPrice = (product.price * currentRate).toFixed(2);

    return (
        <div>
            <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={onBack}
                className="back-btn"
            >
                Back to Catalog
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
                            {product.category.toUpperCase()}
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
                                ({product.rating.count} reviews)
                            </Text>
                        </Space>

                        <Title level={1} className="no-margin">
                            {currentSymbol}
                            {displayPrice}
                        </Title>
                        <div>
                            <Title level={4} className="no-margin">
                                Description
                            </Title>
                            <Paragraph className="no-margin">
                                {product.description}
                            </Paragraph>
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                        >
                            Add to Cart
                        </Button>
                    </Space>
                </Col>
            </Row>
        </div>
    );
}
