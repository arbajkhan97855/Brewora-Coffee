import React from "react";
import { Coffee, RotateCcw } from "lucide-react";

export default function EmptyState({
  title = "No Coffee Found",
  message = "Sorry, we couldn't find any coffee products matching your filters or search terms.",
  onReset
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 2rem",
        background: "var(--white)",
        borderRadius: "var(--radius-lg)",
        border: "1.5px dashed var(--border-strong)",
        margin: "2rem auto",
        maxWidth: "600px"
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: "rgba(192, 139, 92, 0.15)",
          color: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem auto"
        }}
      >
        <Coffee size={36} />
      </div>
      <h3 style={{ fontSize: "1.4rem", color: "var(--secondary)", marginBottom: "0.6rem" }}>
        {title}
      </h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem", maxWidth: "420px", margin: "0 auto 1.5rem auto" }}>
        {message}
      </p>
      {onReset && (
        <button onClick={onReset} className="btn btn-outline btn-sm">
          <RotateCcw size={15} /> Reset Filters
        </button>
      )}
    </div>
  );
}
