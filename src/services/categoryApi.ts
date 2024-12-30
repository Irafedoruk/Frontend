import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_URL} from "../env";
import { ICategoryItem } from '../interfaces/categories';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5126/api` }),
    endpoints: (builder) => ({
        getCategories: builder.query<ICategoryItem[], void>({
            query: () => 'category',
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `category/${id}`,
                method: 'DELETE',
            }),
        }),
        // addPost: builder.mutation({
        //     query: (newPost) => ({
        //         url: 'categories',
        //         method: 'POST',
        //         body: newPost,
        //     }),
        // }),
    }),
});

export const { useGetCategoriesQuery, useDeleteCategoryMutation /*useAddPostMutation*/ } = categoryApi;