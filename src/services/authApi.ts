import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
<<<<<<< HEAD
  baseQuery: fetchBaseQuery({ baseUrl: "/api/account/auth" }),
=======
  baseQuery: fetchBaseQuery({ baseUrl: "/api/accounts/auth" }),
>>>>>>> e7a907204a46242ea4fc98f1b94afc6bebc18d6e
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<void, { email: string; password: string }>({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
