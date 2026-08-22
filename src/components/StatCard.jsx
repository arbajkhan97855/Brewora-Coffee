import React from "react";

export default function StatCard({ title, value, icon: Icon, changeText, color = "var(--primary)" }) {
  return (
    <div className="stat-card">
      <div className="stat-icon-wrap" style={{ color }}>
        {Icon && <Icon size={26} />}
      </div>
      <div>
        <div className="stat-val">{value}</div>
        <div className="stat-title">{title}</div>
        {changeText && (
          <div style={{ fontSize: "0.75rem", color: "var(--accent)", marginTop: "0.2rem", fontWeight: 600 }}>
            {changeText}
          </div>
        )}
      </div>
    </div>
  );
}
