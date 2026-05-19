import { useState, useMemo } from 'react';
import {
    Drawer,
    Button,
    Space,
    Slider,
    Input,
    Radio,
    Typography,
    InputNumber,
} from 'antd';
import { useSearchParams } from 'react-router-dom';
import { CURRENCIES } from '@/constants/currencies';
import { type FilterDrawerProps } from '@/types/filters';

const { Text } = Typography;

export default function FilterDrawer({
    open,
    onClose,
    exchangeRates,
}: FilterDrawerProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialFilters = useMemo(() => {
        const currentCurrency = searchParams.get('currency') || 'USD';
        const rate = exchangeRates?.[currentCurrency] || 1;

        return {
            search: searchParams.get('search') || '',
            sort: searchParams.get('sort') || 'default',
            currency: currentCurrency,
            minPrice: Number(searchParams.get('minPrice')) || 0,
            maxPrice:
                Number(searchParams.get('maxPrice')) || Math.ceil(1000 * rate),
            rating: Number(searchParams.get('rating')) || 0,
        };
    }, [searchParams, exchangeRates]);

    const [localFilters, setLocalFilters] = useState(initialFilters);
    const updateLocal = (
        key: keyof typeof localFilters,
        value: string | number,
    ) => {
        setLocalFilters((prev) => ({ ...prev, [key]: value }));
    };
    const currentSymbol =
        CURRENCIES.find((c) => c.value === localFilters.currency)?.symbol ||
        '$';
    const currentMaxLimit = Math.ceil(
        1000 * (exchangeRates[localFilters.currency] || 1),
    );
    const handleApply = () => {
        const newParams = new URLSearchParams();

        if (localFilters.search) newParams.set('search', localFilters.search);
        if (localFilters.sort !== 'default')
            newParams.set('sort', localFilters.sort);
        if (localFilters.currency !== 'USD')
            newParams.set('currency', localFilters.currency);
        if (localFilters.minPrice > 0)
            newParams.set('minPrice', String(localFilters.minPrice));
        if (localFilters.maxPrice < currentMaxLimit)
            newParams.set('maxPrice', String(localFilters.maxPrice));
        if (localFilters.rating > 0)
            newParams.set('rating', String(localFilters.rating));

        setSearchParams(newParams);
        onClose();
    };

    const handleReset = () => {
        setSearchParams({});
        onClose();
    };

    return (
        <Drawer
            key={open ? 'open' : 'closed'}
            title="Filter Products"
            placement="right"
            onClose={onClose}
            open={open}
            extra={
                <Space>
                    <Button onClick={handleReset}>Reset All</Button>
                    <Button type="primary" onClick={handleApply}>
                        Apply
                    </Button>
                </Space>
            }
        >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                    <Text strong>Currency</Text>
                    <Radio.Group
                        value={localFilters.currency}
                        onChange={(e) => {
                            const newCurrency = e.target.value as string;
                            const newRate = exchangeRates[newCurrency] || 1;
                            setLocalFilters((prev) => ({
                                ...prev,
                                currency: newCurrency,
                                minPrice: 0,
                                maxPrice: Math.ceil(1000 * newRate),
                            }));
                        }}
                        optionType="button"
                        buttonStyle="solid"
                    >
                        <Space wrap>
                            {CURRENCIES.map((c) => (
                                <Radio.Button key={c.value} value={c.value}>
                                    {c.value}
                                </Radio.Button>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>
                <div>
                    <Text strong>Search</Text>
                    <Input
                        placeholder="Type product name..."
                        value={localFilters.search}
                        onChange={(e) => updateLocal('search', e.target.value)}
                        allowClear
                    />
                </div>
                <div>
                    <Text strong>Sort By</Text>
                    <Radio.Group
                        value={localFilters.sort}
                        onChange={(e) => updateLocal('sort', e.target.value)}
                    >
                        <Space wrap>
                            <Radio value="default">Default</Radio>
                            <Radio value="price_asc">Price ↑</Radio>
                            <Radio value="price_desc">Price ↓</Radio>
                            <Radio value="rating_desc">Top Rated</Radio>
                        </Space>
                    </Radio.Group>
                </div>
                <div>
                    <Text strong>Price Range</Text>
                    <Slider
                        range
                        min={0}
                        max={currentMaxLimit}
                        value={[localFilters.minPrice, localFilters.maxPrice]}
                        onChange={(value) => {
                            updateLocal('minPrice', value[0]);
                            updateLocal('maxPrice', value[1]);
                        }}
                    />
                    <Space>
                        <InputNumber
                            min={0}
                            max={currentMaxLimit}
                            precision={2}
                            addonBefore={currentSymbol}
                            value={localFilters.minPrice}
                            placeholder="Min"
                            parser={(value) =>
                                value ? Number(value.replace(/,/g, '.')) : 0
                            }
                            onChange={(val) =>
                                updateLocal('minPrice', val ?? 0)
                            }
                            style={{ width: '100%' }}
                        />
                        <div>-</div>
                        <InputNumber
                            min={0}
                            max={currentMaxLimit}
                            precision={2}
                            addonBefore={currentSymbol}
                            value={localFilters.maxPrice}
                            placeholder="Max"
                            parser={(value) =>
                                value ? Number(value.replace(/,/g, '.')) : 0
                            }
                            onChange={(val) =>
                                updateLocal('maxPrice', val ?? currentMaxLimit)
                            }
                            style={{ width: '100%' }}
                        />
                    </Space>
                </div>
                <div>
                    <Text strong>Customer Rating</Text>
                    <Radio.Group
                        value={localFilters.rating}
                        onChange={(e) => updateLocal('rating', e.target.value)}
                    >
                        <Space wrap>
                            <Radio value={0}>Any</Radio>
                            <Radio value={4}>4★ & above</Radio>
                            <Radio value={3}>3★ & above</Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </Space>
        </Drawer>
    );
}
