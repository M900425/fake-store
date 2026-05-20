import { useState, useEffect, useMemo } from 'react';
import { Card, Row, Col, Typography, Tabs, Button, Rate, Spin } from 'antd';
import { ShoppingCartOutlined, FilterOutlined } from '@ant-design/icons';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { useGetProductsQuery, useGetCategoriesQuery } from '@/api/productApi';
import { useGetExchangeRatesQuery } from '@/api/exchangeApi';
import FilterDrawer from './modals/FilterDrawer';
import ProductDetail from './components/ProductDetail';
import { CURRENCIES } from '@/constants/currencies';
import './CatalogPage.scss';

const { Title, Text } = Typography;

export default function CatalogPage() {
    const { category } = useParams<{ category?: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!category) {
            navigate('/catalog/all', { replace: true });
        }
    }, [category, navigate]);

    const activeCategory = category || 'all';
    const isProductDetail = category && !isNaN(Number(category));
    const queryCategory =
        activeCategory === 'all' || isProductDetail
            ? undefined
            : activeCategory;

    const { data: products, isLoading: isProductsLoading } =
        useGetProductsQuery(queryCategory);
    const { data: categories } = useGetCategoriesQuery();
    const { data: exchangeData, isLoading: isRatesLoading } =
        useGetExchangeRatesQuery();
    const exchangeRates = exchangeData?.rates || {};
    const savedCurrency = localStorage.getItem('appCurrency');
    const currentCurrency =
        searchParams.get('currency') || savedCurrency || 'USD';
    const currentRate = exchangeRates?.[currentCurrency] || 1;
    const currentSymbol =
        CURRENCIES.find((c) => c.value === currentCurrency)?.symbol || '$';
    const filteredProducts = useMemo(() => {
        if (!products || isProductDetail) return [];

        const search = (searchParams.get('search') || '').toLowerCase();
        const sort = searchParams.get('sort') || 'default';
        const minPrice = Number(searchParams.get('minPrice')) || 0;
        const maxPrice = searchParams.get('maxPrice')
            ? Number(searchParams.get('maxPrice'))
            : Infinity;
        const minRating = Number(searchParams.get('rating')) || 0;

        let result = [...products];

        if (search) {
            result = result.filter((p) =>
                p.title.toLowerCase().includes(search),
            );
        }
        if (minPrice > 0 || maxPrice < Infinity) {
            result = result.filter((p) => {
                const convertedPrice = p.price * currentRate;
                return convertedPrice >= minPrice && convertedPrice <= maxPrice;
            });
        }
        if (minRating > 0) {
            result = result.filter((p) => p.rating.rate >= minRating);
        }
        if (sort === 'price_asc')
            result.sort(
                (a, b) => a.price * currentRate - b.price * currentRate,
            );
        if (sort === 'price_desc')
            result.sort(
                (a, b) => b.price * currentRate - a.price * currentRate,
            );
        if (sort === 'rating_desc')
            result.sort((a, b) => b.rating.rate - a.rating.rate);

        return result;
    }, [products, searchParams, currentRate, isProductDetail]);

    if (isProductsLoading || isRatesLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '100px',
                }}
            >
                <Spin size="large" tip="Loading data..." />
            </div>
        );
    }
    if (isProductDetail && products) {
        const product = products.find((p) => p.id === Number(category));

        if (product) {
            return (
                <div className="catalog-page-root">
                    <ProductDetail
                        product={product}
                        currentRate={currentRate}
                        currentSymbol={currentSymbol}
                        onBack={() =>
                            navigate(`/catalog/all?${searchParams.toString()}`)
                        }
                        onAddToCart={() => dispatch(addToCart(product))}
                    />
                </div>
            );
        }
    }

    const tabItems = [
        { key: 'all', label: 'ALL' },
        ...(categories?.map((cat) => ({
            key: cat,
            label: cat.toUpperCase(),
        })) || []),
    ];
    const handleTabChange = (key: string) => {
        navigate(`/catalog/${key}?${searchParams.toString()}`);
    };
    const tabBarExtra = {
        right: (
            <Button
                type="primary"
                icon={<FilterOutlined />}
                onClick={() => setIsFilterDrawerOpen(true)}
            >
                Filters
            </Button>
        ),
    };

    return (
        <div className="catalog-page-root">
            <div className="header">
                <div className="catalog-header">
                    <Title level={2} className="no-margin">
                        Catalog
                    </Title>
                </div>
                <Tabs
                    activeKey={activeCategory}
                    items={tabItems}
                    onChange={handleTabChange}
                    className="category-tabs"
                    tabBarExtraContent={tabBarExtra}
                />
            </div>
            <Row className="catalog-products-row" gutter={[24, 24]}>
                {filteredProducts.map((product) => {
                    const displayPrice = (product.price * currentRate).toFixed(
                        2,
                    );

                    return (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            <Card
                                hoverable
                                className="product-card"
                                onClick={() =>
                                    navigate(
                                        `/catalog/${product.id}?${searchParams.toString()}`,
                                    )
                                }
                                cover={
                                    <div className="product-image-container">
                                        <img
                                            alt={product.title}
                                            src={product.image}
                                            className="product-image"
                                        />
                                    </div>
                                }
                                actions={[
                                    <Button
                                        type="primary"
                                        icon={<ShoppingCartOutlined />}
                                        className="add-to-cart-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(addToCart(product));
                                        }}
                                    >
                                        Add to Cart
                                    </Button>,
                                ]}
                            >
                                <Card.Meta
                                    title={
                                        <span className="product-title">
                                            {product.title}
                                        </span>
                                    }
                                    description={
                                        <div className="product-details">
                                            <Text
                                                strong
                                                className="product-price"
                                            >
                                                {currentSymbol}
                                                {displayPrice}
                                            </Text>
                                            <div className="product-rating">
                                                <Rate
                                                    disabled
                                                    defaultValue={
                                                        product.rating.rate
                                                    }
                                                    allowHalf
                                                    className="rating-stars"
                                                />
                                                <Text
                                                    type="secondary"
                                                    className="rating-count"
                                                >
                                                    ({product.rating.count})
                                                </Text>
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <FilterDrawer
                open={isFilterDrawerOpen}
                onClose={() => setIsFilterDrawerOpen(false)}
                exchangeRates={exchangeRates}
            />
        </div>
    );
}
