import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import Modal from "../components/Modal";
import { formatCurrency } from "../utils/storage";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  Star
} from "lucide-react";

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, resetProductsToDefault } = useShop();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentProduct, setCurrentProduct] = useState(null);

  const initialFormState = {
    name: "",
    category: "Hot Coffee",
    price: "",
    oldPrice: "",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
    description: "",
    ingredients: "Arabica Coffee, Filtered Water",
    rating: 4.9,
    reviews: 50,
    origin: "Chikmagalur Estate",
    roastLevel: "Medium Roast",
    featured: true,
    available: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const categories = ["All", "Espresso", "Hot Coffee", "Cold Coffee", "Specialty", "Beans"];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice || "",
      image: product.image,
      description: product.description,
      ingredients: Array.isArray(product.ingredients) ? product.ingredients.join(", ") : product.ingredients,
      rating: product.rating,
      reviews: product.reviews,
      origin: product.origin || "",
      roastLevel: product.roastLevel || "",
      featured: product.featured,
      available: product.available !== false
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;
    addProduct(formData);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || !currentProduct) return;
    updateProduct(currentProduct.id, formData);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (currentProduct) {
      deleteProduct(currentProduct.id);
      setIsDeleteModalOpen(false);
      setCurrentProduct(null);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader
          title="Product Catalogue Management"
          subtitle={`Manage coffee beverages, whole beans, and prices (${products.length} total items)`}
          actionButton={
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <button onClick={resetProductsToDefault} className="btn btn-outline btn-sm" title="Restore factory products">
                <RotateCcw size={14} /> Reset
              </button>
              <button onClick={handleOpenAdd} className="btn btn-primary btn-sm">
                <Plus size={16} /> Add Product
              </button>
            </div>
          }
        />

        <div className="admin-body">
          {/* Filter Bar */}
          <div
            style={{
              background: "var(--white)",
              padding: "1.2rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              marginBottom: "1.8rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <div className="search-input-box" style={{ maxWidth: "350px", width: "100%" }}>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="category-filter-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                  style={{ padding: "0.4rem 0.9rem", fontSize: "0.8rem" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Table */}
          <div className="admin-table-card">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Item / Image</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Featured</th>
                    <th>Stock</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                            <img
                              src={p.image}
                              alt={p.name}
                              style={{ width: "48px", height: "48px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                            />
                            <div>
                              <strong style={{ color: "var(--secondary)", display: "block" }}>{p.name}</strong>
                              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                {p.origin || "Estate Blend"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            style={{
                              background: "var(--cream-alt)",
                              padding: "0.25rem 0.65rem",
                              borderRadius: "var(--radius-pill)",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: "var(--secondary)"
                            }}
                          >
                            {p.category}
                          </span>
                        </td>
                        <td>
                          <strong style={{ color: "var(--primary)" }}>{formatCurrency(p.price)}</strong>
                          {p.oldPrice && p.oldPrice > p.price && (
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "0.4rem", textDecoration: "line-through" }}>
                              {formatCurrency(p.oldPrice)}
                            </span>
                          )}
                        </td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.85rem", color: "#F59E0B" }}>
                            <Star size={14} fill="#F59E0B" />
                            <span>{p.rating}</span>
                          </div>
                        </td>
                        <td>
                          {p.featured ? (
                            <span style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.2rem" }}>
                              <Sparkles size={13} /> Yes
                            </span>
                          ) : (
                            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>No</span>
                          )}
                        </td>
                        <td>
                          {p.available !== false ? (
                            <span className="status-badge active">In Stock</span>
                          ) : (
                            <span className="status-badge inactive">Out of Stock</span>
                          )}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="btn btn-outline btn-sm btn-icon"
                              style={{ width: "32px", height: "32px" }}
                              title="Edit Coffee"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleOpenDelete(p)}
                              className="btn btn-outline btn-sm btn-icon"
                              style={{ width: "32px", height: "32px", color: "var(--danger)", borderColor: "rgba(211, 47, 47, 0.3)" }}
                              title="Delete Coffee"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                        No coffee products match your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Coffee Product">
        <form onSubmit={handleSaveAdd}>
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Vanilla Bean Cold Brew"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Espresso">Espresso</option>
                <option value="Hot Coffee">Hot Coffee</option>
                <option value="Cold Coffee">Cold Coffee</option>
                <option value="Specialty">Specialty</option>
                <option value="Beans">Beans</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input
                type="number"
                className="form-input"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="199"
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Old / Strikethrough Price (₹)</label>
              <input
                type="number"
                className="form-input"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                placeholder="249"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Rating (1-5)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                className="form-input"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL *</label>
            <input
              type="url"
              className="form-input"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className="form-textarea"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the roast, aroma, body, notes..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ingredients (comma separated)</label>
            <input
              type="text"
              className="form-input"
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              placeholder="Arabica Espresso, Whole Milk, Madagascar Vanilla"
            />
          </div>

          <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--secondary)", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <span>Featured on Homepage</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--secondary)", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
              />
              <span>Available in Stock</span>
            </label>
          </div>

          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Add Product
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Coffee Details">
        <form onSubmit={handleSaveEdit}>
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Espresso">Espresso</option>
                <option value="Hot Coffee">Hot Coffee</option>
                <option value="Cold Coffee">Cold Coffee</option>
                <option value="Specialty">Specialty</option>
                <option value="Beans">Beans</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input
                type="number"
                className="form-input"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Old / Strikethrough Price (₹)</label>
              <input
                type="number"
                className="form-input"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Rating</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                className="form-input"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL *</label>
            <input
              type="url"
              className="form-input"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className="form-textarea"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ingredients (comma separated)</label>
            <input
              type="text"
              className="form-input"
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--secondary)", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <span>Featured on Homepage</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--secondary)", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
              />
              <span>Available in Stock</span>
            </label>
          </div>

          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Coffee Product">
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <Trash2 size={42} color="var(--danger)" style={{ margin: "0 auto 1rem auto" }} />
          <h4 style={{ fontSize: "1.2rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
            Are you sure you want to delete this product?
          </h4>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            "{currentProduct?.name}" will be removed from your store catalogue in LocalStorage.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button onClick={() => setIsDeleteModalOpen(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="btn btn-sm"
              style={{ background: "var(--danger)", color: "white" }}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
