import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ExchangeRatesResponse {
    rates: Record<string, number>;
    base_code: string;
}

export const exchangeApi = createApi({
    reducerPath: 'exchangeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://open.er-api.com/v6/' }),
    endpoints: (builder) => ({
        getExchangeRates: builder.query<ExchangeRatesResponse, void>({
            query: () => 'latest/USD',
        }),
    }),
});

export const { useGetExchangeRatesQuery } = exchangeApi;