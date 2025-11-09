import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function TeamMember({ member, onDelete, onEdit, onSelect }) {
  const theme = useTheme();

  // ✅ Team colors — polished and brand-like
  const teamColors = {
    Design: "#F97316",      // warm orange
    Product: "#16A34A",     // balanced green
    Marketing: "#2563EB",   // vivid blue
    Sales: "#EAB308",       // soft yellow-gold
    HR: "#9333EA",          // elegant purple
    Engineering: "#0EA5E9", // tech cyan-blue
    Support: "#EF4444",     // confident red
  };


  // ✅ Status badge styles
  const getStatusStyle = (status) => {
    const styles = {
      Active: {
        bg: theme.isDarkMode ? "rgba(46,204,113,0.12)" : "#e9f7ef",
        color: "#27ae60",
      },
      Inactive: {
        bg: theme.isDarkMode ? "rgba(231,76,60,0.12)" : "#fdecea",
        color: "#c0392b",
      },
      "On Leave": {
        bg: theme.isDarkMode ? "rgba(241,196,15,0.12)" : "#fff7e6",
        color: "#f39c12",
      },
    };
    return (
      styles[status] || {
        bg: theme.isDarkMode ? "rgba(255,255,255,0.05)" : "#f3f4f6",
        color: theme.isDarkMode ? "#9ca3af" : "#374151",
      }
    );
  };

  const statusStyle = getStatusStyle(member.status);

  return (
    <tr style={{ cursor: "pointer" }} onClick={() => onSelect(member)}>
      {/* ✅ Name */}
      <td data-label="Name">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={member.avatar}
            alt={member.name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div className="name-container" style={{ minWidth: 0, overflow: "hidden" }}>
            <strong className="member-name-text">{member.name}</strong>
            <div
              className="member-username"
              style={{ color: theme.colors.secondaryText, fontSize: "0.9rem" }}
            >
              @{member.username}
            </div>
          </div>
        </div>
      </td>

      {/* ✅ Status */}
      <td data-label="Status">
        <span
          style={{
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: 500,
            background: statusStyle.bg,
            color: statusStyle.color,
            textTransform: "capitalize",
          }}
        >
          {member.status}
        </span>
      </td>

      {/* ✅ Role */}
      <td data-label="Role">
        <span className="role-text" title={member.role}>
          {member.role}
        </span>
      </td>

      {/* ✅ Email */}
      <td data-label="Email">
        <span className="email-text" title={member.email}>
          {member.email}
        </span>
      </td>

      {/* ✅ Teams (colorful badges) */}
      {/* Teams (compact badges) */}
      <td data-teams data-label="Teams">
        <div className="team-badges-container" style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {member.teams && member.teams.length > 0 ? (
            (() => {
              const visible = member.teams.slice(0, 2);
              const extra = member.teams.length - visible.length;

              return (
                <>
                  {visible.map((team, index) => {
                    const bgColor = teamColors[team] || "#ccc";

                    return (
                      <span
                        key={index}
                        title={team}
                        style={{
                          display: "inline-block",
                          padding: "2px 6px",
                          borderRadius: "999px",
                          backgroundColor: bgColor,
                          color: "#fff",
                          fontSize: "0.65rem",
                          fontWeight: 500,
                          textTransform: "capitalize",
                        }}
                      >
                        {team}
                      </span>
                    );
                  })}

                  {extra > 0 && (
                    <span title={member.teams.slice(2).join(", ")} style={{ fontSize: "0.65rem" }}>
                      +{extra}
                    </span>
                  )}
                </>
              );
            })()
          ) : null}
        </div>
      </td>


      {/* ✅ Actions */}
      <td data-label="Actions" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onDelete(member.id)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: theme.isDarkMode ? "#f81500ff" : "red",
            marginRight: "10px",
          }}
        >
          <FaTrash />
        </button>
        <button
          onClick={() => onEdit(member.id)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: theme.colors.primary,
          }}
        >
          <FaEdit />
        </button>
      </td>
    </tr>
  );
}

export default TeamMember;
