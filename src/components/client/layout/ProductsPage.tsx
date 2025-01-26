import { useParams } from "react-router-dom";
import { useGetProductsBySubCategoryIdQuery } from "../../../services/productApi";
import { API_URL } from "../../../env";
import { IProductItem } from "../../../interfaces/products";

const ProductsPage = () => {
  const { id } = useParams(); // ID підкатегорії з URL
  const subCategoryId = Number(id); // Перетворення на число
  const { data: products, isLoading } = useGetProductsBySubCategoryIdQuery(subCategoryId);

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
          <li key={product.id} className="bg-white p-4 shadow-md rounded-lg">
            <img
              src={`${API_URL}/images/300_${product.images}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold mt-2">{product.price} грн</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
