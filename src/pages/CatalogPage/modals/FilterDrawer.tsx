import { useState, useMemo, useEffect } from 'react';
import {
    Drawer,
    Button,
    Space,
    Slider,
    Input,
    Radio,
    Typography,
    InputNumber,
    message,
} from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CURRENCIES } from '@/constants/currencies';
import { type FilterDrawerProps } from '@/types/filters';

const { Text } = Typography;

export default function FilterDrawer({
    open,
    onClose,
    exchangeRates,
}: FilterDrawerProps) {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1065);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1065);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const initialFilters = useMemo(() => {
        const savedCurrency = localStorage.getItem('appCurrency');
        const currentCurrency =
            searchParams.get('currency') || savedCurrency || 'USD';
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

        localStorage.setItem('appCurrency', localFilters.currency);

        setSearchParams(newParams);
        onClose();
        message.success(t('filterDrawer.messages.applied'));
    };
    const handleReset = () => {
        setSearchParams({});
        onClose();
        message.success(t('filterDrawer.messages.reset'));
    };

    return (
        <Drawer
            key={open ? 'open' : 'closed'}
            title={t('filterDrawer.title')}
            placement="right"
            onClose={onClose}
            open={open}
            width={isMobile ? '100%' : 378}
            footer={
                <div className="footer-filter-buttons">
                    <Button
                        className="filter-buttons"
                        type="primary"
                        onClick={handleApply}
                        block
                    >
                        {t('filterDrawer.apply')}
                    </Button>
                    <Button
                        className="filter-buttons"
                        onClick={handleReset}
                        block
                    >
                        {t('filterDrawer.resetAll')}
                    </Button>
                </div>
            }
        >
            <Space
                direction="vertical"
                size="large"
                className="filter-drawer-content"
            >
                <div className="currency">
                    <Text strong>{t('filterDrawer.currency')}</Text>
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
                    <Text strong>{t('filterDrawer.search')}</Text>
                    <Input
                        placeholder={t('filterDrawer.searchPlaceholder')}
                        value={localFilters.search}
                        onChange={(e) => updateLocal('search', e.target.value)}
                        allowClear
                    />
                </div>
                <div className="sorting">
                    <Text strong>{t('filterDrawer.sortBy')}</Text>
                    <Radio.Group
                        value={localFilters.sort}
                        onChange={(e) => updateLocal('sort', e.target.value)}
                    >
                        <Space wrap>
                            <Radio value="default">
                                {t('filterDrawer.sortOptions.default')}
                            </Radio>
                            <Radio value="price_asc">
                                {t('filterDrawer.sortOptions.priceAsc')}
                            </Radio>
                            <Radio value="price_desc">
                                {t('filterDrawer.sortOptions.priceDesc')}
                            </Radio>
                            <Radio value="rating_desc">
                                {t('filterDrawer.sortOptions.ratingDesc')}
                            </Radio>
                        </Space>
                    </Radio.Group>
                </div>
                <div>
                    <Text strong>{t('filterDrawer.priceRange')}</Text>
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
                            placeholder={t('filterDrawer.min')}
                            parser={(value) =>
                                value ? Number(value.replace(/,/g, '.')) : 0
                            }
                            onChange={(val) =>
                                updateLocal('minPrice', val ?? 0)
                            }
                            className="full-width"
                        />
                        <div>-</div>
                        <InputNumber
                            min={0}
                            max={currentMaxLimit}
                            precision={2}
                            addonBefore={currentSymbol}
                            value={localFilters.maxPrice}
                            placeholder={t('filterDrawer.max')}
                            parser={(value) =>
                                value ? Number(value.replace(/,/g, '.')) : 0
                            }
                            onChange={(val) =>
                                updateLocal('maxPrice', val ?? currentMaxLimit)
                            }
                            className="full-width"
                        />
                    </Space>
                </div>
                <div className='rating'>
                    <Text strong>{t('filterDrawer.customerRating')}</Text>
                    <Radio.Group
                        value={localFilters.rating}
                        onChange={(e) => updateLocal('rating', e.target.value)}
                    >
                        <Space wrap>
                            <Radio value={0}>
                                {t('filterDrawer.ratingOptions.any')}
                            </Radio>
                            <Radio value={4}>
                                {t('filterDrawer.ratingOptions.fourAndAbove')}
                            </Radio>
                            <Radio value={3}>
                                {t('filterDrawer.ratingOptions.threeAndAbove')}
                            </Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </Space>
        </Drawer>
    );
}
