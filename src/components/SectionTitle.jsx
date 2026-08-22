import React from "react";

export default function SectionTitle({
  badge,
  title,
  subtitle,
  dark = false,
  align = "center"
}) {
  return (
    <div
      className="section-header"
      style={{
        textAlign: align,
        marginLeft: align === "center" ? "auto" : "0",
        marginRight: align === "center" ? "auto" : "0"
      }}
    >
      {badge && (
        <span className={`section-badge ${dark ? "dark" : ""}`}>
          ☕ {badge}
        </span>
      )}
      <h2 className="section-title" style={{ color: dark ? "var(--white)" : "var(--dark)" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="section-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}
