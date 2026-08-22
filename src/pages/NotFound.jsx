import React from "react";
import { Link } from "react-router-dom";
import { Coffee, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "3rem 1.5rem"
      }}
    >
      <div style={{ maxWidth: "500px" }}>
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "rgba(192, 139, 92, 0.15)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem auto"
          }}
        >
          <Coffee size={46} />
        </div>
        <span className="section-badge" style={{ marginBottom: "0.5rem" }}>404 Error</span>
        <h1 style={{ fontSize: "2.8rem", color: "var(--secondary)", marginBottom: "0.8rem" }}>
          Spilled The Coffee!
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", marginBottom: "2rem" }}>
          The page you are looking for might have been brewed and poured away, or the link may be mistyped.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            <span>Return to Home</span>
          </Link>
          <Link to="/products" className="btn btn-outline">
            <span>Explore Coffee Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
