import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISubCategoryItem } from "../components/admin/subcategory/list/types";

export const subcategoryApi = createApi({
    reducerPath: "subcategoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5126/api" }),
    endpoints: (builder) => ({
        getSubCategories: builder.query<ISubCategoryItem[], void>({
            query: () => "/subcategory",
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        deleteSubCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/subcategory/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useGetSubCategoriesQuery, useDeleteSubCategoryMutation } = subcategoryApi;
