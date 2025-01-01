import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery, useDeleteProductMutation } from "../../../services/productApi";
import { API_URL } from "../../../env";
import Loader from "../../common/Loader";

const ProductListPage: React.FC = () => {
    const { data: products, isLoading, refetch } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [subcategories, setSubCategories] = useState<{ id: number; name: string }[]>([]);

    const handleDelete = async (id: number) => {
        if (window.confirm("Ви впевнені, що хочете видалити цей товар?")) {
            try {
                await deleteProduct(id).unwrap();
                alert("Товар успішно видалено.");
                refetch();
            } catch (err) {
                console.error("Помилка при видаленні товару:", err);
                alert("Не вдалося видалити товар.");
            }
        }
    };

    useEffect(() => {
        // Завантаження підкатегорій для відображення
        fetch(`http://localhost:5126/api/SubCategory`)
            .then((response) => response.json())
            .then((data) => setSubCategories(data))
            .catch((err) => console.error("Помилка завантаження підкатегорій:", err));
    }, []);

    if (isLoading) return <Loader loading={isLoading} size={150} color={"#1f2937"} />;
    if (!products) return <div>Список продуктів відсутній.</div>;

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Список товарів</h1>
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Зображення</th>
                        <th className="p-2 border">Назва</th>
                        <th className="p-2 border">Підкатегорія</th>
                        <th className="p-2 border">Ціна</th>
                        <th className="p-2 border">Кількість на складі</th>
                        <th className="p-2 border">Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} className="hover:bg-gray-100">
                            <td className="p-2 border text-center">{index + 1}</td>
                            <td className="p-2 border text-center">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={`${API_URL}/images/300_${product.images[0]}`}
                                        alt={product.name}
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                ) : (
                                    "Немає зображення"
                                )}
                            </td>
                            <td className="p-2 border">{product.name}</td>
                            <td className="p-2 border">
                                {subcategories.find((cat) => cat.id === product.subCategoryId)?.name || "Невідома підкатегорія"}
                            </td>
                            <td className="p-2 border">{product.price} грн</td>
                            <td className="p-2 border">{product.quantityInStock}</td>
                            <td className="p-2 border text-center space-x-2">
                                <Link
                                    to={`/admin/products/view/${product.id}`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Переглянути
                                </Link>
                                <Link
                                    to={`/admin/products/edit/${product.id}`}
                                    className="text-yellow-600 hover:text-yellow-800"
                                >
                                    Редагувати
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Видалити
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ProductListPage;
