import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import SectionTitle from "../components/SectionTitle";
import { menuCategories, fullMenuItems } from "../data/menu";
import { formatCurrency, getWhatsAppLink } from "../utils/storage";
import { Coffee, MessageSquare, Sparkles, Filter } from "lucide-react";

export default function Menu() {
  const { shopInfo } = useShop();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = activeCategory === "all"
    ? fullMenuItems
    : fullMenuItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Hero Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(23,18,15,0.9) 0%, rgba(62,39,35,0.85) 100%), url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--white)",
          padding: "5.5rem 0 4rem 0",
          textAlign: "center"
        }}
      >
        <div className="container-sm">
          <span className="section-badge dark">☕ Handcrafted Offerings</span>
          <h1 style={{ fontSize: "3.2rem", color: "var(--white)", marginBottom: "1rem" }}>
            The Café Menu
          </h1>
          <p style={{ color: "var(--text-light)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            From single-shot ristrettos and 18-hour cold drips to warm cultured French croissants and artisanal tiramisu.
          </p>
        </div>
      </section>

      {/* Menu Categories & Items */}
      <section className="section">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="menu-category-tabs">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                className={`menu-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: "1.5rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Showing <strong>{filteredItems.length}</strong> items in <em>{menuCategories.find(c => c.id === activeCategory)?.name}</em>
          </div>

          {/* Menu Items Grid */}
          <div className="menu-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="menu-item-card">
                <img src={item.image} alt={item.name} className="menu-item-thumb" loading="lazy" />
                <div className="menu-item-content">
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">{formatCurrency(item.price)}</span>
                  </div>
                  <p className="menu-item-desc">{item.description}</p>
                  <div className="menu-item-footer">
                    <span className="menu-item-meta">
                      {item.tag && <span style={{ marginRight: "0.5rem" }}>✨ {item.tag}</span>}
                      {item.calories && <span style={{ color: "var(--text-muted)" }}>• {item.calories}</span>}
                    </span>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Link
                        to={`/inquiry?product=${encodeURIComponent(item.name)}`}
                        className="btn btn-primary btn-sm"
                        style={{ padding: "0.35rem 0.8rem", fontSize: "0.78rem" }}
                      >
                        Inquire
                      </Link>
                      <a
                        href={getWhatsAppLink(shopInfo.whatsapp, `Hello ${shopInfo.name}, I would like to order *${item.name}* from your menu.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-sm btn-icon"
                        style={{ width: "32px", height: "32px" }}
                        title="Order on WhatsApp"
                      >
                        <MessageSquare size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note Banner */}
          <div
            style={{
              background: "var(--cream-card)",
              border: "1px solid var(--border-strong)",
              borderRadius: "var(--radius-md)",
              padding: "2rem",
              marginTop: "4rem",
              textAlign: "center"
            }}
          >
            <h3 style={{ color: "var(--secondary)", fontSize: "1.3rem", marginBottom: "0.5rem" }}>
              🌱 Dietary & Milk Customizations
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "680px", margin: "0 auto 1.5rem auto" }}>
              All beverages can be prepared with your choice of Oatly Oat Milk, Almond Breeze Almond Milk, or Swiss Water Decaf Espresso upon request.
            </p>
            <Link to="/inquiry" className="btn btn-outline btn-sm">
              Custom Dietary Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
