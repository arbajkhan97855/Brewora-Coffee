import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { adminInfo } from "../data/info";
import { Coffee, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound } from "lucide-react";

export default function AdminLogin() {
  const { adminLogin, isAdminLoggedIn, showToast } = useShop();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn || localStorage.getItem("adminLoggedIn") === "true") {
      navigate("/admin", { replace: true });
    }
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      const result = adminLogin(email.trim(), password);
      if (result.success) {
        navigate("/admin");
      } else {
        setErrorMessage(result.message);
        showToast(result.message, "error");
      }
      setIsLoading(false);
    }, 400);
  };

  const handleFillDemoCredentials = () => {
    setEmail(adminInfo.email);
    setPassword(adminInfo.password);
    showToast("Loaded credentials from info.js", "info");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, var(--dark) 0%, var(--secondary) 100%)",
        padding: "2rem 1rem",
        position: "relative"
      }}
    >
      <div style={{ position: "absolute", top: "2rem", left: "2rem" }}>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--cream)",
            fontSize: "0.9rem",
            background: "rgba(255, 255, 255, 0.1)",
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius-pill)"
          }}
        >
          <ArrowLeft size={16} /> Return to Public Café
        </Link>
      </div>

      <div
        style={{
          maxWidth: "440px",
          width: "100%",
          background: "var(--bg-card-solid)",
          borderRadius: "var(--radius-sm)",
          padding: "2.8rem 2.2rem",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
          border: "1px solid var(--border-dark)",
          backdropFilter: "blur(16px)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "var(--radius-sm)",
              background: "rgba(192, 139, 92, 0.15)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem auto",
              border: "1px solid var(--border-dark)"
            }}
          >
            <Coffee size={32} />
          </div>
          <h2 style={{ fontSize: "1.8rem", color: "var(--white)", fontWeight: 800, fontFamily: "var(--font-serif)" }}>
            Master Roaster Portal
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.2rem" }}>
            Sign in to manage café products, FAQs, and inquiries
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid var(--danger)",
              color: "#FCA5A5",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.85rem",
              marginBottom: "1.5rem"
            }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="email"
                className="form-input"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "2.6rem" }}
                required
              />
              <Mail size={18} style={{ position: "absolute", left: "0.9rem", color: "var(--text-muted)" }} />
            </div>
          </div>

          {/* Password Input with Show/Hide toggle */}
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
              <label className="form-label" style={{ margin: 0 }}>Password</label>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "2.6rem", paddingRight: "2.6rem" }}
                required
              />
              <Lock size={18} style={{ position: "absolute", left: "0.9rem", color: "var(--text-muted)" }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.9rem",
                  color: "var(--text-muted)",
                  padding: "4px"
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1.2rem" }}
            disabled={isLoading}
          >
            <ShieldCheck size={18} />
            <span>{isLoading ? "Verifying..." : "Login to CMS"}</span>
          </button>
        </form>

      
      </div>
    </div>
  );
}
