import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQAccordion({ faqs = [] }) {
  const [openId, setOpenId] = useState(faqs.length > 0 ? faqs[0].id : null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (!faqs || faqs.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
        No FAQs available currently.
      </div>
    );
  }

  return (
    <div className="faq-accordion-list">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className={`faq-item ${isOpen ? "open" : ""}`}>
            <button
              className="faq-question-btn"
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <HelpCircle size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <span>{faq.question}</span>
              </span>
              <ChevronDown
                size={20}
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  color: isOpen ? "var(--primary)" : "var(--text-muted)",
                  flexShrink: 0
                }}
              />
            </button>
            {isOpen && (
              <div className="faq-answer">
                {faq.answer}
                {faq.category && (
                  <div style={{ marginTop: "0.6rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "0.2rem 0.6rem",
                        background: "var(--cream-alt)",
                        color: "var(--accent)",
                        borderRadius: "var(--radius-pill)"
                      }}
                    >
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
