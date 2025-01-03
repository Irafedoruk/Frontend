import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../env/index.ts";
import { useGetCategoryQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi.ts";
import Loader from "../../common/Loader/index.tsx";

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
            setSubCategories(subCategoryData);
        }
    }, [categoryData, subCategoryData]);

    if (categoryLoading || subCategoryLoading) return <Loader loading={true} size={150} color="#1f2937" />;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Інформація про категорію</h1>

            {category && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">{category.name}</h2>
                    <img
                        src={`${API_URL}/images/300_${category.imageCategory}`}
                        alt={category.name}
                        className="h-32 w-32 object-cover rounded mb-4"
                    />
                    <p>{category.description}</p>
                </div>
            )}

            <h2 className="text-xl font-semibold mt-6 mb-4">Підкатегорії</h2>
            <ul>
                {subCategories?.length > 0 ? (
                    subCategories.map((subCategory: any) => (
                        <li key={subCategory.id} className="mb-4">
                            <h3 className="text-lg font-medium">{subCategory.name}</h3>
                            <img
                                src={`${API_URL}/images/300_${subCategory.imageSubCategory}`}
                                alt={subCategory.name}
                                className="h-16 w-16 object-cover rounded"
                            />
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
