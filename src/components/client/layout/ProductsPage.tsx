import { Link, useParams, useLocation } from "react-router-dom";
import { useGetProductsByCategoryIdQuery, useGetProductsBySubCategoryIdQuery } from "../../../services/productApi";
import CategorySidebar from "./CategorySidebar";
import { API_URL } from "../../../env";
import { IProductItem } from "../../../interfaces/products";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, CartItem } from "../../../interfaces/cart/cartSlice";
import axios from "axios";
interface ProductsPageProps {
  categoryId?: number;  //  Робимо `categoryId` необов'язковим
  subCategoryId?: number;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ categoryId, subCategoryId }) => {
  const { id } = useParams();
  const subId = subCategoryId || Number(id);
  const location = useLocation(); 
  const { data: products, isLoading } = categoryId
    ? useGetProductsByCategoryIdQuery(categoryId) // Запит продуктів по категорії
    : useGetProductsBySubCategoryIdQuery(subId);  // Запит продуктів по підкатегорії



  // const { data: products, isLoading } = useGetProductsBySubCategoryIdQuery(subCategoryId);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [productQuantities, setProductQuantities] = useState<Record<number, number>>({});
  const dispatch = useDispatch();

  const handleQuantityChange = (productId: number, increment: number) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) + increment, 1),
    }));
  };

  const handleAddToCart = async (product: IProductItem) => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const quantity = productQuantities[product.id] || 1;

    if (token && userId) {
      try {
        await axios.post(
          `${API_URL}/api/Cart/add`,
          { userId, productId: product.id, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(addToCart({ productId: product.id, productName: product.name, price: product.price, quantity, images: product.images || [] }));
      } catch (error) {
        console.error("Помилка додавання товару в БД", error);
      }
    } else {
      const cartItem: CartItem = { productId: product.id, productName: product.name, price: product.price, quantity, images: product.images || [] };
      dispatch(addToCart(cartItem));

      const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cartItems.find(item => item.productId === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push(cartItem);
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (!products || products.length === 0) {
    return <div>Продукти не знайдено.</div>;
  }

  return (
    <div className="container mx-auto py-6 flex">
      {/* Відображаємо CategorySidebar тільки якщо ми не на головній сторінці */}
      {location.pathname.includes("/subcategory/") && <CategorySidebar onCategoryChange={() => {}} />}


      <div className="ml-6 flex-1">
        <h1 className="text-2xl font-bold mb-4">Продукти</h1>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: IProductItem) => (
            <li
              key={product.id}
              className="relative bg-white p-4 shadow-md rounded-lg overflow-hidden"
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={`${API_URL}/images/600_${product.images[0]}`}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              </Link>
              {hoveredProductId === product.id && (
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-80 text-white p-4 transition-all duration-300 ease-in-out">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <button onClick={() => handleQuantityChange(product.id, -1)} className="bg-gray-600 px-2 py-1 rounded-md">-</button>
                      <span className="mx-2">{productQuantities[product.id] || 1}</span>
                      <button onClick={() => handleQuantityChange(product.id, 1)} className="bg-gray-600 px-2 py-1 rounded-md">+</button>
                    </div>
                    <button onClick={() => handleAddToCart(product)} className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600">Додати в кошик</button>
                  </div>
                </div>
              )}
              <p>Модель: {product.modeles}</p>
              <p>Код: {product.code}</p>
              <p>Розмір: {product.size}</p>
              <p>Кількість в упаковці: {product.quantityInPack}</p>
              <p className="font-bold mt-2">{product.price} грн</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsPage;
// import { Link, useParams } from "react-router-dom";
// import { useGetProductsByCategoryIdQuery, useGetProductsBySubCategoryIdQuery } from "../../../services/productApi";
// import { API_URL } from "../../../env";
// import { IProductItem } from "../../../interfaces/products";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addToCart, CartItem } from "../../../interfaces/cart/cartSlice";
// import axios from "axios";
// import CategorySidebar from "./CategorySidebar"; // Додано Sidebar

// interface ProductsPageProps {
//   categoryId?: number;
//   subCategoryId?: number;
// }

// const ProductsPage: React.FC<ProductsPageProps> = ({ categoryId, subCategoryId }) => {
//   const { id } = useParams();
//   const subId = subCategoryId || Number(id);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(categoryId || null);

//   // Функція для зміни категорії
//   const handleCategoryChange = (id: number) => {
//     setSelectedCategory(id);
//   };

//   // Отримуємо продукти для категорії або підкатегорії
//   const { data: products, isLoading } = selectedCategory
//     ? useGetProductsByCategoryIdQuery(selectedCategory)
//     : useGetProductsBySubCategoryIdQuery(subId);

//   const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
//   const [productQuantities, setProductQuantities] = useState<Record<number, number>>({});
//   const dispatch = useDispatch();

//   const handleQuantityChange = (productId: number, increment: number) => {
//     setProductQuantities(prev => ({
//       ...prev,
//       [productId]: Math.max((prev[productId] || 1) + increment, 1),
//     }));
//   };

//   const handleAddToCart = async (product: IProductItem) => {
//     const token = localStorage.getItem("accessToken");
//     const userId = localStorage.getItem("userId");
//     const quantity = productQuantities[product.id] || 1;

//     if (token && userId) {
//       try {
//         await axios.post(
//           `${API_URL}/api/Cart/add`,
//           { userId, productId: product.id, quantity },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         dispatch(addToCart({ productId: product.id, productName: product.name, price: product.price, quantity, images: product.images || [] }));
//       } catch (error) {
//         console.error("Помилка додавання товару в БД", error);
//       }
//     } else {
//       const cartItem: CartItem = { productId: product.id, productName: product.name, price: product.price, quantity, images: product.images || [] };
//       dispatch(addToCart(cartItem));

//       const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
//       const existingItem = cartItems.find(item => item.productId === product.id);
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         cartItems.push(cartItem);
//       }
//       localStorage.setItem("cart", JSON.stringify(cartItems));
//     }
//   };

//   if (isLoading) {
//     return <div>Завантаження...</div>;
//   }

//   if (!products || products.length === 0) {
//     return <div>Продукти не знайдено.</div>;
//   }

//   return (
//     <div className="container mx-auto py-6 flex">
//       {/* Передаємо onCategoryChange у Sidebar */}
//       {/* <CategorySidebar onCategoryChange={handleCategoryChange} /> */}

//       <div className="ml-6 flex-1">
//         <h1 className="text-2xl font-bold mb-4">Продукти</h1>
//         <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {products.map((product: IProductItem) => (
//             <li
//               key={product.id}
//               className="relative bg-white p-4 shadow-md rounded-lg overflow-hidden"
//               onMouseEnter={() => setHoveredProductId(product.id)}
//               onMouseLeave={() => setHoveredProductId(null)}
//             >
//               <Link to={`/product/${product.id}`} className="block">
//                 <img
//                   src={`${API_URL}/images/600_${product.images[0]}`}
//                   alt={product.name}
//                   className="w-full h-40 object-cover rounded-t-lg"
//                 />
//                 <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
//               </Link>
//               {hoveredProductId === product.id && (
//                 <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-80 text-white p-4 transition-all duration-300 ease-in-out">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center">
//                       <button onClick={() => handleQuantityChange(product.id, -1)} className="bg-gray-600 px-2 py-1 rounded-md">-</button>
//                       <span className="mx-2">{productQuantities[product.id] || 1}</span>
//                       <button onClick={() => handleQuantityChange(product.id, 1)} className="bg-gray-600 px-2 py-1 rounded-md">+</button>
//                     </div>
//                     <button onClick={() => handleAddToCart(product)} className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600">Додати в кошик</button>
//                   </div>
//                 </div>
//               )}
//               <p>Модель: {product.modeles}</p>
//               <p>Код: {product.code}</p>
//               <p>Розмір: {product.size}</p>
//               <p>Кількість в упаковці: {product.quantityInPack}</p>
//               <p className="font-bold mt-2">{product.price} грн</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;
