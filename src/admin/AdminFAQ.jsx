import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import Modal from "../components/Modal";
import { Plus, Edit2, Trash2, Search, HelpCircle } from "lucide-react";

export default function AdminFAQ() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useShop();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);

  const initialFormState = {
    question: "",
    answer: "",
    category: "Ordering & Takeaway",
    status: "Active"
  };

  const [formData, setFormData] = useState(initialFormState);

  const filteredFaqs = faqs.filter(
    (f) =>
      !searchTerm ||
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.category && f.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setCurrentFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "Ordering & Takeaway",
      status: faq.status || "Active"
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (faq) => {
    setCurrentFaq(faq);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;
    addFAQ(formData);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim() || !currentFaq) return;
    updateFAQ(currentFaq.id, formData);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (currentFaq) {
      deleteFAQ(currentFaq.id);
      setIsDeleteModalOpen(false);
      setCurrentFaq(null);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader
          title="FAQ Knowledge Management"
          subtitle={`Manage frequently asked questions & customer answers (${faqs.length} total)`}
          actionButton={
            <button onClick={handleOpenAdd} className="btn btn-primary btn-sm">
              <Plus size={16} /> Add FAQ
            </button>
          }
        />

        <div className="admin-body">
          {/* Search bar */}
          <div
            style={{
              background: "var(--white)",
              padding: "1.2rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              marginBottom: "1.8rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div className="search-input-box" style={{ maxWidth: "400px", width: "100%" }}>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search FAQ questions or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              {filteredFaqs.length} FAQs listed
            </span>
          </div>

          {/* Table */}
          <div className="admin-table-card">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: "35%" }}>Question</th>
                    <th style={{ width: "40%" }}>Answer</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => (
                      <tr key={faq.id}>
                        <td>
                          <strong style={{ color: "var(--secondary)", fontSize: "0.95rem" }}>
                            {faq.question}
                          </strong>
                        </td>
                        <td>
                          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {faq.answer}
                          </p>
                        </td>
                        <td>
                          <span
                            style={{
                              background: "var(--cream-alt)",
                              padding: "0.2rem 0.6rem",
                              borderRadius: "var(--radius-pill)",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: "var(--accent)"
                            }}
                          >
                            {faq.category || "General"}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${faq.status === "Active" ? "active" : "inactive"}`}>
                            {faq.status || "Active"}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                            <button
                              onClick={() => handleOpenEdit(faq)}
                              className="btn btn-outline btn-sm btn-icon"
                              style={{ width: "32px", height: "32px" }}
                              title="Edit FAQ"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleOpenDelete(faq)}
                              className="btn btn-outline btn-sm btn-icon"
                              style={{ width: "32px", height: "32px", color: "var(--danger)", borderColor: "rgba(211, 47, 47, 0.3)" }}
                              title="Delete FAQ"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                        No FAQs found matching your query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add FAQ Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New FAQ">
        <form onSubmit={handleSaveAdd}>
          <div className="form-group">
            <label className="form-label">Question *</label>
            <input
              type="text"
              className="form-input"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g. Do you host private coffee tastings?"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Ordering & Takeaway">Ordering & Takeaway</option>
                <option value="Coffee & Sourcing">Coffee & Sourcing</option>
                <option value="Dietary & Menu">Dietary & Menu</option>
                <option value="Brewing & Beans">Brewing & Beans</option>
                <option value="Events & Catering">Events & Catering</option>
                <option value="Freshness & Support">Freshness & Support</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active (Published)</option>
                <option value="Draft">Draft (Hidden)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Answer *</label>
            <textarea
              className="form-textarea"
              rows="4"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Provide a clear, helpful response for customers..."
              required
            />
          </div>

          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Save FAQ
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit FAQ Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit FAQ">
        <form onSubmit={handleSaveEdit}>
          <div className="form-group">
            <label className="form-label">Question *</label>
            <input
              type="text"
              className="form-input"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Ordering & Takeaway">Ordering & Takeaway</option>
                <option value="Coffee & Sourcing">Coffee & Sourcing</option>
                <option value="Dietary & Menu">Dietary & Menu</option>
                <option value="Brewing & Beans">Brewing & Beans</option>
                <option value="Events & Catering">Events & Catering</option>
                <option value="Freshness & Support">Freshness & Support</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active (Published)</option>
                <option value="Draft">Draft (Hidden)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Answer *</label>
            <textarea
              className="form-textarea"
              rows="4"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Update FAQ
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete FAQ">
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <Trash2 size={42} color="var(--danger)" style={{ margin: "0 auto 1rem auto" }} />
          <h4 style={{ fontSize: "1.2rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
            Delete this FAQ?
          </h4>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            "{currentFaq?.question}"
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
