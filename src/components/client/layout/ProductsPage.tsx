import { useParams } from "react-router-dom";
import { useGetProductsBySubCategoryIdQuery } from "../../../services/productApi";
import { API_URL } from "../../../env";
import { IProductItem } from "../../../interfaces/products";
import { useState } from "react";

const ProductsPage = () => {
  const { id } = useParams(); // ID підкатегорії з URL
  const subCategoryId = Number(id);
  const { data: products, isLoading } = useGetProductsBySubCategoryIdQuery(subCategoryId);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

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
                  <button className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600">Купити</button>
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
