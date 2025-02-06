import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../services/productApi";
import { API_URL } from "../../../env";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../interfaces/cart/cartSlice";
import { useState } from "react";

const ProductPage = () => {
  const { id } = useParams();
  const productId = id ? Number(id) : null;
  const { data: product, isLoading } = useGetProductByIdQuery(productId!, {
    skip: productId === null,
  });
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleQuantityChange = (increment: number) => {
    setQuantity((prev) => Math.max(prev + increment, 1));
  };
  

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        images: product.images || [],
      }));
    }
  };

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (!product) {
    return <div>Продукт не знайдено</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={`${API_URL}/images/300_${product.images[0]}`}
          alt={product.name}
          className="w-full object-cover rounded-lg"
        />

        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p><strong>Виробник:</strong> {product.manufacturer}</p>
          <p><strong>Модель:</strong> {product.modeles}</p>
          <p><strong>Код:</strong> {product.code}</p>
          <p><strong>Ціна:</strong> {product.price} грн</p>

          <div className="flex items-center mt-4">
            <span className="mr-2">Кількість:</span>
            <button onClick={() => handleQuantityChange(-1)} className="bg-gray-600 px-3 py-1 rounded-md">-</button>
            <span className="mx-2">{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="bg-gray-600 px-3 py-1 rounded-md">+</button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Купити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
