import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProductItem, IProductCreate } from '../interfaces/products';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5126/api' }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProductItem[], void>({
            query: () => '/product',
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
        getProductById: builder.query<IProductItem, number>({
            query: (id) => `/product/${id}`,
        }),
        createProduct: builder.mutation<void, IProductCreate>({
            query: (product) => ({
                url: '/product',
                method: 'POST',
                body: product,
            }),
        }),
        updateProduct: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: '/product',
                method: 'PUT',
                body: formData,
            }),
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
        }),
        uploadDescImage: builder.mutation<{ id: number; image: string }, FormData>({
            query: (formData) => ({
                url: '/product/upload',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUploadDescImageMutation,
} = productApi;
