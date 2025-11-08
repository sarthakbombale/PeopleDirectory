import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function EditMemberModal({ member, onClose, onSave }) {
  const theme = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    teams: "",
    avatarUrl: "",
    status: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name || "",
        email: member.email || "",
        role: member.role || "",
        teams: (member.teams || []).join(", "),
        avatarUrl: member.avatar || "",
        status: member.status || "",
      });
      setImagePreview(member.avatar || "");
    }
  }, [member]);

  if (!member) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "avatarUrl") {
      setImagePreview(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...member,
      name: form.name,
      email: form.email,
      role: form.role,
      teams: form.teams.split(",").map((t) => t.trim()).filter(Boolean),
      avatar: form.avatarUrl || member.avatar,
      status: form.status,
    };
    onSave(updated);
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
        overflowY: "auto",
        padding: "40px 10px",
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
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Edit Member</h3>
        <p
          style={{
            marginTop: 6,
            marginBottom: 12,
            color: theme.colors.secondaryText,
            fontSize: "0.95rem",
          }}
        >
          Editable fields: <strong>Name</strong>, <strong>Email</strong>,{" "}
          <strong>Role</strong>, <strong>Teams</strong>.
          <br />
          ID is shown below (read-only)
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gap: 10 }}>
            {/* Image URL Section */}
            <label style={{ fontSize: 12, color: theme.colors.secondaryText }}>
              Profile Image (URL only)
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "10px",
              }}
            >
              {imagePreview && (
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  name="avatarUrl"
                  placeholder="Enter image URL"
                  value={form.avatarUrl}
                  onChange={handleChange}
                  style={{
                    padding: 8,
                    borderRadius: 6,
                    border: `1px solid ${theme.colors.border}`,
                    background: theme.colors.surface,
                    color: theme.colors.text,
                    width: "100%",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                fontSize: 12,
                color: theme.colors.secondaryText,
                marginBottom: 10,
              }}
            >
              Enter a direct image URL (e.g., https://example.com/avatar.jpg)
            </div>

            {/* ID (read-only) */}
            <label style={{ fontSize: 12, color: theme.colors.secondaryText }}>
              ID (read-only)
            </label>
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

            {/* Status */}
            <div>
              <label
                style={{
                  fontSize: 12,
                  color: theme.colors.secondaryText,
                  textTransform: "capitalize",
                }}
              >
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={{
                  padding: 8,
                  borderRadius: 6,
                  border: `1px solid ${theme.colors.border}`,
                  background: theme.colors.surface,
                  color: theme.colors.text,
                  width: "100%",
                }}
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>


            {/* Editable Fields */}
            {["name", "email", "role", "teams"].map((field) => (
              <div key={field}>
                <label
                  style={{
                    fontSize: 12,
                    color: theme.colors.secondaryText,
                    textTransform: "capitalize",
                  }}
                >
                  {field}
                </label>
                <input
                  name={field}
                  placeholder={`Enter ${field}`}
                  value={form[field]}
                  onChange={handleChange}
                  style={{
                    padding: 8,
                    borderRadius: 6,
                    border: `1px solid ${theme.colors.border}`,
                    background: theme.colors.surface,
                    color: theme.colors.text,
                    width: "100%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 20,
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
