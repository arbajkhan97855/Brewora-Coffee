import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import SectionTitle from "../components/SectionTitle";
import { getWhatsAppLink } from "../utils/storage";
import { 
  Coffee, 
  Award, 
  Users, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Heart,
  Flame,
  CheckCircle2
} from "lucide-react";

export default function About() {
  const { shopInfo } = useShop();

  const baristas = [
    {
      name: "Kabir Mehra",
      role: "Head Master Roaster & Q-Grader",
      bio: "12+ years in specialty coffee roasting. Certified Q-Grader obsessively perfecting origin roasting curves.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Tanya Sen",
      role: "Lead Barista & Latte Art Champion",
      bio: "National Latte Art Finalist with a passion for microfoam texture and complex sensory extraction.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Devrath Singh",
      role: "Estate Sourcing Specialist",
      bio: "Spends months on shade-grown estates in South India selecting the top 2% of Arabica crop yields.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "The First Roast in Jaipur",
      description: "Brewora Coffee opened its doors with a small 2.5kg drum roaster and a deep love for Indian Arabica."
    },
    {
      year: "2020",
      title: "Direct Estate Partnerships",
      description: "Forged direct fair-trade agreements with 4 generational family estates in Chikmagalur and Coorg."
    },
    {
      year: "2022",
      title: "Kyoto Cold Drip & Roastery Lab",
      description: "Expanded the cafe to introduce slow drip towers and community cupping masterclasses."
    },
    {
      year: "2025",
      title: "Award for Best Specialty Café",
      description: "Voted city's top specialty coffee brand with over 10,000+ satisfied coffee connoisseurs."
    }
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(23,18,15,0.92) 0%, rgba(62,39,35,0.85) 100%), url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "var(--white)",
          padding: "6rem 0 4.5rem 0",
          textAlign: "center"
        }}
      >
        <div className="container-sm">
          <span className="section-badge dark">☕ Discover Our Soul</span>
          <h1 style={{ fontSize: "3.2rem", color: "var(--white)", marginBottom: "1rem" }}>
            The Story Behind Every Brew
          </h1>
          <p style={{ color: "var(--text-light)", fontSize: "1.15rem", lineHeight: 1.7, maxWidth: "680px", margin: "0 auto" }}>
            We believe coffee is not just a morning habit, but an intimate craft that connects remote mountain soil to your soul.
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section style={{ backgroundColor: "var(--secondary)", color: "var(--cream)", padding: "2rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
            <div>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--accent)", fontFamily: "var(--font-serif)" }}>
                {shopInfo.happyCustomers}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Happy Customers Served</div>
            </div>
            <div>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--accent)", fontFamily: "var(--font-serif)" }}>
                {shopInfo.varietiesCount}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Specialty Coffee Varieties</div>
            </div>
            <div>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--accent)", fontFamily: "var(--font-serif)" }}>
                {shopInfo.experienceYears}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Years of Roasting Passion</div>
            </div>
            <div>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--accent)", fontFamily: "var(--font-serif)" }}>
                {shopInfo.rating} / 5.0
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>Average Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story & Philosophy */}
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "center" }}>
            <div>
              <span className="section-badge">✨ Our Philosophy</span>
              <h2 style={{ fontSize: "2.4rem", marginBottom: "1.2rem", color: "var(--white)" }}>
                Crafting Timeless Moments Over Specialty Coffee
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.2rem" }}>
                At <strong style={{ color: "var(--accent)" }}>{shopInfo.name}</strong>, we approach each coffee bean as an agricultural marvel. Grown under the lush biodiversity of the Western Ghats, our coffees absorb notes of wild cardamom, black pepper, and rainforest mist.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.8rem" }}>
                By roasting in small, monitored batches, we celebrate these delicate origin profiles rather than masking them behind burnt, over-dark roasts. The result is a cup bursting with chocolate warmth, berry vibrance, and clean sweetness.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", color: "var(--cream)", fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="var(--accent)" />
                  <span>100% Shade-Grown Single Estate Arabica</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", color: "var(--cream)", fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="var(--accent)" />
                  <span>Fair compensation & long-term farmer relationships</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", color: "var(--cream)", fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="var(--accent)" />
                  <span>Freshly roasted every single week in Jaipur</span>
                </div>
              </div>

              <Link to="/products" className="btn btn-primary">
                <span>Explore Artisan Beans</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80"
                alt="Espresso Extraction"
                style={{
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid var(--border-light)",
                  width: "100%",
                  height: "480px",
                  objectFit: "cover"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section section-alt">
        <div className="container-sm">
          <SectionTitle
            badge="Heritage Timeline"
            title="Our Journey Over The Years"
            subtitle="How a small passion project transformed into a destination for specialty coffee lovers."
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {milestones.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-card)",
                  padding: "1.8rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-dark)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  backdropFilter: "blur(12px)"
                }}
              >
                <div
                  style={{
                    background: "var(--secondary)",
                    color: "var(--accent)",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    fontFamily: "var(--font-serif)",
                    flexShrink: 0,
                    border: "1px solid var(--border-dark)"
                  }}
                >
                  {m.year}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--white)", marginBottom: "0.4rem" }}>
                    {m.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Roasters & Baristas */}
      <section className="section">
        <div className="container">
          <SectionTitle
            badge="Craftsmen"
            title="Meet Our Roasters & Baristas"
            subtitle="The passionate artisans behind your morning perfection."
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {baristas.map((barista, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  border: "1px solid var(--border-dark)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(12px)"
                }}
              >
                <img
                  src={barista.image}
                  alt={barista.name}
                  style={{ width: "100%", height: "280px", objectFit: "cover" }}
                  loading="lazy"
                />
                <div style={{ padding: "1.5rem", background: "rgba(23, 18, 15, 0.95)" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {barista.role}
                  </span>
                  <h3 style={{ fontSize: "1.3rem", color: "var(--white)", margin: "0.3rem 0 0.6rem 0" }}>
                    {barista.name}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.55 }}>
                    {barista.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
