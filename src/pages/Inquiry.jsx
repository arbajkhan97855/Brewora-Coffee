import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import SectionTitle from "../components/SectionTitle";
import { getWhatsAppLink } from "../utils/storage";
import {
  Send,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Coffee,
  Sparkles,
  PhoneCall,
  Info
} from "lucide-react";

export default function Inquiry() {
  const { products, shopInfo, addInquiry, showToast } = useShop();
  const [searchParams] = useSearchParams();

  const prefilledProduct = searchParams.get("product") || "";
  const prefilledQuantity = searchParams.get("quantity") || "1";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: prefilledProduct || (products.length > 0 ? products[0].name : "Classic Espresso"),
    quantity: Number(prefilledQuantity) || 1,
    preferredDate: new Date().toISOString().split("T")[0],
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [submittedInquiry, setSubmittedInquiry] = useState(null);

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({
        ...prev,
        product: prefilledProduct,
        quantity: Number(prefilledQuantity) || 1
      }));
    }
  }, [prefilledProduct, prefilledQuantity]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      errs.message = "Please include a brief message or request details";
    } else if (formData.message.trim().length < 5) {
      errs.message = "Message must be at least 5 characters long";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please correct the form errors before submitting", "error");
      return;
    }

    const saved = addInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      product: formData.product,
      quantity: formData.quantity,
      preferredDate: formData.preferredDate,
      message: formData.message
    });

    setSubmittedInquiry(saved);
  };

  const handleResetForm = () => {
    setSubmittedInquiry(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      product: products.length > 0 ? products[0].name : "Classic Espresso",
      quantity: 1,
      preferredDate: new Date().toISOString().split("T")[0],
      message: ""
    });
  };

  return (
    <div>
      {/* Hero Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(23,18,15,0.92) 0%, rgba(62,39,35,0.85) 100%), url('https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--white)",
          padding: "5.5rem 0 4rem 0",
          textAlign: "center"
        }}
      >
        <div className="container-sm">
          <span className="section-badge dark">📝 Direct Inquiry & Booking</span>
          <h1 style={{ fontSize: "3.2rem", color: "var(--white)", marginBottom: "1rem" }}>
            Make a Coffee Inquiry
          </h1>
          <p style={{ color: "var(--text-light)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Submit an order inquiry for our specialty beans, express café takeaways, or group reservations.
          </p>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="section">
        <div className="container-sm">
          {submittedInquiry ? (
            <div
              style={{
                background: "var(--bg-card)",
                borderRadius: "var(--radius-sm)",
                padding: "3.5rem 2rem",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7)",
                border: "1px solid var(--border-dark)",
                backdropFilter: "blur(16px)"
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(37, 211, 102, 0.15)",
                  color: "#25D366",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                  border: "1px solid rgba(37, 211, 102, 0.3)"
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <span className="section-badge" style={{ marginBottom: "0.5rem" }}>
                Inquiry Ref: {submittedInquiry.id}
              </span>

              <h2 style={{ fontSize: "2.2rem", color: "var(--white)", marginBottom: "1rem" }}>
                Inquiry Received Successfully!
              </h2>

              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto 2rem auto", lineHeight: 1.6 }}>
                Thank you, <strong style={{ color: "var(--accent)" }}>{submittedInquiry.name}</strong>. Your inquiry for <strong style={{ color: "var(--white)" }}>{submittedInquiry.quantity}x {submittedInquiry.product}</strong> has been stored in our system. Our barista team will contact you at <strong style={{ color: "var(--accent)" }}>{submittedInquiry.phone}</strong>.
              </p>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
                <a
                  href={getWhatsAppLink(
                    shopInfo.whatsapp,
                    `Hello ${shopInfo.name}, I submitted Inquiry ID *${submittedInquiry.id}* for *${submittedInquiry.quantity}x ${submittedInquiry.product}*.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                >
                  <MessageSquare size={18} />
                  <span>Forward Details to WhatsApp</span>
                </a>

                <button onClick={handleResetForm} className="btn btn-outline btn-lg">
                  Submit Another Inquiry
                </button>
              </div>

              <div style={{ fontSize: "0.85rem", color: "var(--text-subtle)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                <Info size={14} />
                <span>Notice: All admin records are synchronized via browser LocalStorage.</span>
              </div>
            </div>
          ) : (
            <div className="form-card">
              <div style={{ marginBottom: "2rem", borderBottom: "1px solid var(--border-dark)", paddingBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.6rem", color: "var(--white)", marginBottom: "0.3rem" }}>
                  Product & Table Inquiry Form
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Please fill out the form below. If you selected a product from our catalogue, it has been automatically selected.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                  {/* Name */}
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>{errors.phone}</span>}
                  </div>
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="priya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>{errors.email}</span>}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr", gap: "1.2rem" }}>
                  {/* Product selector */}
                  <div className="form-group">
                    <label className="form-label">Selected Coffee / Item *</label>
                    <select
                      className="form-select"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    >
                      <optgroup label="Coffee Catalogue">
                        {products.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} ({p.category})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="General Services">
                        <option value="Table Reservation (2-4 Guests)">Table Reservation (2-4 Guests)</option>
                        <option value="Group / Private Event Booking">Group / Private Event Booking</option>
                        <option value="Corporate Coffee Gift Packs">Corporate Coffee Gift Packs</option>
                        <option value="Barista Masterclass Session">Barista Masterclass Session</option>
                        <option value="Other Custom Request">Other Custom Request</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div className="form-group">
                    <label className="form-label">Quantity *</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className="form-input"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                    />
                  </div>

                  {/* Date */}
                  <div className="form-group">
                    <label className="form-label">Preferred Date *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="form-label">Message / Brewing Notes / Instructions *</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Specify equipment grind size (e.g. French press, Moka pot), oat milk preference, or arrival timing..."
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  {errors.message && <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>{errors.message}</span>}
                </div>

                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ flexGrow: 1 }}>
                    <Send size={18} />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
