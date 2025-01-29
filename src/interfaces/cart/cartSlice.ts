import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  images?: string[];
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  //items: [],
  items: JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[],
};

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Збільшуємо кількість
      } else {
        state.items.push(action.payload); // Додаємо новий товар
      }
      saveCartToLocalStorage(state.items); // Оновлення localStorage після зміни
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      saveCartToLocalStorage(state.items); // Оновлення localStorage після видалення
    },
    clearCart: state => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
