import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { getWhatsAppLink, formatCurrency } from "../utils/storage";
import { Star, MessageSquare, ArrowRight, Eye, Sparkles } from "lucide-react";

export default function ProductCard({ product }) {
  const { shopInfo } = useShop();

  if (!product) return null;

  const discountPercent = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const whatsappMessage = `Hello ${shopInfo.name}, I am interested in ordering/inquiring about *${product.name}* (Price: ${formatCurrency(product.price)}).`;

  return (
    <div className="product-card">
      <div className="product-img-wrapper">
        <img
          src={product.image || "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80"}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
        <span className="product-category-pill">{product.category}</span>

        {discountPercent > 0 && (
          <span className="product-discount-badge">
            {discountPercent}% OFF
          </span>
        )}

        {product.featured && (
          <span
            style={{
              position: "absolute",
              bottom: "0.8rem",
              left: "0.8rem",
              background: "rgba(192, 139, 92, 0.9)",
              color: "white",
              padding: "0.25rem 0.65rem",
              borderRadius: "var(--radius-pill)",
              fontSize: "0.72rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              backdropFilter: "blur(4px)"
            }}
          >
            <Sparkles size={12} /> Bestseller
          </span>
        )}
      </div>

      <div className="product-card-body">
        <div className="product-rating-row">
          <div className="star-rating">
            <Star size={14} fill="#F59E0B" color="#F59E0B" />
            <span>{product.rating || "4.8"}</span>
          </div>
          <span className="product-reviews-count">({product.reviews || 42} reviews)</span>
        </div>

        <h3 className="product-title">
          <Link to={`/product/${product.id}`} style={{ color: "inherit" }}>
            {product.name}
          </Link>
        </h3>

        <p className="product-desc-snippet">{product.description}</p>

        <div className="product-price-row">
          <span className="current-price">{formatCurrency(product.price)}</span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="old-price">{formatCurrency(product.oldPrice)}</span>
          )}
        </div>

        <div className="product-card-actions">
          <Link to={`/product/${product.id}`} className="btn btn-outline btn-sm" style={{ width: "100%" }}>
            <Eye size={14} />
            <span>View Details</span>
          </Link>

          <a
            href={getWhatsAppLink(shopInfo.whatsapp, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm btn-icon"
            title="Quick Order via WhatsApp"
            aria-label="WhatsApp Order"
          >
            <MessageSquare size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
