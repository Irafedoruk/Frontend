import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../env';

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<{ productId: number; quantity: number }[]>([]);

  useEffect(() => {
    // Отримуємо кошик з LocalStorage при завантаженні компонента
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const handleRemoveItem = (productId: number) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleChangeQuantity = (productId: number, quantity: number) => {
    const updatedCart = cart.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="space-y-4">
          {cart.map(item => (
            <li key={item.productId} className="bg-white p-4 shadow-md rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <img
                  //src={`${API_URL}/images/600_${item.images[0]}`}
                  alt={`Product ${item.productId}`}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-semibold">Product ID: {item.productId}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p className="text-gray-500">Price: {/* Вставте реальну ціну */}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-orange-500 px-3 py-1 rounded-md text-white hover:bg-orange-600"
                  onClick={() => handleChangeQuantity(item.productId, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="bg-orange-500 px-3 py-1 rounded-md text-white hover:bg-orange-600"
                  onClick={() => handleChangeQuantity(item.productId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <button
                  className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  Remove
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
