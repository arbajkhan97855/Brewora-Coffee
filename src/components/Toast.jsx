import React from "react";
import { useShop } from "../context/ShopContext";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export default function Toast() {
  const { toast, hideToast } = useShop();

  if (!toast || !toast.visible) return null;

  const isError = toast.type === "error";

  return (
    <div className="toast-container">
      <div className={`toast-item ${isError ? "error" : ""}`}>
        {isError ? (
          <AlertCircle size={20} style={{ color: "#f87171", flexShrink: 0 }} />
        ) : (
          <CheckCircle size={20} style={{ color: "var(--accent)", flexShrink: 0 }} />
        )}
        <div style={{ flexGrow: 1 }}>{toast.message}</div>
        <button
          onClick={hideToast}
          aria-label="Dismiss toast"
          style={{ color: "var(--text-light)", opacity: 0.7, padding: "2px" }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
