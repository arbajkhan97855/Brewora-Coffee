import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import SectionTitle from "../components/SectionTitle";
import { getWhatsAppLink } from "../utils/storage";
import { Tag, Sparkles, Clock, Copy, Check, MessageSquare, ArrowRight } from "lucide-react";

export default function Offers() {
  const { offers, shopInfo, showToast } = useShop();
  const [copiedCode, setCopiedCode] = useState("");

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Promo code "${code}" copied to clipboard!`, "success");
    setTimeout(() => setCopiedCode(""), 3000);
  };

  return (
    <div>
      {/* Hero Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(23,18,15,0.92) 0%, rgba(62,39,35,0.85) 100%), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--white)",
          padding: "5.5rem 0 4rem 0",
          textAlign: "center"
        }}
      >
        <div className="container-sm">
          <span className="section-badge dark">🎁 Exclusive Connoisseur Privileges</span>
          <h1 style={{ fontSize: "3.2rem", color: "var(--white)", marginBottom: "1rem" }}>
            Special Offers & Combos
          </h1>
          <p style={{ color: "var(--text-light)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Enjoy handcrafted savings on your favorite morning beverages, afternoon combos, and specialty beans.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="section">
        <div className="container">
          <div className="offers-grid">
            {offers.map((offer) => {
              const whatsappMessage = `Hello ${shopInfo.name}, I would like to redeem the offer: *${offer.title}* with code *${offer.code}*!`;
              const isCopied = copiedCode === offer.code;

              return (
                <div key={offer.id} className="offer-card" style={{ opacity: offer.active ? 1 : 0.6 }}>
                  <div className="offer-img-box">
                    <img src={offer.image} alt={offer.title} className="offer-img" loading="lazy" />
                    <span className="offer-discount-badge">{offer.discount}</span>
                  </div>
                  <div className="offer-content">
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase" }}>
                          {offer.badge || "Special Deal"}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Clock size={12} /> {offer.validUntil}
                        </span>
                      </div>

                      <h3 style={{ fontSize: "1.35rem", color: "var(--secondary)", margin: "0.4rem 0 0.6rem 0" }}>
                        {offer.title}
                      </h3>

                      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1rem" }}>
                        {offer.description}
                      </p>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.2rem" }}>
                        <div className="offer-code-badge" style={{ margin: 0, flexGrow: 1, justifyContent: "space-between", display: "flex" }}>
                          <span>CODE: <strong>{offer.code}</strong></span>
                          <button
                            onClick={() => handleCopyCode(offer.code)}
                            style={{ color: "var(--primary)", display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.75rem" }}
                            title="Copy Promo Code"
                          >
                            {isCopied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                            {isCopied ? "Copied" : "Copy"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.6rem" }}>
                      <a
                        href={getWhatsAppLink(shopInfo.whatsapp, whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-sm"
                        style={{ width: "100%" }}
                      >
                        <MessageSquare size={16} />
                        <span>Redeem on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Offer Terms */}
          <div
            style={{
              marginTop: "4rem",
              background: "var(--cream-alt)",
              padding: "2rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              lineHeight: 1.6
            }}
          >
            <h4 style={{ color: "var(--secondary)", fontSize: "1rem", marginBottom: "0.5rem" }}>
              📋 Terms & Conditions for Promotional Offers:
            </h4>
            <ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <li>Offers are valid for dine-in, takeaway, and direct WhatsApp takeaway orders.</li>
              <li>Only one promotional code can be applied per order.</li>
              <li>Morning Brew discounts apply until 11:00 AM local time daily.</li>
              <li>Brewora Coffee reserves the right to modify or conclude promotional offers at management discretion.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
