import { Link, useParams } from "react-router-dom";
import { useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
import { ISubCategoryItem } from "../../../interfaces/subcategory";
import { API_URL } from "../../../env";

const CategoryPage = () => {
  const { id } = useParams(); // ID категорії з URL
  const categoryId = Number(id); // Перетворення на число
  const { data: subCategories, isLoading } = useGetSubCategoriesByCategoryIdQuery(-1); // Завантаження всіх підкатегорій

  // Фільтрація підкатегорій
  const filteredSubCategories = subCategories?.filter(
    (subсategory: ISubCategoryItem) => subсategory.categoryId === categoryId
  );

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (!filteredSubCategories || filteredSubCategories.length === 0) {
    return <div>Підкатегорії не знайдено для цієї категорії</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Підкатегорії</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredSubCategories.map((subсategory: ISubCategoryItem) => (
          <li key={subсategory.id} className="bg-white p-4 shadow-md rounded-lg">
            <img
              src={`${API_URL}/images/300_${subсategory.imageSubCategory}`}
              alt={subсategory.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{subсategory.name}</h2>
            <Link
              to={`/subcategory/${subсategory.id}/products`}
              className="text-blue-500 hover:underline mt-2 block"
            >
              Переглянути продукти
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
