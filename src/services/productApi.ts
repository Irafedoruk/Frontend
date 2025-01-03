import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProductItem, IProductCreate } from '../interfaces/products';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5126/api' }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProductItem[], void>({
            query: () => '/products',
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),        
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useDeleteProductMutation,
} = productApi;
