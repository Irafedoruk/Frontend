import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISubCategoryItem } from "../components/admin/subcategory/list/types";
import { API_URL } from "../env";

export const subcategoryApi = createApi({
    reducerPath: "subcategoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    endpoints: (builder) => ({
        getSubCategories: builder.query<ISubCategoryItem[], void>({
            query: () => "/subcategory",
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        getSubCategory: builder.query<ISubCategoryItem, number>({
            query: (id) => `/subcategory/${id}`, // Запит на конкретну підкатегорію за її ID
        }),
        deleteSubCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/subcategory/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { 
    useGetSubCategoriesQuery, 
    useDeleteSubCategoryMutation,
    useGetSubCategoryQuery, 
} = subcategoryApi;
