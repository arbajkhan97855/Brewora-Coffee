import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import SectionTitle from "../components/SectionTitle";
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";

export default function Gallery() {
  const { gallery } = useShop();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  const categories = [
    "All",
    "Latte Art",
    "Café Interior",
    "Coffee Making",
    "Beans & Roastery",
    "Bakery",
    "Barista Life"
  ];

  const filteredItems = selectedCategory === "All"
    ? gallery
    : gallery.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase());

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") setActiveLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, filteredItems]);

  const openLightbox = (index) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const handlePrev = () => {
    setActiveLightboxIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveLightboxIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  const currentItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div>
      {/* Hero Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(23,18,15,0.92) 0%, rgba(62,39,35,0.85) 100%), url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--white)",
          padding: "5.5rem 0 4rem 0",
          textAlign: "center"
        }}
      >
        <div className="container-sm">
          <span className="section-badge dark">📷 Visual Coffee Odyssey</span>
          <h1 style={{ fontSize: "3.2rem", color: "var(--white)", marginBottom: "1rem" }}>
            The Brewora Gallery
          </h1>
          <p style={{ color: "var(--text-light)", fontSize: "1.1rem", maxWidth: "620px", margin: "0 auto" }}>
            Capturing the craft, community, aroma, and intimate stories born across our café tables.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="menu-category-tabs" style={{ marginBottom: "2.5rem" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`menu-tab-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveLightboxIndex(null);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: "1.5rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Showing <strong>{filteredItems.length}</strong> photo memories in <em>{selectedCategory}</em>
          </div>

          {/* Grid Layout */}
          <div className="gallery-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => openLightbox(index)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="gallery-card-overlay">
                  <span style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase" }}>
                    {item.category}
                  </span>
                  <h4 style={{ color: "white", fontSize: "1.15rem", margin: "0.2rem 0" }}>
                    {item.title}
                  </h4>
                  {item.caption && (
                    <p style={{ fontSize: "0.85rem", color: "var(--text-light)", opacity: 0.9 }}>
                      {item.caption}
                    </p>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.6rem", fontSize: "0.8rem", color: "var(--accent)" }}>
                    <Eye size={14} /> Click to expand
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {currentItem && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close Lightbox">
              <X size={24} />
            </button>

            <button className="lightbox-nav-btn lightbox-prev" onClick={handlePrev} aria-label="Previous Photo">
              <ChevronLeft size={28} />
            </button>

            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="lightbox-img"
            />

            <button className="lightbox-nav-btn lightbox-next" onClick={handleNext} aria-label="Next Photo">
              <ChevronRight size={28} />
            </button>

            <div style={{ color: "var(--white)", maxWidth: "600px", margin: "0 auto" }}>
              <span style={{ color: "var(--accent)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
                {currentItem.category} • Photo {activeLightboxIndex + 1} of {filteredItems.length}
              </span>
              <h3 style={{ fontSize: "1.5rem", color: "var(--white)", margin: "0.3rem 0" }}>
                {currentItem.title}
              </h3>
              {currentItem.caption && (
                <p style={{ color: "var(--text-light)", fontSize: "0.95rem", opacity: 0.85 }}>
                  {currentItem.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
