import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '@/api/productApi';
import { exchangeApi } from '@/api/exchangeApi';

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [exchangeApi.reducerPath]: exchangeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(exchangeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
