import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../env';
import { addToCart, CartItem, removeFromCart } from '../../../interfaces/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { removeFromCart as removeFromCartAPI } from '../../../services/cartApi'; // імпортуємо функцію для API

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch(); 
  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  
  // Отримуємо userId з authApi  
  //const userId = useSelector((state: RootState) => state.auth.userId);
  const userId = localStorage.getItem("userId"); 
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
    if (!userId) {
      console.error('User is not authenticated');
      return; // Or show an error to the user
    }

    try {
      // Виклик API для видалення товару
      await removeFromCartAPI(userId, productId); // Pass the actual userId here
      dispatch(removeFromCart(productId)); // Remove from local cart state

      // Update localStorage
      const updatedCart = localCart.filter(item => item.productId !== productId);
      setLocalCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    } 
  };


  const handleChangeQuantity = (item: CartItem, quantity: number) => {
    if (quantity <= 0) return;

    const updatedItem = { ...item, quantity };
    dispatch(addToCart(updatedItem));

    // Оновлення кількості в localStorage
    const updatedCart = localCart.map(cartItem =>
      cartItem.productId === item.productId ? updatedItem : cartItem
    );
    setLocalCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
                <button className="bg-orange-500 px-3 py-1 rounded-md text-white hover:bg-orange-600" onClick={() => handleChangeQuantity(item, item.quantity + 1)}>+</button>
                <button className="bg-orange-500 px-3 py-1 rounded-md text-white hover:bg-orange-600" onClick={() => handleChangeQuantity(item, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <button className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600" onClick={() => handleRemoveItem(item.productId)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default CartPage;
