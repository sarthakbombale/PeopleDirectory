import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function EditMemberModal({ member, onClose, onSave }) {
  const theme = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    teams: "",
  });

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name || "",
        email: member.email || "",
        role: member.role || "",
        teams: (member.teams || []).join(", "),
      });
    }
  }, [member]);

  if (!member) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...member,
      name: form.name,
      email: form.email,
      role: form.role,
      teams: form.teams.split(",").map((t) => t.trim()).filter(Boolean),
    };
    onSave(updated); // sends data to parent
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 600,
          maxWidth: "95%",
          background: theme.colors.surface,
          color: theme.colors.text,
          borderRadius: 8,
          padding: 20,
          boxShadow: theme.colors.cardShadow,
        }}
      >
        <h3 style={{ marginTop: 0 }}>Edit Member</h3>
        <p style={{ marginTop: 6, marginBottom: 12, color: theme.colors.secondaryText, fontSize: '0.95rem' }}>
          Editable fields: <strong>Name</strong>, <strong>Email</strong>, <strong>Role</strong>, <strong>Teams</strong>.
          <br />ID is shown below (read-only)
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gap: 8 }}>
            <label style={{ fontSize: 12, color: theme.colors.secondaryText }}>ID (read-only)</label>
            <input
              name="id"
              value={member.id}
              readOnly
              style={{
                padding: 8,
                borderRadius: 6,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.secondaryText,
              }}
            />

            <label style={{ fontSize: 12, color: theme.colors.secondaryText }}>Full name</label>
            <input
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              style={{
                padding: 8,
                borderRadius: 6,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
            <div style={{ fontSize: 12, color: theme.colors.secondaryText }}>Change the display name shown in the table.</div>
            <label style={{ fontSize: 12, color: theme.colors.secondaryText }}>Email</label>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={{
                padding: 8,
                borderRadius: 6,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
            <div style={{ fontSize: 12, color: theme.colors.secondaryText }}>Primary contact email for this member.</div>
            <label style={{ fontSize: 12, color: theme.colors.secondaryText }}>Role</label>
            <input
              name="role"
              placeholder="Role"
              value={form.role}
              onChange={handleChange}
              style={{
                padding: 8,
                borderRadius: 6,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
            <div style={{ fontSize: 12, color: theme.colors.secondaryText }}>Job title or role shown in the table.</div>
            <label style={{ fontSize: 12, color: theme.colors.secondaryText }}>Teams</label>
            <input
              name="teams"
              placeholder="Teams (comma separated)"
              value={form.teams}
              onChange={handleChange}
              style={{
                padding: 8,
                borderRadius: 6,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            />
            <div style={{ fontSize: 12, color: theme.colors.secondaryText }}>Comma-separated list (e.g. Design, Product).</div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 15,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: `1px solid ${theme.colors.buttonBorder}`,
                background: theme.colors.buttonBg,
                color: theme.colors.buttonText,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                background: theme.colors.primary,
                color: "#fff",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

