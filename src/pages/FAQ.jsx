import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import FAQAccordion from "../components/FAQAccordion";
import SectionTitle from "../components/SectionTitle";
import { getWhatsAppLink } from "../utils/storage";
import { Search, HelpCircle, MessageSquare, ArrowRight } from "lucide-react";

export default function FAQ() {
  const { faqs, shopInfo } = useShop();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Ordering & Takeaway",
    "Coffee & Sourcing",
    "Dietary & Menu",
    "Brewing & Beans",
    "Events & Catering",
    "Freshness & Support"
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" ||
      faq.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(23,18,15,0.92) 0%, rgba(62,39,35,0.85) 100%), url('https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--white)",
          padding: "5.5rem 0 4rem 0",
          textAlign: "center"
        }}
      >
        <div className="container-sm">
          <span className="section-badge dark">❓ Got Questions?</span>
          <h1 style={{ fontSize: "3.2rem", color: "var(--white)", marginBottom: "1rem" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: "var(--text-light)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Everything you need to know about our beans, brewing techniques, café reservations, and takeaway.
          </p>
        </div>
      </section>

      {/* FAQ Main Content */}
      <section className="section">
        <div className="container-sm">
          {/* Search bar */}
          <div style={{ marginBottom: "2rem" }}>
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search question or topic (e.g., takeaway, decaf, oat milk, grind size)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="menu-category-tabs" style={{ marginBottom: "2.5rem" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`menu-tab-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
                style={{ padding: "0.5rem 1.1rem", fontSize: "0.85rem" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion list */}
          {filteredFaqs.length > 0 ? (
            <FAQAccordion faqs={filteredFaqs} />
          ) : (
            <div style={{ textAlign: "center", padding: "3rem", background: "var(--white)", borderRadius: "var(--radius-md)" }}>
              <HelpCircle size={36} color="var(--accent)" style={{ margin: "0 auto 1rem auto" }} />
              <h3 style={{ color: "var(--secondary)", marginBottom: "0.5rem" }}>No matching answers found</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Feel free to message our barista team directly on WhatsApp or submit an inquiry.
              </p>
              <button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="btn btn-outline btn-sm">
                Clear Search
              </button>
            </div>
          )}

          {/* Direct Support Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, var(--secondary) 0%, var(--dark) 100%)",
              color: "var(--white)",
              borderRadius: "var(--radius-lg)",
              padding: "3rem 2rem",
              marginTop: "4.5rem",
              textAlign: "center"
            }}
          >
            <h3 style={{ fontSize: "1.8rem", color: "var(--cream)", marginBottom: "0.8rem" }}>
              Still Have Unanswered Questions?
            </h3>
            <p style={{ color: "var(--text-light)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto 2rem auto" }}>
              Our master roasters and barista support team are available 7 days a week to assist you.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={getWhatsAppLink(shopInfo.whatsapp, "Hello Brewora Coffee, I have a specific question not covered in your FAQ.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageSquare size={16} /> Chat on WhatsApp
              </a>
              <Link to="/inquiry" className="btn btn-accent">
                <span>Submit Detailed Inquiry</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
