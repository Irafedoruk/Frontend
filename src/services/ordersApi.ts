// ordersApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../env';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<void, { userId: string; items: any; totalAmount: number }>({
      query: (orderData) => ({
        url: '/Order/create',
        method: 'POST',
        body: orderData,
      }),
    }),
    getOrders: builder.query<any, void>({
      query: () => '/orders',
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = ordersApi;
