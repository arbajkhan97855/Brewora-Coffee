import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { getWhatsAppLink } from "../utils/storage";
import { 
  Coffee, 
  Search, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Clock, 
  MessageSquare, 
  ArrowRight 
} from "lucide-react";

export default function Navbar() {
  const { shopInfo } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMobileOpen(false);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Products", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Offers", path: "/offers" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="header-topbar">
        <div className="container">
          <div className="topbar-info">
            <span className="topbar-item">
              <Clock size={13} /> {shopInfo.openingTime} – {shopInfo.closingTime} (Daily)
            </span>
            <span className="topbar-item">
              <Phone size={13} /> {shopInfo.phone}
            </span>
          </div>
          <div>
            <span style={{ fontSize: "0.8rem", color: "var(--accent)" }}>
              ☕ Fresh Artisan Roasts & Artisanal Coffee Lounge
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container nav-container">
          {/* Logo */}
          <Link to="/" className="brand-logo" onClick={() => setMobileOpen(false)}>
            <Coffee className="logo-cup" size={28} />
            <span>{shopInfo.name.split(" ")[0]}<span style={{ color: "var(--accent)" }}>{shopInfo.name.split(" ")[1] || "Coffee"}</span></span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Action Icons */}
          <div className="nav-actions">
            <button
              className="search-toggle-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              title="Search Coffee"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <a
              href={getWhatsAppLink(shopInfo.whatsapp, "Hello Brewora Coffee, I want to know more about your coffee menu.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm btn-icon"
              title="Chat on WhatsApp"
              aria-label="WhatsApp"
            >
              <MessageSquare size={18} />
            </a>

            <Link to="/inquiry" className="btn btn-primary btn-sm">
              <span>Book Table / Inquiry</span>
              <ArrowRight size={15} />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className="hamburger-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Global Search Bar Dropdown */}
        {searchOpen && (
          <div style={{
            background: "var(--white)",
            padding: "1rem 0",
            borderTop: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-md)"
          }}>
            <div className="container">
              <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "0.8rem", maxWidth: "600px", margin: "0 auto" }}>
                <div className="search-input-box" style={{ flexGrow: 1 }}>
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search espresso, cold brew, beans, latte..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Search
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={16} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="brand-logo" onClick={() => setMobileOpen(false)}>
            <Coffee className="logo-cup" size={24} />
            <span>{shopInfo.name}</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{ color: "var(--secondary)" }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearchSubmit} style={{ marginBottom: "1.5rem" }}>
          <div className="search-input-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search coffee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setMobileOpen(false)}
              >
                <span>{item.name}</span>
                <ArrowRight size={16} />
              </NavLink>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "auto", paddingTop: "2rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <Link
            to="/inquiry"
            className="btn btn-primary btn-sm"
            onClick={() => setMobileOpen(false)}
          >
            Make an Inquiry
          </Link>
          <a
            href={getWhatsAppLink(shopInfo.whatsapp, "Hello Brewora Coffee, I would like to place an inquiry.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
          >
            <MessageSquare size={16} /> WhatsApp Order
          </a>
        </div>
      </aside>
    </>
  );
}
