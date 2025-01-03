import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
        getCategory: builder.query({
            query: (id) => `/category/${id}`, // Запит на отримання конкретної категорії
        }),
        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `category/${id}`,
                method: 'DELETE',
            }),
        }),
        getSubCategoriesByCategoryId: builder.query({
            query: (categoryId) => `/subcategory?categoryId=${categoryId}`, // Запит на отримання підкатегорій для категорії
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

export const { useGetCategoriesQuery, useGetCategoryQuery, useGetSubCategoriesByCategoryIdQuery, useDeleteCategoryMutation /*useAddPostMutation*/ } = categoryApi;