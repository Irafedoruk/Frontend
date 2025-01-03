import {Route, Routes} from "react-router-dom";
// import ProductListPage from "./components/products/list";
// import ProductEditPage from "./components/products/edit";
// import ProductDetailPage from "./components/products/details/ProductDetailPage.tsx";
// import PostsList from "./components/post/list";
//import MainLayout from "./components/containers/default/index.tsx";
import HomePage from "./components/category/list/index.tsx";
import CategoryCreatePage from "./components/category/create/index.tsx";
import CategoryEditPage from "./components/category/edit/index.tsx";
import AdminLayout from "./components/containers/adminLayout.tsx";
import CategoriesListPage from "./components/category/list/index.tsx";
import SubCategoryCreatePage from "./components/subcategory/create/index.tsx";
import SubCategoryEditPage from "./components/subcategory/edit/index.tsx";
import SubCategoryListPage from "./components/subcategory/list/index.tsx";
import ProductListPage from "./components/products/list/index.tsx";
import ProductCreatePage from "./components/products/create/index.tsx";
// import ProductCreatePage from "./components/products/create";

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

                    {/* Підкатегорії */}
                    <Route path="subcategories" element={<SubCategoryListPage />} />
                    <Route path="subcategories/create" element={<SubCategoryCreatePage />} />
                    <Route path="subcategories/edit/:id" element={<SubCategoryEditPage />} />
                
                    {/* PRODUCTS */}
                    <Route path={"products"}>
                    <Route index element={<ProductListPage />} />
                    <Route path="create" element={<ProductCreatePage />} />
                    {/* <Route path="edit/:id" element={<ProductEditPage />} /> */}
                    {/* <Route path="details/:id" element={<ProductDetailPage />} /> */}
                    </Route>
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