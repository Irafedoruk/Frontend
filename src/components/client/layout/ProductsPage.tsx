import { useParams } from "react-router-dom";
import { useGetProductsBySubCategoryIdQuery } from "../../../services/productApi";
import { API_URL } from "../../../env";
import { IProductItem } from "../../../interfaces/products";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, CartItem } from "../../../interfaces/cart/cartSlice";
import axios from "axios";

const ProductsPage = () => {
  const { id } = useParams(); // ID підкатегорії з URL
  const subCategoryId = Number(id);
  const { data: products, isLoading } = useGetProductsBySubCategoryIdQuery(subCategoryId);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleAddToCart = async (product: IProductItem) => {
    const token = localStorage.getItem("accessToken"); // Отримання токена з localStorage
    const userId = localStorage.getItem("userId"); // Отримання userId з localStorage

    if (token && userId) {
      // Якщо користувач авторизований
      try {
        // Додавання товару до БД
        await axios.post(
          `${API_URL}/api/Cart/add`,
          { userId, productId: product.id, quantity: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Товар додано до кошика в БД");

        // Після додавання товару на сервер, потрібно оновити кошик в Redux
        const updatedCartItem: CartItem = {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        images: product.images || [],
        };
        dispatch(addToCart(updatedCartItem));

        // Також можна отримати оновлений кошик з серверу, якщо це необхідно
        // await axios.get(`${API_URL}/api/Cart/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        //   .then(response => {
        //     dispatch(setCart(response.data)); // Замість addToCart можна використовувати setCart
        //   });

      } catch (error) {
        console.error("Помилка додавання товару в БД", error);
      }
    } else {
      // Якщо неавторизований — використовуємо Redux для оновлення кошика
      const cartItem: CartItem = {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        images: product.images || [], // Передаємо масив зображень або пустий масив
      };

      dispatch(addToCart(cartItem));

      // Оновлення кошика в localStorage
      const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cartItems.find(item => item.productId === product.id);
      if (existingItem) {
        existingItem.quantity += 1; // Якщо товар є, збільшуємо кількість
      } else {
        cartItems.push(cartItem); // Додаємо новий товар, якщо його немає
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
      console.log("Товар додано до кошика (неавторизований користувач)");
    }
  };

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (!products || products.length === 0) {
    return <div>Продукти не знайдено для цієї підкатегорії</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Продукти</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: IProductItem) => (
          <li
            key={product.id}
            className="relative bg-white p-4 shadow-md rounded-lg overflow-hidden"
            onMouseEnter={() => setHoveredProductId(product.id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            <img
              src={`${API_URL}/images/600_${product.images[0]}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            {hoveredProductId === product.id && (
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-80 text-white p-4 transition-all duration-300 ease-in-out">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <button className="bg-gray-600 px-2 py-1 rounded-md">-</button>
                    <span className="mx-2">1</span>
                    <button className="bg-gray-600 px-2 py-1 rounded-md">+</button>
                  </div>
                  <button onClick={() => handleAddToCart(product)} className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600">Додати в кошик</button>
                </div>
              </div>
            )}
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p>Модель: {product.modeles}</p>
            <p>Код: {product.code}</p>
            <p>Розмір: {product.size}</p>
            <p>Кількість в упаковці: {product.quantityInPack}</p>
            <p className="font-bold mt-2">{product.price} грн</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
