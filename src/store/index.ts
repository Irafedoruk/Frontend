import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from '../services/categoryApi.ts';
import { postApi } from '../services/postApi.ts';
import { subcategoryApi } from '../services/subcategoryApi.ts';
import { productApi } from '../services/productApi.ts';
import cartReducer from '../interfaces/cart/cartSlice.ts';
import { authApi } from '../services/authApi.ts';

const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [subcategoryApi.reducerPath]: subcategoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        cart: cartReducer, // Додаємо редуктор для кошика
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApi.middleware,
            categoryApi.middleware,
            subcategoryApi.middleware,
            productApi.middleware,
            authApi.middleware,
        ),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;