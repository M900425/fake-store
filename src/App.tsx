import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage/HomePage";
import CartPage from "@/pages/CartPage/CartPage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import LoginPage from "@/pages/LoginPage/LoginPage";

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/catalog" replace />} />
            <Route path="catalog" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/index.html"
            element={<Navigate to="/catalog" replace />}
          />
          <Route path="*" element={<Navigate to="/catalog" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
