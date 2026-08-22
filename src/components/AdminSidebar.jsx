import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import {
  Coffee,
  LayoutDashboard,
  Package,
  HelpCircle,
  MessageSquare,
  Tag,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink
} from "lucide-react";

export default function AdminSidebar() {
  const { adminLogout, shopInfo, inquiries } = useShop();
  const navigate = useNavigate();

  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;

  const handleLogout = () => {
    adminLogout();
    navigate("/ad-login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "FAQ Management", path: "/admin/faq", icon: HelpCircle },
    { name: "Inquiries", path: "/admin/inquiries", icon: MessageSquare, badge: newInquiriesCount },
    { name: "Offers & Deals", path: "/admin/offers", icon: Tag },
    { name: "Gallery Photos", path: "/admin/gallery", icon: ImageIcon },
    { name: "Shop Settings", path: "/admin/settings", icon: Settings }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link to="/" className="brand-logo" style={{ color: "var(--cream)", fontSize: "1.35rem" }}>
          <Coffee size={24} style={{ color: "var(--accent)" }} />
          <span>Brewora <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600 }}>CMS</span></span>
        </Link>
        <p style={{ color: "var(--text-light)", opacity: 0.6, fontSize: "0.75rem", marginTop: "0.4rem" }}>
          Master Roaster Portal (Frontend LocalStorage)
        </p>
      </div>

      <nav className="admin-nav">
        {navLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              <span style={{ flexGrow: 1 }}>{item.name}</span>
              {item.badge > 0 && (
                <span
                  style={{
                    background: "var(--accent)",
                    color: "var(--white)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.5rem",
                    borderRadius: "var(--radius-pill)"
                  }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <Link
          to="/"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            color: "var(--text-light)",
            fontSize: "0.85rem",
            marginBottom: "1rem",
            opacity: 0.8
          }}
        >
          <ExternalLink size={15} />
          <span>View Public Café Site</span>
        </Link>

        <button
          onClick={handleLogout}
          className="btn btn-outline-white btn-sm"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
