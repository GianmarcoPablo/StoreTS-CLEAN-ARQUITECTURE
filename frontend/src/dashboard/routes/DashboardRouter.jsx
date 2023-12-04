import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage, ProductsPage, CategoriesPage, CouponsPage, AddProductPage, EditProductPage, AddCategoryPage, Inactive } from "../page/";
import DashBoardLayout from "../layout/DashBoardLayout";
import UsersPage from "../page/UsersPage";

export default function DashboardRouter() {
    return (
        <Routes>
            <Route path="/" element={<DashBoardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="/sales" element={<h1>Sales</h1>} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/add" element={<AddProductPage />} />
                <Route path="/products/edit/:id" element={<EditProductPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/add" element={<AddCategoryPage />} />
                <Route path="/categories/edit/:id" element={<h1>Edit Category</h1>} />
                <Route path="/coupons" element={<CouponsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/inactive" element={<Inactive />} />
                <Route path="/*" element={<Navigate to={"/"} />} />
            </Route>
        </Routes>
    )
}
