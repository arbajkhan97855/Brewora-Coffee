import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import {
  Save,
  RotateCcw,
  Store,
  Phone,
  Clock,
  Share2,
  Sparkles,
  Info
} from "lucide-react";

export default function AdminSettings() {
  const { shopInfo, updateShopInfo, resetShopInfoToDefault } = useShop();

  const [formData, setFormData] = useState({ ...shopInfo });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateShopInfo(formData);
  };

  const handleReset = () => {
    if (window.confirm("Reset all café brand settings back to original defaults from info.js?")) {
      resetShopInfoToDefault();
      setFormData({ ...shopInfo });
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminHeader
          title="Brand & Café Configuration"
          subtitle="Customize your coffee shop contact numbers, working hours, and brand copy live"
          actionButton={
            <button onClick={handleReset} className="btn btn-outline btn-sm">
              <RotateCcw size={14} /> Reset Defaults
            </button>
          }
        />

        <div className="admin-body">
          <div
            style={{
              background: "#FEF3C7",
              border: "1px solid #FCD34D",
              color: "#92400E",
              padding: "1rem 1.5rem",
              borderRadius: "var(--radius-md)",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem"
            }}
          >
            <Info size={20} style={{ flexShrink: 0 }} />
            <div style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
              <strong>Frontend LocalStorage CMS:</strong> All modifications you save here immediately update the website Header, Footer, Hero banners, and WhatsApp redirect buttons on your client device.
            </div>
          </div>

          <form onSubmit={handleSave}>
            {/* 1. Brand Identity */}
            <div className="form-card" style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.8rem" }}>
                <Store size={20} color="var(--primary)" />
                <h3 style={{ fontSize: "1.25rem", color: "var(--secondary)" }}>Brand Identity & Copy</h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                <div className="form-group">
                  <label className="form-label">Coffee Shop Brand Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Tagline</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.tagline || ""}
                    onChange={(e) => handleChange("tagline", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subtagline / Brand Mission Statement</label>
                <textarea
                  className="form-textarea"
                  rows="2"
                  value={formData.subtagline || ""}
                  onChange={(e) => handleChange("subtagline", e.target.value)}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Happy Customers Text</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.happyCustomers || "10K+"}
                    onChange={(e) => handleChange("happyCustomers", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Coffee Varieties Count</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.varietiesCount || "25+"}
                    onChange={(e) => handleChange("varietiesCount", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Experience (Years)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.experienceYears || "8+"}
                    onChange={(e) => handleChange("experienceYears", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Average Star Rating</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.rating || "4.9"}
                    onChange={(e) => handleChange("rating", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 2. Contact & WhatsApp Integration */}
            <div className="form-card" style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.8rem" }}>
                <Phone size={20} color="var(--primary)" />
                <h3 style={{ fontSize: "1.25rem", color: "var(--secondary)" }}>Contact Numbers & WhatsApp Direct Target</h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                <div className="form-group">
                  <label className="form-label">WhatsApp Order Mobile Number (with country code)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.whatsapp || ""}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Public Phone Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                <div className="form-group">
                  <label className="form-label">Inquiry Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Café Street Address</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* 3. Operating Hours */}
            <div className="form-card" style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.8rem" }}>
                <Clock size={20} color="var(--primary)" />
                <h3 style={{ fontSize: "1.25rem", color: "var(--secondary)" }}>Operating Hours & Days</h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2rem" }}>
                <div className="form-group">
                  <label className="form-label">Opening Time</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.openingTime || "07:00 AM"}
                    onChange={(e) => handleChange("openingTime", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Closing Time</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.closingTime || "11:00 PM"}
                    onChange={(e) => handleChange("closingTime", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Working Days</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.workingDays || "Monday – Sunday"}
                    onChange={(e) => handleChange("workingDays", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 4. Social Links */}
            <div className="form-card" style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.8rem" }}>
                <Share2 size={20} color="var(--primary)" />
                <h3 style={{ fontSize: "1.25rem", color: "var(--secondary)" }}>Social Profiles</h3>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2rem" }}>
                <div className="form-group">
                  <label className="form-label">Instagram Handle / URL</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.social?.instagram || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        social: { ...formData.social, instagram: e.target.value }
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Facebook Handle / URL</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.social?.facebook || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        social: { ...formData.social, facebook: e.target.value }
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Twitter / X Handle</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.social?.twitter || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        social: { ...formData.social, twitter: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <button type="submit" className="btn btn-primary btn-lg">
                <Save size={18} />
                <span>Save All Café Settings</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
