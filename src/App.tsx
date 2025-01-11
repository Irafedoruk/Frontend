import {Route, Routes} from "react-router-dom";
import CategoryCreatePage from "./components/admin/category/create/index.tsx";
import CategoryEditPage from "./components/admin/category/edit/index.tsx";
import AdminLayout from "./components/admin/containers/adminLayout.tsx";
import CategoriesListPage from "./components/admin/category/list/index.tsx";
import SubCategoryCreatePage from "./components/admin/subcategory/create/index.tsx";
import SubCategoryEditPage from "./components/admin/subcategory/edit/index.tsx";
import SubCategoryListPage from "./components/admin/subcategory/list/index.tsx";
import ProductListPage from "./components/admin/products/list/index.tsx";
import ProductCreatePage from "./components/admin/products/create/index.tsx";
import ProductEditPage from "./components/admin/products/edit/index.tsx";
import CategoryViewPage from "./components/admin/category/details/index.tsx";
import ClientLayout from "./components/client/layout/ClientLayout.tsx";
import HomePage from "./components/client/home/HomePage.tsx";

export default function App() {
    return (
        <>
            <Routes>
                {/* Маршрути адміністратора */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<h1>Головна сторінка адміністратора</h1>} />

                    {/* Категорії */}
                    <Route path="categories" element={<CategoriesListPage />} />
                    <Route path="categories/create" element={<CategoryCreatePage />} />
                    <Route path="categories/edit/:id" element={<CategoryEditPage />} />
                    <Route path="categories/view/:id" element={<CategoryViewPage />} />

                    {/* Підкатегорії */}
                    <Route path="subcategories" element={<SubCategoryListPage />} />
                    <Route path="subcategories/create" element={<SubCategoryCreatePage />} />
                    <Route path="subcategories/edit/:id" element={<SubCategoryEditPage />} />
                
                    {/* PRODUCTS */}
                    <Route path={"products"}>
                    <Route index element={<ProductListPage />} />
                    <Route path="create" element={<ProductCreatePage />} />
                    <Route path="edit/:id" element={<ProductEditPage />} />
                    {/* <Route path="details/:id" element={<ProductDetailPage />} /> */}
                    </Route>
                </Route>
                {/* Layout для клієнтів */}
                <Route path="/" element={<ClientLayout />}>
                    <Route index element={<HomePage />} />
                    {/* <Route path="about" element={<AboutPage />} /> */}
                </Route>
                {/* Сторінка 404 */}
                <Route path="*" element={<h1>Сторінка не знайдена</h1>} />

                    
                    

                   {/* <Route path={"posts"}>
                        <Route index element={<PostsList />} />
                    </Route> */}
                
            </Routes>
        </>
    )
}