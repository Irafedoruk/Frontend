import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useGetCategoriesQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi"; // Ваш API запит
import Footer from "./Footer";

const ClientLayout = () => {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery(); // Отримуємо категорії
  const [subCategories, setSubCategories] = useState<{ [key: number]: any[] }>({});

  // Отримуємо підкатегорії для категорії при наведенні
  const { data: subCategoryData, isLoading: subCategoriesLoading, isError } = useGetSubCategoriesByCategoryIdQuery(hoveredCategory ?? -1, {
    skip: hoveredCategory === null, // Пропускаємо запит, якщо категорія не вибрана
  });

  // Зберігаємо підкатегорії в стані, якщо вони були отримані
  if (subCategoryData && !subCategories[hoveredCategory ?? -1] && !subCategoriesLoading && !isError) {
    setSubCategories((prev) => ({
      ...prev,
      [hoveredCategory ?? -1]: subCategoryData,
    }));
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryHover = (categoryId: number) => {
    setHoveredCategory(categoryId); // Встановлюємо категорію для відображення підкатегорій
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null); // Закриваємо підкатегорії при виведенні миші
  };

  return (
    <div>
      <header className="bg-gray-800 text-white">
        <div className="bg-gray-700 p-2 text-sm flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>📚 <Link to="/books" className="hover:underline">Книги до зимових свят</Link></span>
            <span>🛒 Інтернет гуртівня книг №1 в Україні</span>
            <span>🌱 <Link to="/eco" className="hover:underline">Екошопери</Link></span>
          </div>
          <div>
            <a href="tel:+380683010220" className="hover:underline">
              📞 +38 068 301-02-20
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-orange-500">book</span>opt
          </Link>

          {/* Випадаюче меню з категоріями */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              📚 Каталог
            </button>

            {isMenuOpen && !categoriesLoading && categories && (
              <div className="absolute left-0 mt-2 w-64 bg-white text-black shadow-lg z-10">
                <ul className="p-4 space-y-2">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="relative"
                      onMouseEnter={() => handleCategoryHover(category.id)}
                      onMouseLeave={handleCategoryLeave}
                    >
                      <Link to={`/category/${category.id}`} className="hover:underline">
                        {category.name}
                      </Link>

                      {/* Відображення підкатегорій при наведенні на категорію */}
                      {hoveredCategory === category.id && subCategories[category.id] && (
                        <div className="absolute left-full top-0 mt-2 w-64 bg-white text-black shadow-lg">
                          <ul className="p-4 space-y-2">
                            {subCategories[category.id].map((subCategory) => (
                              <li key={subCategory.id}>
                                <Link to={`/subcategory/${subCategory.id}`} className="hover:underline">
                                  {subCategory.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center bg-white rounded-full px-3 py-2">
            <input
              type="text"
              placeholder="Я шукаю..."
              className="outline-none px-2 w-64"
              value={search}
              onChange={handleSearch}
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">
              🔍
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="flex items-center space-x-2">
              <span>🛒</span>
              <span>0 ₴</span>
            </Link>

            <Link to="/profile" className="hover:underline">
              👤
            </Link>

            <Link to="/wishlist" className="hover:underline">
              ❤️
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6 px-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default ClientLayout;
