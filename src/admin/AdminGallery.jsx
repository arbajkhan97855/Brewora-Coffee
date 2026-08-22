import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import Modal from "../components/Modal";
import { Plus, Trash2, Image as ImageIcon, Eye, ExternalLink } from "lucide-react";

export default function AdminGallery() {
  const { gallery, addGalleryItem, deleteGalleryItem } = useShop();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const initialFormState = {
    title: "",
    category: "Latte Art",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
    caption: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setIsAddModalOpen(true);
  };

  const handleOpenDelete = (item) => {
    setCurrentImage(item);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image.trim()) return;
    addGalleryItem(formData);
    setIsAddModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (currentImage) {
      deleteGalleryItem(currentImage.id);
      setIsDeleteModalOpen(false);
      setCurrentImage(null);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader
          title="Café Photo Gallery Management"
          subtitle={`Manage visual stories, latte art captures, and interior photos (${gallery.length} photos)`}
          actionButton={
            <button onClick={handleOpenAdd} className="btn btn-primary btn-sm">
              <Plus size={16} /> Add Photo
            </button>
          }
        />

        <div className="admin-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {gallery.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "var(--white)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--border-light)",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      background: "rgba(23, 18, 15, 0.75)",
                      color: "var(--accent)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "var(--radius-pill)",
                      fontSize: "0.75rem",
                      fontWeight: 700
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                <div style={{ padding: "1rem", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h4 style={{ color: "var(--secondary)", fontSize: "1.05rem", marginBottom: "0.3rem" }}>
                      {item.title}
                    </h4>
                    {item.caption && (
                      <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.4 }}>
                        {item.caption}
                      </p>
                    )}
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem", paddingTop: "0.8rem", borderTop: "1px solid var(--border-light)" }}>
                    <button
                      onClick={() => handleOpenDelete(item)}
                      className="btn btn-outline btn-sm"
                      style={{ color: "var(--danger)", borderColor: "rgba(211, 47, 47, 0.3)", padding: "0.3rem 0.7rem", fontSize: "0.8rem" }}
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add Photo Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Upload New Gallery Photo">
        <form onSubmit={handleSaveAdd}>
          <div className="form-group">
            <label className="form-label">Photo Title *</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Rosetta Latte Art in Porcelain"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Latte Art">Latte Art</option>
              <option value="Café Interior">Café Interior</option>
              <option value="Coffee Making">Coffee Making</option>
              <option value="Beans & Roastery">Beans & Roastery</option>
              <option value="Bakery">Bakery</option>
              <option value="Barista Life">Barista Life</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL *</label>
            <input
              type="url"
              className="form-input"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Caption / Subtitle</label>
            <textarea
              className="form-textarea"
              rows="2"
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="Brief description of the craft..."
            />
          </div>

          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Add to Gallery
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Photo">
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <Trash2 size={42} color="var(--danger)" style={{ margin: "0 auto 1rem auto" }} />
          <h4 style={{ fontSize: "1.2rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
            Remove this photo from gallery?
          </h4>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            "{currentImage?.title}"
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
