import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from '../services/categoryApi.ts';
import { postApi } from '../services/postApi.ts';

const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApi.middleware,
            categoryApi.middleware),
});

export default store;