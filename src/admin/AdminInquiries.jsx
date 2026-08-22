import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import Modal from "../components/Modal";
import { getWhatsAppLink } from "../utils/storage";
import {
  MessageSquare,
  Trash2,
  Search,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  User,
  Filter
} from "lucide-react";

export default function AdminInquiries() {
  const { inquiries, updateInquiryStatus, deleteInquiry, shopInfo } = useShop();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentInquiry, setCurrentInquiry] = useState(null);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus =
      selectedStatus === "All" ||
      inq.status?.toLowerCase() === selectedStatus.toLowerCase();

    const matchesSearch =
      !searchTerm ||
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.message && inq.message.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  const handleOpenDelete = (inquiry) => {
    setCurrentInquiry(inquiry);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentInquiry) {
      deleteInquiry(currentInquiry.id);
      setIsDeleteModalOpen(false);
      setCurrentInquiry(null);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader
          title="Customer Inquiries & Reservations"
          subtitle={`Manage booking requests, bean orders, and customer messages (${inquiries.length} total)`}
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
                placeholder="Search name, phone, product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="category-filter-pills">
              {["All", "New", "Contacted", "Completed"].map((status) => (
                <button
                  key={status}
                  className={`filter-pill ${selectedStatus === status ? "active" : ""}`}
                  onClick={() => setSelectedStatus(status)}
                  style={{ padding: "0.4rem 0.9rem", fontSize: "0.8rem" }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="admin-table-card">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Contact Info</th>
                    <th>Requested Item</th>
                    <th>Qty</th>
                    <th>Date / Created</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.length > 0 ? (
                    filteredInquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <div
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                background: "rgba(111, 78, 55, 0.1)",
                                color: "var(--primary)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0
                              }}
                            >
                              <User size={16} />
                            </div>
                            <div>
                              <strong style={{ color: "var(--secondary)", display: "block" }}>
                                {inq.name}
                              </strong>
                              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                                Ref: {inq.id}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: "0.85rem", color: "var(--secondary)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                              <Phone size={12} color="var(--accent)" /> {inq.phone}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                              <Mail size={12} /> {inq.email}
                            </div>
                          </div>
                        </td>
                        <td>
                          <strong style={{ fontSize: "0.875rem", color: "var(--primary)" }}>
                            {inq.product}
                          </strong>
                        </td>
                        <td>
                          <span style={{ fontWeight: 700, color: "var(--secondary)" }}>
                            {inq.quantity || 1}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontSize: "0.8rem" }}>
                            <div>{inq.preferredDate || "Immediate"}</div>
                            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                              {inq.createdAt}
                            </span>
                          </div>
                        </td>
                        <td>
                          <p
                            style={{
                              fontSize: "0.825rem",
                              color: "var(--text-muted)",
                              maxWidth: "220px",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden"
                            }}
                            title={inq.message}
                          >
                            {inq.message}
                          </p>
                        </td>
                        <td>
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                            style={{
                              fontSize: "0.8rem",
                              padding: "0.3rem 0.6rem",
                              border: "1px solid var(--border-light)",
                              borderRadius: "var(--radius-pill)",
                              background: inq.status === "Completed" ? "#DCFCE7" : inq.status === "Contacted" ? "#FEF3C7" : "#E0F2FE",
                              color: inq.status === "Completed" ? "#15803D" : inq.status === "Contacted" ? "#B45309" : "#0369A1",
                              fontWeight: 700,
                              cursor: "pointer"
                            }}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                            {/* WhatsApp Direct Reply */}
                            <a
                              href={getWhatsAppLink(
                                inq.phone,
                                `Hello ${inq.name}, this is ${shopInfo.name}. Regarding your inquiry for ${inq.product}:`
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-whatsapp btn-sm btn-icon"
                              style={{ width: "32px", height: "32px" }}
                              title="Message Customer on WhatsApp"
                            >
                              <MessageSquare size={14} />
                            </a>

                            <button
                              onClick={() => handleOpenDelete(inq)}
                              className="btn btn-outline btn-sm btn-icon"
                              style={{ width: "32px", height: "32px", color: "var(--danger)", borderColor: "rgba(211, 47, 47, 0.3)" }}
                              title="Delete Inquiry"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                        No inquiries found matching criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Customer Inquiry">
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <Trash2 size={42} color="var(--danger)" style={{ margin: "0 auto 1rem auto" }} />
          <h4 style={{ fontSize: "1.2rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>
            Delete Inquiry from {currentInquiry?.name}?
          </h4>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            This record for "{currentInquiry?.product}" will be permanently removed from LocalStorage.
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
