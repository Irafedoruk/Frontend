import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from '../services/categoryApi.ts';
import { postApi } from '../services/postApi.ts';
import { subcategoryApi } from '../services/subcategoryApi.ts';
import { productApi } from '../services/productApi.ts';

const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [subcategoryApi.reducerPath]: subcategoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApi.middleware,
            categoryApi.middleware,
            subcategoryApi.middleware,
            productApi.middleware,
        ),
});

export default store;