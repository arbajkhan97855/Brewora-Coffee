import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";
import SectionTitle from "../components/SectionTitle";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

export default function Products() {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const categories = ["All", "Espresso", "Hot Coffee", "Cold Coffee", "Specialty", "Beans"];

  useEffect(() => {
    const urlQuery = searchParams.get("search");
    if (urlQuery !== null) {
      setSearchTerm(urlQuery);
    }
  }, [searchParams]);

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("popular");
    setSearchParams({});
  };

  // Filter logic
  const filteredProducts = products.filter((item) => {
    if (!item.available && item.available !== undefined) return false;

    const matchesCategory =
      selectedCategory === "All" ||
      item.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchTerm ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.ingredients && item.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "reviews") return (b.reviews || 0) - (a.reviews || 0);
    // default: popular (featured first, then higher reviews)
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (b.reviews || 0) - (a.reviews || 0);
  });

  return (
    <div>
      {/* Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(23,18,15,0.92) 0%, rgba(62,39,35,0.85) 100%), url('https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--white)",
          padding: "5.5rem 0 4rem 0",
          textAlign: "center"
        }}
      >
        <div className="container-sm">
          <span className="section-badge dark">✨ Whole Bean & Brew Collection</span>
          <h1 style={{ fontSize: "3.2rem", color: "var(--white)", marginBottom: "1rem" }}>
            Specialty Roasts & Beverages
          </h1>
          <p style={{ color: "var(--text-light)", fontSize: "1.1rem", maxWidth: "620px", margin: "0 auto" }}>
            Explore single-origin whole beans, artisanal espressos, and signature iced concoctions delivered fresh.
          </p>
        </div>
      </section>

      {/* Filter and Product Catalogue */}
      <section className="section">
        <div className="container">
          {/* Filter Bar */}
          <div className="filter-wrapper">
            <div className="filter-grid">
              {/* Search Box */}
              <div className="search-input-box">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by name, roast, flavor..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>

              {/* Category Pills */}
              <div className="category-filter-pills">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Select */}
              <div className="sort-select-box">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="popular">Sort: Popular & Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              padding: "0 0.5rem"
            }}
          >
            <div style={{ color: "var(--secondary)", fontWeight: 600 }}>
              Showing <span style={{ color: "var(--accent)" }}>{sortedProducts.length}</span> coffee products
              {searchTerm && <span> for "<em>{searchTerm}</em>"</span>}
            </div>

            {(searchTerm || selectedCategory !== "All" || sortBy !== "popular") && (
              <button
                onClick={handleResetFilters}
                className="btn btn-outline btn-sm"
                style={{ padding: "0.35rem 0.85rem", fontSize: "0.8rem" }}
              >
                <RotateCcw size={13} /> Reset Filters
              </button>
            )}
          </div>

          {/* Product Grid or Empty State */}
          {sortedProducts.length > 0 ? (
            <div className="product-grid">
              {sortedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Sorry, we couldn't find your coffee."
              message="Try searching with another keyword or selecting 'All' categories to view our full collection."
              onReset={handleResetFilters}
            />
          )}
        </div>
      </section>
    </div>
  );
}
