import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import { formatCurrency, getWhatsAppLink } from "../utils/storage";
import {
  Star,
  MessageSquare,
  ArrowLeft,
  Send,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, shopInfo } = useShop();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  if (!product) {
    return (
      <div className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "var(--secondary)", marginBottom: "1rem" }}>
            Coffee Not Found
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            The coffee roast or beverage you are looking for is currently unavailable or has been relocated.
          </p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Return to Coffee Products</span>
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const whatsappMessage = `Hello ${shopInfo.name}, I would like to order *${quantity}x ${product.name}* (Price: ${formatCurrency(product.price * quantity)}). Please let me know the availability!`;

  const relatedProducts = products
    .filter((p) => String(p.id) !== String(product.id) && p.category === product.category)
    .slice(0, 3);

  return (
    <div>
      {/* Breadcrumb Bar */}
      <div style={{ background: "var(--cream-alt)", padding: "1rem 0", borderBottom: "1px solid var(--border-light)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <Link to="/" style={{ color: "var(--secondary)" }}>Home</Link>
            <span>/</span>
            <Link to="/products" style={{ color: "var(--secondary)" }}>Products</Link>
            <span>/</span>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Details Section */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: "2rem" }}>
            <Link
              to="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--accent)",
                fontWeight: 600,
                fontSize: "0.9rem"
              }}
            >
              <ArrowLeft size={16} /> Back to all coffee products
            </Link>
          </div>

          <div className="product-detail-grid">
            {/* Product Image Gallery */}
            <div className="product-detail-gallery">
              <img
                src={product.image || "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80"}
                alt={product.name}
                className="product-detail-main-img"
              />
            </div>

            {/* Product Meta & Actions */}
            <div className="product-detail-info">
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.3rem 0.8rem",
                    background: "rgba(192, 139, 92, 0.15)",
                    color: "var(--accent)",
                    border: "1px solid var(--accent)",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.8rem"
                  }}
                >
                  {product.category}
                </span>

                <h1 style={{ fontSize: "2.5rem", color: "var(--white)", marginBottom: "0.8rem" }}>
                  {product.name}
                </h1>

                {/* Rating & Reviews */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
                  <div className="star-rating" style={{ fontSize: "1.05rem" }}>
                    <Star size={18} fill="#F59E0B" color="#F59E0B" />
                    <span>{product.rating || "4.9"}</span>
                  </div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    Based on {product.reviews || 120} certified tastings
                  </span>
                  <span style={{ color: "var(--success)", fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <CheckCircle2 size={14} /> Available Today
                  </span>
                </div>

                {/* Price Display */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", margin: "1.2rem 0" }}>
                  <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--accent)", fontFamily: "var(--font-serif)" }}>
                    {formatCurrency(product.price)}
                  </span>
                  {product.oldPrice && product.oldPrice > product.price && (
                    <span style={{ fontSize: "1.3rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
                      {formatCurrency(product.oldPrice)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="product-discount-badge" style={{ position: "static" }}>
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
                {product.description}
              </p>

              {/* Origin & Roast Details */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  background: "var(--bg-card)",
                  padding: "1.2rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-dark)"
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                    Origin / Estate
                  </span>
                  <strong style={{ color: "var(--white)", fontSize: "0.95rem" }}>
                    {product.origin || "Shade-Grown Chikmagalur"}
                  </strong>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                    Roast Profile
                  </span>
                  <strong style={{ color: "var(--white)", fontSize: "0.95rem" }}>
                    {product.roastLevel || "Medium-Dark Roast"}
                  </strong>
                </div>
              </div>

              {/* Ingredients / Composition */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div>
                  <h4 style={{ fontSize: "0.95rem", color: "var(--white)", fontWeight: 700, marginBottom: "0.5rem" }}>
                    Key Ingredients & Notes:
                  </h4>
                  <div className="ingredients-chips">
                    {product.ingredients.map((ing, idx) => (
                      <span key={idx} className="ingredient-chip">
                        ☕ {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action CTAs */}
              <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-dark)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
                  <span style={{ fontWeight: 600, color: "var(--white)", fontSize: "0.95rem" }}>
                    Quantity:
                  </span>
                  <div className="quantity-control">
                    <button onClick={handleDecrease} className="quantity-btn" aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span className="quantity-val">{quantity}</span>
                    <button onClick={handleIncrease} className="quantity-btn" aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    Subtotal: <strong style={{ color: "var(--accent)" }}>{formatCurrency(product.price * quantity)}</strong>
                  </span>
                </div>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link
                    to={`/inquiry?product=${encodeURIComponent(product.name)}&quantity=${quantity}`}
                    className="btn btn-primary btn-lg"
                    style={{ flexGrow: 1 }}
                  >
                    <Send size={18} />
                    <span>Send Inquiry for this Coffee</span>
                  </Link>

                  <a
                    href={getWhatsAppLink(shopInfo.whatsapp, whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                  >
                    <MessageSquare size={18} />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid var(--border-dark)",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <ShieldCheck size={18} color="var(--accent)" />
                  <span>100% Specialty Grade Certified</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <Truck size={18} color="var(--accent)" />
                  <span>Fresh Express Takeaway & Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: "6rem" }}>
              <h2 style={{ fontSize: "2rem", color: "var(--white)", marginBottom: "2rem", textAlign: "center" }}>
                You May Also Enjoy
              </h2>
              <div className="product-grid">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
