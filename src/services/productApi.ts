import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProductItem, IProductCreate } from '../interfaces/products';
import { API_URL } from '../env';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
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
        getProductsBySubCategoryId: builder.query<IProductItem[], number>({
            query: (id) => `/products/bySubCategory/${id}`,
        }),
        getProductsByName: builder.query<IProductItem[], string>({
            query: (name) => `/products/search?query=${name}`,
          }),
    }),
});

export const {
    useGetProductsQuery,
    useDeleteProductMutation,
    useGetProductsBySubCategoryIdQuery,
    useGetProductsByNameQuery,
} = productApi;
