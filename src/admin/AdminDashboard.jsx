import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import StatCard from "../components/StatCard";
import { formatCurrency, getWhatsAppLink } from "../utils/storage";
import {
  Package,
  HelpCircle,
  MessageSquare,
  Tag,
  CheckCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  RefreshCcw
} from "lucide-react";

export default function AdminDashboard() {
  const { products, faqs, offers, inquiries, gallery, shopInfo, updateInquiryStatus } = useShop();

  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.available !== false).length;
  const totalFaqs = faqs.length;
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === "New").length;
  const activeOffers = offers.filter((o) => o.active).length;

  const recentInquiries = inquiries.slice(0, 5);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 5);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader
          title="Café CMS Dashboard"
          subtitle={`Welcome to ${shopInfo.name} administration console`}
          actionButton={
            <Link to="/admin/products" className="btn btn-primary btn-sm">
              <Plus size={16} /> Add New Coffee
            </Link>
          }
        />

        <div className="admin-body">
          {/* Top Stat Cards */}
          <div className="admin-stats-grid">
            <StatCard
              title="Total Coffee Items"
              value={totalProducts}
              icon={Package}
              changeText={`${availableProducts} Currently In Stock`}
              color="var(--primary)"
            />
            <StatCard
              title="Customer Inquiries"
              value={totalInquiries}
              icon={MessageSquare}
              changeText={`${newInquiries} Awaiting Barista Action`}
              color="var(--accent)"
            />
            <StatCard
              title="Active Café Offers"
              value={activeOffers}
              icon={Tag}
              changeText="Live on Offers Page"
              color="#10B981"
            />
            <StatCard
              title="Knowledge FAQs"
              value={totalFaqs}
              icon={HelpCircle}
              changeText="Published on FAQ Accordion"
              color="#6366F1"
            />
          </div>

          {/* Quick Action Buttons */}
          <div
            style={{
              background: "var(--white)",
              padding: "1.5rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              marginBottom: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.15rem", color: "var(--secondary)" }}>
                ⚡ Quick Administrative Shortcuts
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                Add items, publish new deals, or update hours across the live site in seconds.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
              <Link to="/admin/products" className="btn btn-outline btn-sm">
                <Plus size={14} /> Add Product
              </Link>
              <Link to="/admin/faq" className="btn btn-outline btn-sm">
                <Plus size={14} /> Add FAQ
              </Link>
              <Link to="/admin/offers" className="btn btn-outline btn-sm">
                <Plus size={14} /> Add Offer
              </Link>
              <Link to="/admin/settings" className="btn btn-accent btn-sm">
                Shop Settings
              </Link>
            </div>
          </div>

          {/* Recent Inquiries & Featured Products Columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2rem" }}>
            {/* Left: Recent Inquiries Table */}
            <div className="admin-table-card">
              <div style={{ padding: "1.2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-light)" }}>
                <h3 style={{ fontSize: "1.1rem", color: "var(--secondary)" }}>
                  Recent Inquiries & Orders
                </h3>
                <Link to="/admin/inquiries" style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}>
                  View All ({inquiries.length})
                </Link>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInquiries.length > 0 ? (
                      recentInquiries.map((inq) => (
                        <tr key={inq.id}>
                          <td>
                            <strong style={{ display: "block", color: "var(--secondary)" }}>{inq.name}</strong>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{inq.phone}</span>
                          </td>
                          <td style={{ fontSize: "0.85rem" }}>{inq.product}</td>
                          <td><strong>{inq.quantity}</strong></td>
                          <td>
                            <span className={`status-badge ${inq.status.toLowerCase()}`}>
                              {inq.status}
                            </span>
                          </td>
                          <td>
                            <select
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                              style={{
                                fontSize: "0.75rem",
                                padding: "0.2rem 0.4rem",
                                border: "1px solid var(--border-light)",
                                borderRadius: "var(--radius-sm)",
                                background: "var(--cream)"
                              }}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                          No inquiries received yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Featured Coffee Showcase */}
            <div className="admin-table-card">
              <div style={{ padding: "1.2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-light)" }}>
                <h3 style={{ fontSize: "1.1rem", color: "var(--secondary)" }}>
                  Featured Roasts
                </h3>
                <Link to="/admin/products" style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}>
                  Manage
                </Link>
              </div>

              <div style={{ padding: "1rem" }}>
                {featuredProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      padding: "0.6rem 0",
                      borderBottom: "1px solid var(--border-light)"
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: "45px", height: "45px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <strong style={{ fontSize: "0.9rem", color: "var(--secondary)", display: "block" }}>
                        {p.name}
                      </strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {p.category} • {formatCurrency(p.price)}
                      </span>
                    </div>
                    <span style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 700 }}>
                      ★ {p.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
