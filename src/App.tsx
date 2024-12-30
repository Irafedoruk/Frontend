import {Route, Routes} from "react-router-dom";
// import ProductListPage from "./components/products/list";
// import ProductEditPage from "./components/products/edit";
// import ProductDetailPage from "./components/products/details/ProductDetailPage.tsx";
// import PostsList from "./components/post/list";
//import MainLayout from "./components/containers/default/index.tsx";
import HomePage from "./components/home/index.tsx";
import CategoryCreatePage from "./components/category/create/index.tsx";
import CategoryEditPage from "./components/category/edit/index.tsx";
import AdminDashboard from "./components/containers/default/index.tsx";
import AdminLayout from "./components/containers/adminLayout.tsx";
import CategoriesListPage from "./components/home/index.tsx";
// import ProductCreatePage from "./components/products/create";

export default function App() {
    return (
        <>
            <Routes>
                {/* Маршрути адміністратора */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<h1>Головна сторінка адміністратора</h1>} />
                    <Route path="categories" element={<CategoriesListPage />} />
                    <Route path="categories/create" element={<CategoryCreatePage />} />
                    <Route path="categories/edit/:id" element={<CategoryEditPage />} />
                </Route>
                {/* Сторінка 404 */}
                <Route path="*" element={<h1>Сторінка не знайдена</h1>} />
                    {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                    {/*<Route path="*" element={<NoMatch />} />*/}

                    {/* PRODUCTS */}
                    {/* <Route path={"products"}>
                        <Route index element={<ProductListPage />} />
                        <Route path="create" element={<ProductCreatePage />} />
                        <Route path="edit/:id" element={<ProductEditPage />} />
                        <Route path="details/:id" element={<ProductDetailPage />} />
                    </Route>

                    <Route path={"posts"}>
                        <Route index element={<PostsList />} />
                    </Route> */}
                
            </Routes>
        </>
    )
}