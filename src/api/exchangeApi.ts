import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type ExchangeRatesResponse } from '@/types/exchange';

export const exchangeApi = createApi({
    reducerPath: 'exchangeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_EXCHANGE_API_URL,
    }),
    endpoints: (builder) => ({
        getExchangeRates: builder.query<ExchangeRatesResponse, void>({
            query: () => 'latest/USD',
        }),
    }),
});

export const { useGetExchangeRatesQuery } = exchangeApi;
