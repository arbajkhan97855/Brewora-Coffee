import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { User, ShieldCheck, RefreshCw } from "lucide-react";

export default function AdminHeader({ title, subtitle, actionButton }) {
  const { adminInfo, resetProductsToDefault, resetShopInfoToDefault } = useShop();

  return (
    <header className="admin-header">
      <div>
        <h2 style={{ fontSize: "1.4rem", color: "var(--secondary)", fontWeight: 700 }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "2px" }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {actionButton}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.4rem 0.9rem",
            background: "var(--cream)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-pill)",
            fontSize: "0.85rem",
            color: "var(--secondary)"
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "var(--primary)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <User size={15} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.8rem", lineHeight: 1.1 }}>
              {adminInfo.email}
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--accent)", display: "flex", alignItems: "center", gap: "3px" }}>
              <ShieldCheck size={11} /> Admin Active
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
