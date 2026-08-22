import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Toast from "./components/Toast";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Gallery from "./pages/Gallery";
import Offers from "./pages/Offers";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Inquiry from "./pages/Inquiry";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

// Admin CMS Pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminFAQ from "./admin/AdminFAQ";
import AdminInquiries from "./admin/AdminInquiries";
import AdminOffers from "./admin/AdminOffers";
import AdminGallery from "./admin/AdminGallery";
import AdminSettings from "./admin/AdminSettings";

function AppContent() {
  const location = useLocation();
  const isAdminPath =
    location.pathname.startsWith("/admin") || location.pathname === "/ad-login";

  return (
    <div className="app-wrapper">
      <ScrollToTop />
      <Toast />

      {!isAdminPath && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inquiry" element={<Inquiry />} />

        {/* Admin Login Route */}
        <Route path="/ad-login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <AdminProducts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/faq"
          element={
            <ProtectedAdminRoute>
              <AdminFAQ />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/inquiries"
          element={
            <ProtectedAdminRoute>
              <AdminInquiries />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/offers"
          element={
            <ProtectedAdminRoute>
              <AdminOffers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <ProtectedAdminRoute>
              <AdminGallery />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <AdminSettings />
            </ProtectedAdminRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminPath && <WhatsAppButton />}
      {!isAdminPath && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ShopProvider>
  );
}
