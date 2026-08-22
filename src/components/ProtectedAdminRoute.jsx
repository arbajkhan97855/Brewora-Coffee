import React from "react";
import { Navigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function ProtectedAdminRoute({ children }) {
  const { isAdminLoggedIn } = useShop();

  const isAuth = isAdminLoggedIn || localStorage.getItem("adminLoggedIn") === "true";

  if (!isAuth) {
    return <Navigate to="/ad-login" replace />;
  }

  return children;
}
