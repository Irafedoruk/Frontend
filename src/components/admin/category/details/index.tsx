import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../../env/index.ts";
import { useGetCategoryQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../../services/categoryApi.ts";
import Loader from "../../../common/Loader/index.tsx";

const CategoryViewPage = () => {
    const { id } = useParams(); // Отримуємо ID категорії з URL
    const [category, setCategory] = useState<any>(null);
    const [subCategories, setSubCategories] = useState<any[]>([]);

    const { data: categoryData, isLoading: categoryLoading } = useGetCategoryQuery(Number(id));
    const { data: subCategoryData, isLoading: subCategoryLoading } = useGetSubCategoriesByCategoryIdQuery(Number(id));

    useEffect(() => {
        if (categoryData) {
            setCategory(categoryData);
        }
        if (subCategoryData) {
            // Фільтруємо підкатегорії, щоб показувати тільки ті, що належать поточній категорії
            const filteredSubCategories = subCategoryData.filter((subCategory: any) => subCategory.categoryId === Number(id));
            setSubCategories(filteredSubCategories);
        }
    }, [categoryData, subCategoryData, id]);

    if (categoryLoading || subCategoryLoading) return <Loader loading={true} size={150} color="#1f2937" />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Інформація про категорію</h1>

            {category && (
                <div className="mb-6">
                    <div className="mb-2">
                        <span className="font-semibold">Назва:</span> {category.name}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Опис:</span> {category.description}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Зображення:</span>
                        <img
                            src={`${API_URL}/images/300_${category.imageCategory}`}
                            alt={category.name}
                            className="h-32 w-32 object-cover rounded mt-2"
                        />
                    </div>
                </div>
            )}

            <h2 className="text-xl font-semibold mt-6 mb-4">Підкатегорії</h2>
            <ul>
                {subCategories?.length > 0 ? (
                    subCategories.map((subCategory: any) => (
                        <li key={subCategory.id} className="mb-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
                            <div className="mb-2">
                                <span className="font-semibold">Назва підкатегорії:</span> {subCategory.name}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Зображення підкатегорії:</span>
                                <img
                                    src={`${API_URL}/images/300_${subCategory.imageSubCategory}`}
                                    alt={subCategory.name}
                                    className="h-16 w-16 object-cover rounded mt-2"
                                />
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Немає підкатегорій для цієї категорії.</p>
                )}
            </ul>
        </div>
    );
};

export default CategoryViewPage;
