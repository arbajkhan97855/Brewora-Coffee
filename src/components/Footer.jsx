import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { getWhatsAppLink } from "../utils/storage";
import { 
  Coffee, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  Send, 
  Heart,
  CheckCircle2
} from "lucide-react";

export default function Footer() {
  const { shopInfo, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
      setSubscribed(true);
      showToast("Thank you for subscribing to Brewora Roasters Club!", "success");
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="brand-logo" style={{ color: "var(--cream)", marginBottom: "1rem", display: "inline-flex" }}>
              <Coffee size={30} style={{ color: "var(--accent)" }} />
              <span>{shopInfo.name}</span>
            </Link>
            <p style={{ color: "var(--text-light)", opacity: 0.85, fontSize: "0.95rem", marginBottom: "1.4rem", maxWidth: "320px" }}>
              {shopInfo.tagline} {shopInfo.subTagline}
            </p>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              <a
                href={shopInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cream)"
                }}
              >
                <Instagram size={18} />
              </a>
              <a
                href={shopInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cream)"
                }}
              >
                <Facebook size={18} />
              </a>
              <a
                href={shopInfo.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cream)"
                }}
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: "var(--cream)", fontSize: "1.2rem", marginBottom: "1.2rem" }}>
              Explore Café
            </h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">Our Story & Heritage</Link></li>
              <li><Link to="/menu" className="footer-link">Café Menu & Delights</Link></li>
              <li><Link to="/products" className="footer-link">Specialty Roasts & Beans</Link></li>
              <li><Link to="/gallery" className="footer-link">Photo Gallery</Link></li>
              <li><Link to="/offers" className="footer-link">Deals & Combos</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Info */}
          <div>
            <h4 style={{ color: "var(--cream)", fontSize: "1.2rem", marginBottom: "1.2rem" }}>
              Help & Support
            </h4>
            <ul className="footer-links-list">
              <li><Link to="/faq" className="footer-link">Frequently Asked Questions</Link></li>
              <li><Link to="/inquiry" className="footer-link">Bulk / Event Inquiries</Link></li>
              <li><Link to="/contact" className="footer-link">Contact & Location</Link></li>
              <li>
                <a
                  href={getWhatsAppLink(shopInfo.whatsapp, "Hello Brewora Coffee, I need assistance with an order.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  WhatsApp Assistance
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Visit Us & Newsletter */}
          <div>
            <h4 style={{ color: "var(--cream)", fontSize: "1.2rem", marginBottom: "1.2rem" }}>
              Visit & Connect
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <MapPin size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "3px" }} />
                <span>{shopInfo.address}</span>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <Phone size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <span>{shopInfo.phone}</span>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <Mail size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <span>{shopInfo.email}</span>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <Clock size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <span>{shopInfo.openingTime} – {shopInfo.closingTime}</span>
              </div>
            </div>

            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} style={{ position: "relative" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="email"
                  placeholder="Get secret roast drops..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(192, 139, 92, 0.3)",
                    borderRadius: "var(--radius-pill)",
                    padding: "0.6rem 1rem",
                    color: "var(--cream)",
                    fontSize: "0.85rem",
                    width: "100%"
                  }}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-accent btn-sm btn-icon"
                  style={{ flexShrink: 0 }}
                  aria-label="Subscribe"
                >
                  <Send size={15} />
                </button>
              </div>
              {subscribed && (
                <div style={{ color: "#86efac", fontSize: "0.75rem", marginTop: "0.4rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <CheckCircle2 size={13} /> Subscribed to Roaster Newsletter!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom Bar with Hidden AD Entry */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {shopInfo.name}. All rights reserved. Handcrafted with passion.
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Specialty Coffee Association Member
            </span>

            {/* VERY IMPORTANT: Hidden Admin Entry Link (AD) as requested */}
            <Link 
              to="/ad-login" 
              className="hidden-ad-link"
              title="Admin Portal Entry"
              aria-label="Admin Portal"
            >
              AD
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
