import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import FAQAccordion from "../components/FAQAccordion";
import { getWhatsAppLink, formatCurrency } from "../utils/storage";
import { fullMenuItems } from "../data/menu";
import {
  Coffee,
  Sparkles,
  Award,
  Flame,
  Clock,
  ShieldCheck,
  Heart,
  ArrowRight,
  MessageSquare,
  Star,
  Users,
  ChevronRight,
  Layers,
  Feather,
  CheckCircle2
} from "lucide-react";

export default function Home() {
  const { products, faqs, offers, gallery, shopInfo } = useShop();
  const [activeMenuTab, setActiveMenuTab] = useState("all");

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const recentGallery = gallery.slice(0, 6);
  const homeFaqs = faqs.slice(0, 4);
  const activeOffers = offers.filter((o) => o.active).slice(0, 2);

  const previewMenu = fullMenuItems.slice(0, 6);

  const testimonials = [
    {
      id: 1,
      name: "Rohit & Meera Singhal",
      role: "Regular Coffee Connoisseurs",
      comment: "Brewora's 18-Hour Kyoto Cold Brew and Spanish Latte are unmatched anywhere in the city. The aroma when you step into the café is sheer heaven.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Aditya Vardhan",
      role: "Architect & Remote Worker",
      comment: "The quiet ambience, fast Wi-Fi, and precision pour-overs make Brewora my second home office. Their Single Origin Arabica Beans are my daily fuel.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Pooja Deshmukh",
      role: "Food & Lifestyle Critic",
      comment: "Every cup tells a true story here. From the velvety microfoam art to their freshly baked French croissants, Brewora defines luxury café culture.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-tag">
                <Sparkles size={16} />
                <span>Artisan Micro-Roastery & Café</span>
              </div>
              <h1 className="hero-title">
                Crafted With Passion. <span>Served With Love.</span>
              </h1>
              <p className="hero-subtitle">
                Discover handcrafted specialty coffee made from carefully selected estate-grown beans.
                Small-batch roasted to bring out nuanced notes of cocoa, berry zest, and golden caramel.
              </p>

              <div className="hero-cta-group">
                <Link to="/menu" className="btn btn-primary btn-lg">
                  <Coffee size={18} />
                  <span>Explore Menu</span>
                </Link>

                <a
                  href={getWhatsAppLink(shopInfo.whatsapp, "Hello Brewora Coffee, I want to explore your coffee menu and reserve a table!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                >
                  <MessageSquare size={18} />
                  <span>Talk on WhatsApp</span>
                </a>
              </div>

              {/* Statistics counter */}
              <div className="hero-stats-row">
                <div className="hero-stat-item">
                  <h3>{shopInfo.happyCustomers || "10K+"}</h3>
                  <p>Happy Coffee Lovers</p>
                </div>
                <div className="hero-stat-item">
                  <h3>{shopInfo.varietiesCount || "25+"}</h3>
                  <p>Artisan Brews & Roasts</p>
                </div>
                <div className="hero-stat-item">
                  <h3>{shopInfo.rating || "4.9"} ★</h3>
                  <p>Customer Rating</p>
                </div>
              </div>
            </div>

            {/* Visual Floating Graphic */}
            <div className="hero-visual">
              <div className="hero-main-card">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                  alt="Signature Coffee Pour"
                  className="hero-card-img"
                />
                <div className="floating-badge">
                  <Flame size={16} color="var(--accent)" />
                  <span>Fresh Daily Batch</span>
                </div>
                <div className="hero-card-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h4 style={{ color: "var(--cream)", fontSize: "1.2rem", marginBottom: "0.2rem" }}>
                        Estate Reserve Arabica
                      </h4>
                      <p style={{ color: "var(--accent)", fontSize: "0.85rem" }}>
                        Chikmagalur Single-Origin • Medium Roast
                      </p>
                    </div>
                    <Link to="/products" className="btn btn-accent btn-sm" style={{ padding: "0.5rem 0.9rem" }}>
                      View
                    </Link>
                  </div>
                </div>

                <div className="floating-award-card">
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Award size={22} />
                  </div>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.9rem", color: "var(--secondary)" }}>
                      Top Roastery Award
                    </strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      Best Specialty Café 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND STATS BAR */}
      <section style={{ backgroundColor: "var(--secondary)", color: "var(--cream)", padding: "2.5rem 0", borderBottom: "1px solid rgba(192, 139, 92, 0.2)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              <Coffee size={32} style={{ color: "var(--accent)" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "var(--font-serif)" }}>100% Arabica</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Direct Trade Sourcing</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              <Flame size={32} style={{ color: "var(--accent)" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "var(--font-serif)" }}>Drum Roasted</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Small Batch Freshness</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              <Clock size={32} style={{ color: "var(--accent)" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "var(--font-serif)" }}>18-Hour Drip</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Slow Cold Extraction</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              <Heart size={32} style={{ color: "var(--accent)" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "var(--font-serif)" }}>Artisan Baristas</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Craft In Every Cup</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COFFEE PRODUCTS */}
      <section className="section">
        <div className="container">
          <SectionTitle
            badge="Bestselling Brews"
            title="Signature Coffee Creations"
            subtitle="Handcrafted by our master baristas with premium beans roasted to perfection."
          />

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link to="/products" className="btn btn-primary">
              <span>View All {products.length} Coffee Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE BREWORA COFFEE */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            badge="The Brewora Standard"
            title="Why Discerning Coffee Lovers Choose Us"
            subtitle="We bridge the journey from organic coffee plantations directly to your cup."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            <div
              style={{
                background: "var(--bg-card)",
                padding: "2.2rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-dark)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(12px)"
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(192, 139, 92, 0.15)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.3rem",
                  border: "1px solid var(--border-dark)"
                }}
              >
                <Layers size={26} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.8rem", color: "var(--white)" }}>
                Single-Origin Shade Grown
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Beans harvested under indigenous forest canopies at 4,000+ ft elevations, preserving delicate fruity notes.
              </p>
            </div>

            <div
              style={{
                background: "var(--bg-card)",
                padding: "2.2rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-dark)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(12px)"
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(192, 139, 92, 0.15)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.3rem",
                  border: "1px solid var(--border-dark)"
                }}
              >
                <Flame size={26} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.8rem", color: "var(--white)" }}>
                Custom Micro-Roasting
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Roasting profiles tuned to highlight peak sweetness, rich body, and floral brightness without bitterness.
              </p>
            </div>

            <div
              style={{
                background: "var(--bg-card)",
                padding: "2.2rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-dark)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(12px)"
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(192, 139, 92, 0.15)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.3rem",
                  border: "1px solid var(--border-dark)"
                }}
              >
                <Award size={26} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.8rem", color: "var(--white)" }}>
                Barista Champion Craft
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Every single cup is extracted with dialed grind sizes, mineral water balancing, and silky textured milk.
              </p>
            </div>

            <div
              style={{
                background: "var(--bg-card)",
                padding: "2.2rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-dark)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(12px)"
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(192, 139, 92, 0.15)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.3rem",
                  border: "1px solid var(--border-dark)"
                }}
              >
                <Feather size={26} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.8rem", color: "var(--white)" }}>
                Cozy Sanctuary Space
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                An oasis of ambient jazz, natural sunlight, wooden tables, and high-speed fiber internet for your day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT COFFEE PHILOSOPHY / STORY */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
                alt="Brewora Coffee Roaster"
                style={{
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid rgba(192, 139, 92, 0.3)",
                  width: "100%",
                  height: "450px",
                  objectFit: "cover"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-1.5rem",
                  right: "-1.5rem",
                  background: "var(--secondary)",
                  border: "1px solid var(--accent)",
                  padding: "1.2rem 1.8rem",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-lg)",
                  maxWidth: "240px"
                }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--accent)", fontFamily: "var(--font-serif)" }}>
                  {shopInfo.experienceYears}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--cream)" }}>
                  Years of roasting excellence & specialty brewing
                </div>
              </div>
            </div>

            <div>
              <span className="section-badge dark">🌿 Our Heritage</span>
              <h2 style={{ fontSize: "2.5rem", color: "var(--white)", marginBottom: "1.3rem" }}>
                "Every Cup Has a Story."
              </h2>
              <p style={{ color: "var(--text-light)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.2rem" }}>
                Founded in 2018 in the historic heart of Jaipur, <strong>{shopInfo.name}</strong> was born from a singular obsession: to honor the authentic soul of Indian specialty coffee.
              </p>
              <p style={{ color: "var(--text-light)", opacity: 0.85, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                We work directly with generational coffee farmers across Chikmagalur and Coorg, ensuring ethical wages, fair trade, and sustainable agroforestry before roasting our beans in micro-batches right at our café.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link to="/about" className="btn btn-accent">
                  <span>Read Our Full Story</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/gallery" className="btn btn-outline-white">
                  <span>View Café Moments</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. POPULAR CAFÉ MENU PREVIEW */}
      <section className="section">
        <div className="container">
          <SectionTitle
            badge="Fresh From The Barista Counter"
            title="Explore Café Favorites"
            subtitle="From velvety flat whites to crisp Kyoto cold drip and warm flaky croissants."
          />

          <div className="menu-grid">
            {previewMenu.map((item) => (
              <div key={item.id} className="menu-item-card">
                <img src={item.image} alt={item.name} className="menu-item-thumb" loading="lazy" />
                <div className="menu-item-content">
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">{formatCurrency(item.price)}</span>
                  </div>
                  <p className="menu-item-desc">{item.description}</p>
                  <div className="menu-item-footer">
                    <span className="menu-item-meta">⚡ {item.tag}</span>
                    <Link
                      to={`/inquiry?product=${encodeURIComponent(item.name)}`}
                      className="btn btn-outline btn-sm"
                      style={{ padding: "0.35rem 0.85rem", fontSize: "0.8rem" }}
                    >
                      Inquire / Reserve
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/menu" className="btn btn-primary">
              <Coffee size={18} />
              <span>View Complete 16+ Item Menu</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. SPECIAL OFFERS & COMBOS */}
      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            badge="Limited Time Deals"
            title="Featured Café Specials"
            subtitle="Enjoy exclusive bundle discounts and morning specials handcrafted for you."
          />

          <div className="offers-grid">
            {activeOffers.map((offer) => (
              <div key={offer.id} className="offer-card">
                <div className="offer-img-box">
                  <img src={offer.image} alt={offer.title} className="offer-img" loading="lazy" />
                  <span className="offer-discount-badge">{offer.discount}</span>
                </div>
                <div className="offer-content">
                  <div>
                    <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase" }}>
                      {offer.badge}
                    </span>
                    <h3 style={{ fontSize: "1.3rem", color: "var(--secondary)", margin: "0.3rem 0 0.6rem 0" }}>
                      {offer.title}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.5 }}>
                      {offer.description}
                    </p>
                    <div className="offer-code-badge">
                      Code: {offer.code}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
                    <a
                      href={getWhatsAppLink(shopInfo.whatsapp, `Hello ${shopInfo.name}, I want to claim the offer: *${offer.title}* (Code: ${offer.code})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                      style={{ flexGrow: 1 }}
                    >
                      <MessageSquare size={15} /> Claim on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/offers" className="btn btn-outline btn-sm">
              <span>View All Offers & Combos</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. COFFEE MAKING EXPERIENCE / BREWING STEPS */}
      <section className="section">
        <div className="container">
          <SectionTitle
            badge="Our Master Process"
            title="From Cherry To Cup"
            subtitle="The strict 4-step artisan standard that goes into every single cup of Brewora coffee."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "var(--cream-alt)",
                  border: "2px solid var(--accent)",
                  color: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.2rem auto",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-serif)"
                }}
              >
                01
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--secondary)" }}>
                Selective Handpicking
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Only deep red, ripe cherries are harvested manually at peak brix sugar levels.
              </p>
            </div>

            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "var(--cream-alt)",
                  border: "2px solid var(--accent)",
                  color: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.2rem auto",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-serif)"
                }}
              >
                02
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--secondary)" }}>
                Precision Drum Roast
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Slow roasted in micro-lots to develop complex origin aromatics without scorched bitterness.
              </p>
            </div>

            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "var(--cream-alt)",
                  border: "2px solid var(--accent)",
                  color: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.2rem auto",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-serif)"
                }}
              >
                03
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--secondary)" }}>
                Dialed Extraction
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                9-bar precision extraction with 93.5°C mineral water creates silky hazelnut crema.
              </p>
            </div>

            <div style={{ textAlign: "center", padding: "1.5rem" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "var(--cream-alt)",
                  border: "2px solid var(--accent)",
                  color: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.2rem auto",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-serif)"
                }}
              >
                04
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--secondary)" }}>
                Velvet Presentation
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Poured fresh with free-hand latte art and served alongside warm hospitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="section section-dark">
        <div className="container">
          <SectionTitle
            badge="Customer Love"
            title="Stories From Coffee Enthusiasts"
            subtitle="Read what regulars and coffee critics have to say about the Brewora experience."
            dark
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {testimonials.map((t) => (
              <div
                key={t.id}
                style={{
                  background: "var(--dark-card)",
                  padding: "2rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(192, 139, 92, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "0.3rem", color: "#F59E0B", marginBottom: "1rem" }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" />
                    ))}
                  </div>
                  <p style={{ color: "var(--cream)", fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                    "{t.comment}"
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent)" }}
                  />
                  <div>
                    <h4 style={{ color: "var(--white)", fontSize: "1rem" }}>{t.name}</h4>
                    <span style={{ color: "var(--accent)", fontSize: "0.8rem" }}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. GALLERY HIGHLIGHTS */}
      <section className="section">
        <div className="container">
          <SectionTitle
            badge="Visual Journey"
            title="Moments at Brewora Café"
            subtitle="Glimpse our cozy seating, latte art masters, and the spirit of community."
          />

          <div className="gallery-grid">
            {recentGallery.map((item) => (
              <div key={item.id} className="gallery-card">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="gallery-card-overlay">
                  <span style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase" }}>
                    {item.category}
                  </span>
                  <h4 style={{ color: "white", fontSize: "1.1rem", marginTop: "0.2rem" }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/gallery" className="btn btn-outline">
              <span>View Full Gallery (12+ Photos)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FAQ PREVIEW */}
      <section className="section section-alt">
        <div className="container-sm">
          <SectionTitle
            badge="Common Inquiries"
            title="Frequently Asked Questions"
            subtitle="Answers to common queries about our takeaway, bean varieties, and brewing."
          />

          <FAQAccordion faqs={homeFaqs} />

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/faq" className="btn btn-outline btn-sm">
              <span>View All Questions</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 12. INQUIRY / RESERVATION CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--secondary) 0%, var(--dark) 100%)",
          color: "var(--white)",
          padding: "5rem 0",
          textAlign: "center",
          position: "relative"
        }}
      >
        <div className="container-sm">
          <span className="section-badge dark">✨ Host an Event or Bulk Order</span>
          <h2 style={{ fontSize: "2.6rem", color: "var(--white)", marginBottom: "1rem" }}>
            Planning a Tasting Session or Event?
          </h2>
          <p style={{ color: "var(--text-light)", fontSize: "1.1rem", marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem auto" }}>
            Whether you need custom roasted corporate gifts, an artisanal coffee bar at your wedding, or a table reservation, let our team craft your experience.
          </p>

          <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/inquiry" className="btn btn-accent btn-lg">
              <span>Submit Coffee Inquiry</span>
              <ArrowRight size={18} />
            </Link>
            <a
              href={getWhatsAppLink(shopInfo.whatsapp, "Hello Brewora Coffee, I want to inquire about bulk coffee / event catering.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageSquare size={18} />
              <span>Instant WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
