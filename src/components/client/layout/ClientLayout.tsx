import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery, useGetSubCategoriesByCategoryIdQuery } from "../../../services/categoryApi";
import Footer from "./Footer";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { clearCart } from "../../../interfaces/cart/cartSlice";

const ClientLayout = () => {
  const token = localStorage.getItem("accessToken"); // Change to check for accessToken
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState<any[]>([]);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = cartItems.reduce((total, item) => total + item.quantity, 0); // Підрахунок кількості товарів
  const dispatch = useDispatch(); 

  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: subCategoryData, isLoading: subCategoriesLoading } = useGetSubCategoriesByCategoryIdQuery(
    hoveredCategory ?? -1,
    { skip: hoveredCategory === null }
  );

  useEffect(() => {
    if (subCategoryData && hoveredCategory !== null) {
      const filtered = subCategoryData.filter(
        (subCategory: any) => subCategory.categoryId === hoveredCategory
      );
      setFilteredSubCategories(filtered);
    }
  }, [subCategoryData, hoveredCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryHover = (categoryId: number) => {
    setHoveredCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
    setFilteredSubCategories([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");

    // Очищення кошика в Redux
    dispatch(clearCart());

    alert("Ви успішно вийшли з системи!");
    navigate("/");
  };

  const navigate = useNavigate();

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
            <a href="tel:+380683010220" className="hover:underline">📞 +38 068 301-02-20</a>
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-orange-500">book</span>opt
          </Link>

          <div className="relative">
            <button onClick={toggleMenu} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
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
                      <Link to={`/category/${category.id}`} className="hover:underline">{category.name}</Link>
                      {hoveredCategory === category.id && (
                        <div className="absolute left-full top-0 mt-2 w-64 bg-white text-black shadow-lg">
                          <ul className="p-4 space-y-2">
                            {filteredSubCategories.map((subCategory) => (
                              <li key={subCategory.id}>
                                <Link to={`/subcategory/${subCategory.id}/products`} className="hover:underline">
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
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">🔍</button>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="flex items-center space-x-2">
              <span>🛒</span>
              <span>{cartTotal}</span> {/* Тут показуємо кількість товарів у кошику */}
              <span>0 ₴</span>
            </Link>

            <nav className="flex items-center space-x-4">
              {token ? (
                <>
                  <Link to="/profile" className="text-white text-2xl hover:text-orange-500"><FaUser /></Link>
                  <button onClick={handleLogout} className="text-white text-2xl hover:text-orange-500">
                    <FaSignOutAlt />
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-white text-2xl hover:text-orange-500"><FaSignInAlt /></Link>
              )}
            </nav>

            <Link to="/wishlist" className="hover:underline">❤️</Link>
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
