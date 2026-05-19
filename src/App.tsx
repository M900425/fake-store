import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import MainLayout from '@/layouts/MainLayout';
import CartPage from '@/pages/CartPage/CartPage';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import CatalogPage from '@/pages/CatalogPage/CatalogPage';

export default function App() {
    return (
        <ConfigProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route
                            index
                            element={<Navigate to="/catalog/all" replace />}
                        />
                        <Route
                            path="catalog/:category?"
                            element={<CatalogPage />}
                        />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/index.html"
                        element={<Navigate to="/catalog/all" replace />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/catalog/all" replace />}
                    />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}
