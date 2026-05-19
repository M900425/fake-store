import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type Product } from '@/types/product';

export const productTag = 'products';

export const productApi = createApi({
    reducerPath: `${productTag}Api`,
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: [productTag, 'categories'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], string | void>({
            query(category) {
                return {
                    url: category ? `products/category/${category}` : 'products',
                    method: 'GET',
                };
            },
            providesTags: [productTag],
        }),
        getProductById: builder.query<Product, number>({
            query(id) {
                return {
                    url: `products/${id}`,
                    method: 'GET',
                };
            },
            providesTags: [productTag],
        }),
        getCategories: builder.query<string[], void>({
            query() {
                return {
                    url: 'products/categories',
                    method: 'GET',
                };
            },
            providesTags: ['categories'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetCategoriesQuery,
} = productApi;