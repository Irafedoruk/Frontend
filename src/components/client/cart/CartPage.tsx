import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../env';
import { addToCart, CartItem, removeFromCart } from '../../../interfaces/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
//import { removeFromCart as removeFromCartAPI } from '../../../services/cartApi'; // імпортуємо функцію для API
import axios from 'axios';
import { updateCartItemQuantity } from '../../../interfaces/cart/cartSlice';
import { useRemoveCartItemMutation, useUpdateCartItemQuantityMutation } from '../../../services/cartApi';

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch(); 
  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  const userId = localStorage.getItem("userId"); 
  //const [updateCartItemQuantityMutation] = useUpdateCartItemQuantityMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const [updateCartItemQuantityMutation] = useUpdateCartItemQuantityMutation();

  // Ініціалізація кошика з localStorage
  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
    if (Array.isArray(cartFromLocalStorage)) {
      setLocalCart(cartFromLocalStorage);
    } else {
      setLocalCart([]);
    }
  }, []);

  const handleRemoveItem = async (productId: number) => {
    if (userId) {
      try {
        await removeCartItem({ userId, productId }).unwrap();
        dispatch(removeFromCart(productId));
      } catch (error) {
        console.error("Не вдалося видалити товар із кошика:", error);
      }
    } else {
      const updatedCart = localCart.filter(item => item.productId !== productId);
      setLocalCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      dispatch(removeFromCart(productId));
    }
  };


  const handleChangeQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) return;

    if (userId) {
      try {
        // Оновлення через API
        await updateCartItemQuantityMutation({ userId, productId, quantity: newQuantity }).unwrap();
        dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
      } catch (error) {
        console.error('Failed to update quantity:', error);
      }
    } else {
      // Оновлення в Redux
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
      // Оновлення в localStorage
      const updatedCart = localCart.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      setLocalCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {!Array.isArray(cart) || cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {cart.map(item => (
            <li key={item.productId} className="bg-white p-4 shadow-md rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={item.images && item.images.length > 0 ? `${API_URL}/images/300_${item.images[0]}` : "/path-to-placeholder-image.jpg"}                  
                  alt={item.productName}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-semibold">{item.productName || `Product ID: ${item.productId}`}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p className="text-gray-500"><span>{isNaN(item.price) ? "N/A" : `${item.price} грн`}</span></p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
              <button onClick={() => handleChangeQuantity(item.productId, item.quantity + 1)}>+</button>
              <button onClick={() => handleChangeQuantity(item.productId, item.quantity - 1)}>-</button>
              <button className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600" 
                  onClick={() => handleRemoveItem(item.productId)}>Remove
              </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default CartPage;
