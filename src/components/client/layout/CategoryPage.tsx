import { Link, useParams } from "react-router-dom";
import { useGetProductsByCategoryIdQuery } from "../../../services/productApi";
import CategorySidebar from "./CategorySidebar";
import { API_URL } from "../../../env";
import { ISubCategoryItem } from "../../../interfaces/subcategory";
import { useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
import ProductsPage from "./ProductsPage";
import { useState, useEffect } from "react";

const CategoryPage = () => {
    const { id } = useParams();
    const [categoryId, setCategoryId] = useState<number>(Number(id));

    useEffect(() => {
        setCategoryId(Number(id)); // Оновлюємо categoryId при зміні URL
    }, [id]);

    const { data: subCategories, isLoading: subCategoriesLoading } = useGetSubCategoriesByCategoryIdQuery(categoryId);
    const { data: products, isLoading: productsLoading } = useGetProductsByCategoryIdQuery(categoryId);

    if (subCategoriesLoading || productsLoading) {
        return <div>Завантаження...</div>;
    }

    // Фільтрація підкатегорій за categoryId
    const filteredSubCategories = subCategories?.filter((sub: ISubCategoryItem) => sub.categoryId === categoryId) || [];

    return (
        <div className="container mx-auto py-6 flex">
            {/* Передаємо `setCategoryId` у `CategorySidebar`, щоб керувати категорією */}
            <CategorySidebar onCategoryChange={setCategoryId} />

            <div className="ml-6 flex-1">
                <h1 className="text-2xl font-bold mb-4">Підкатегорії</h1>
                {filteredSubCategories.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredSubCategories.map((sub: ISubCategoryItem) => (
                            <li key={sub.id} className="bg-white p-4 shadow-md rounded-lg">
                                <img
                                    src={`${API_URL}/images/300_${sub.imageSubCategory}`}
                                    alt={sub.name}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                />
                                <h2 className="text-lg font-semibold mt-2">{sub.name}</h2>
                                <Link to={`/subcategory/${sub.id}/products`} className="text-blue-500 hover:underline mt-2 block">
                                    Переглянути продукти
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>У цій категорії немає підкатегорій.</p>
                )}

                {/* Відображення продуктів цієї категорії */}
                <h1 className="text-2xl font-bold mt-8 mb-4">Продукти</h1>
                <ProductsPage categoryId={categoryId} />
            </div>
        </div>
    );
};

export default CategoryPage;
