import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { type WebStorage } from 'redux-persist';
import { productApi } from '@/api/productApi';
import { exchangeApi } from '@/api/exchangeApi';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

const storage: WebStorage =
    typeof window !== 'undefined'
        ? {
              getItem: (key: string): Promise<string | null> =>
                  Promise.resolve(localStorage.getItem(key)),
              setItem: (key: string, value: string): Promise<void> =>
                  Promise.resolve(localStorage.setItem(key, value)),
              removeItem: (key: string): Promise<void> =>
                  Promise.resolve(localStorage.removeItem(key)),
          }
        : {
              getItem: (): Promise<string | null> => Promise.resolve(null),
              setItem: (): Promise<void> => Promise.resolve(),
              removeItem: (): Promise<void> => Promise.resolve(),
          };
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'auth'],
};
const rootReducer = combineReducers({
    [productApi.reducerPath]: productApi.reducer,
    [exchangeApi.reducerPath]: exchangeApi.reducer,
    cart: cartReducer,
    auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        })
            .concat(productApi.middleware)
            .concat(exchangeApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
