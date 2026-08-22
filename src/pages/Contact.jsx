import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import SectionTitle from "../components/SectionTitle";
import { getWhatsAppLink } from "../utils/storage";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function Contact() {
  const { shopInfo, addInquiry, showToast } = useShop();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Café Inquiry",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      product: `Contact: ${formData.subject}`,
      quantity: 1,
      message: formData.message
    });

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "General Café Inquiry",
      message: ""
    });
  };

  return (
    <div>
      {/* Hero Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(23,18,15,0.92) 0%, rgba(62,39,35,0.85) 100%), url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--white)",
          padding: "5.5rem 0 4rem 0",
          textAlign: "center"
        }}
      >
        <div className="container-sm">
          <span className="section-badge dark">📍 Visit & Connect</span>
          <h1 style={{ fontSize: "3.2rem", color: "var(--white)", marginBottom: "1rem" }}>
            Get in Touch
          </h1>
          <p style={{ color: "var(--text-light)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Step into our warm roastery lounge in Jaipur or drop us a note for reservations and specialty catering.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "3.5rem", alignItems: "start" }}>
            {/* Contact Info Column */}
            <div>
              <span className="section-badge">☕ Café Details</span>
              <h2 style={{ fontSize: "2.2rem", color: "var(--white)", marginBottom: "1.2rem" }}>
                We'd Love to Welcome You
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                Whether you are stopping by for your morning flat white or planning a weekend coffee cupping session, our team is always delighted to assist you.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(192, 139, 92, 0.15)",
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: "1px solid var(--border-dark)"
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", color: "var(--white)" }}>Café Address</h4>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{shopInfo.address}</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(192, 139, 92, 0.15)",
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: "1px solid var(--border-dark)"
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", color: "var(--white)" }}>Phone & Inquiries</h4>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{shopInfo.phone}</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(192, 139, 92, 0.15)",
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: "1px solid var(--border-dark)"
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", color: "var(--white)" }}>Email Address</h4>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{shopInfo.email}</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(192, 139, 92, 0.15)",
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: "1px solid var(--border-dark)"
                    }}
                  >
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1rem", color: "var(--white)" }}>Operating Hours</h4>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                      {shopInfo.openingTime} – {shopInfo.closingTime} ({shopInfo.workingDays || "Monday – Sunday"})
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Card */}
              <div
                style={{
                  background: "var(--bg-card)",
                  padding: "1.5rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-dark)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backdropFilter: "blur(12px)"
                }}
              >
                <div>
                  <strong style={{ color: "var(--white)", fontSize: "0.95rem", display: "block" }}>
                    Prefer WhatsApp Chat?
                  </strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Instant table reservation & query answers
                  </span>
                </div>
                <a
                  href={getWhatsAppLink(shopInfo.whatsapp, "Hello Brewora Coffee, I am contacting you regarding your café services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                >
                  <MessageSquare size={16} /> Chat
                </a>
              </div>
            </div>

            {/* Contact Form Column */}
            <div>
              <div className="form-card">
                <h3 style={{ fontSize: "1.5rem", color: "var(--white)", marginBottom: "0.4rem" }}>
                  Send a Direct Message
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.8rem" }}>
                  Fill in your details and message. Our team will get back to you within 2 hours.
                </p>

                {submitted ? (
                  <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                    <CheckCircle2 size={48} color="var(--success)" style={{ margin: "0 auto 1rem auto" }} />
                    <h4 style={{ color: "var(--white)", fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                      Thank You! Message Received
                    </h4>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                      We have logged your message into our reservation system. A barista manager will reach out shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn btn-outline btn-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Rahul Sen"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input
                          type="email"
                          className="form-input"
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-input"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <select
                        className="form-select"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="General Café Inquiry">General Café Inquiry</option>
                        <option value="Table Reservation">Table Reservation</option>
                        <option value="Corporate Catering">Corporate Catering / Bulk Order</option>
                        <option value="Coffee Workshop">Coffee Workshop / Cupping Session</option>
                        <option value="Roast Feedback">Roast Feedback / Compliments</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Your Message *</label>
                      <textarea
                        className="form-textarea"
                        placeholder="Tell us what you are looking for..."
                        rows="4"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                      <Send size={16} />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Google Map Stylized Section */}
          <div
            style={{
              marginTop: "5rem",
              background: "var(--white)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--border-light)",
              boxShadow: "var(--shadow-md)"
            }}
          >
            <div style={{ padding: "1.5rem 2rem", background: "var(--secondary)", color: "var(--cream)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <MapPin size={22} color="var(--accent)" />
                <div>
                  <h3 style={{ fontSize: "1.15rem", color: "var(--cream)" }}>{shopInfo.name} — Flagship Heritage Lounge</h3>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>{shopInfo.address}</span>
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(shopInfo.name + " " + shopInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent btn-sm"
              >
                Open in Google Maps
              </a>
            </div>

            <div style={{ height: "350px", width: "100%", background: "#e8ded2", position: "relative" }}>
              <iframe
                title="Brewora Coffee Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113854.89679198642!2d75.71941295982875!3d26.912433600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1692700000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
