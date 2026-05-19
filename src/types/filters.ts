export interface FilterDrawerProps {
    open: boolean;
    onClose: () => void;
    exchangeRates: Record<string, number>;
}
