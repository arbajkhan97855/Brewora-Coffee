import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import Modal from "../components/Modal";
import { Plus, Edit2, Trash2, Tag, Check, X, Clock } from "lucide-react";

export default function AdminOffers() {
  const { offers, addOffer, updateOffer, deleteOffer, toggleOfferActive } = useShop();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);

  const initialFormState = {
    title: "",
    discount: "20% OFF",
    badge: "Limited Special",
    description: "",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    validUntil: "Valid till Sunday",
    code: "BREW20",
    category: "Special Deal",
    active: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (offer) => {
    setCurrentOffer(offer);
    setFormData({
      title: offer.title,
      discount: offer.discount,
      badge: offer.badge || "",
      description: offer.description,
      image: offer.image,
      validUntil: offer.validUntil,
      code: offer.code || "BREW",
      category: offer.category || "Deal",
      active: offer.active !== false
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (offer) => {
    setCurrentOffer(offer);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.discount.trim()) return;
    addOffer(formData);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.discount.trim() || !currentOffer) return;
    updateOffer(currentOffer.id, formData);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (currentOffer) {
      deleteOffer(currentOffer.id);
      setIsDeleteModalOpen(false);
      setCurrentOffer(null);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader
          title="Promotions & Offer Deals"
          subtitle={`Create seasonal discounts, coupon codes, and bundle offers (${offers.length} active promotions)`}
          actionButton={
            <button onClick={handleOpenAdd} className="btn btn-primary btn-sm">
              <Plus size={16} /> Add New Offer
            </button>
          }
        />

        <div className="admin-body">
          <div className="admin-table-card">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Offer / Preview</th>
                    <th>Discount</th>
                    <th>Promo Code</th>
                    <th>Validity</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offer) => (
                    <tr key={offer.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                          <img
                            src={offer.image}
                            alt={offer.title}
                            style={{ width: "48px", height: "48px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                          />
                          <div>
                            <strong style={{ color: "var(--secondary)", display: "block" }}>
                              {offer.title}
                            </strong>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                              {offer.description}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            background: "var(--accent)",
                            color: "white",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "var(--radius-pill)",
                            fontSize: "0.75rem",
                            fontWeight: 800
                          }}
                        >
                          {offer.discount}
                        </span>
                      </td>
                      <td>
                        <code style={{ background: "var(--cream-alt)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 700, color: "var(--secondary)" }}>
                          {offer.code}
                        </code>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Clock size={12} /> {offer.validUntil}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleOfferActive(offer.id)}
                          className={`status-badge ${offer.active ? "active" : "inactive"}`}
                          style={{ cursor: "pointer", border: "none" }}
                          title="Click to toggle active state"
                        >
                          {offer.active ? "Active (Live)" : "Paused"}
                        </button>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                          <button
                            onClick={() => handleOpenEdit(offer)}
                            className="btn btn-outline btn-sm btn-icon"
                            style={{ width: "32px", height: "32px" }}
                            title="Edit Offer"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(offer)}
                            className="btn btn-outline btn-sm btn-icon"
                            style={{ width: "32px", height: "32px", color: "var(--danger)", borderColor: "rgba(211, 47, 47, 0.3)" }}
                            title="Delete Offer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Offer Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Special Offer">
        <form onSubmit={handleSaveAdd}>
          <div className="form-group">
            <label className="form-label">Offer Headline *</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Monsoon Cold Brew Carnival"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Discount Label *</label>
              <input
                type="text"
                className="form-input"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="25% OFF or SAVE ₹150"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Promo Code *</label>
              <input
                type="text"
                className="form-input"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="MONSOON25"
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Badge Tag</label>
              <input
                type="text"
                className="form-input"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Weekend Only"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Validity Text</label>
              <input
                type="text"
                className="form-input"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                placeholder="Valid till 31st August"
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
              placeholder="Describe which items are included and any minimum order details..."
              required
            />
          </div>

          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Create Offer
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Offer Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Promotional Offer">
        <form onSubmit={handleSaveEdit}>
          <div className="form-group">
            <label className="form-label">Offer Headline *</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Discount Label *</label>
              <input
                type="text"
                className="form-input"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Promo Code *</label>
              <input
                type="text"
                className="form-input"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Badge Tag</label>
              <input
                type="text"
                className="form-input"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Validity Text</label>
              <input
                type="text"
                className="form-input"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
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

          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Update Offer
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Offer">
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <Trash2 size={42} color="var(--danger)" style={{ margin: "0 auto 1rem auto" }} />
          <h4 style={{ fontSize: "1.2rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
            Delete this promotional offer?
          </h4>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            "{currentOffer?.title}"
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
