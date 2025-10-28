import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function TeamMember({ member, onDelete, onEdit, onSelect }) {
  const theme = useTheme();
  const teamColors = {
    Design: '#FF5733',
    Product: '#33A852',
    Marketing: '#3357FF',
  };

  return (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => onSelect(member)}
    >
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
          <div className="name-container" style={{ minWidth: 0, overflow: 'hidden' }}>
            <strong className="member-name-text">{member.name}</strong>
            <div className="member-username" style={{ color: theme.colors.secondaryText, fontSize: "0.9rem" }}>
              @{member.username}
            </div>
          </div>
        </div>
      </td>

  <td data-label="Status">
        <span
          style={{
            backgroundColor: theme.isDarkMode ? "rgba(25,135,84,0.12)" : "#e9f7ef",
            color: "#198754",
            padding: "3px 10px",
            borderRadius: "20px",
            fontSize: "0.85rem",
          }}
        >
          {member.status}
        </span>
      </td>

      <td data-label="Role">
        <span className="role-text" title={member.role}>{member.role}</span>
      </td>
      <td data-label="Email">
        <span className="email-text" title={member.email}>{member.email}</span>
      </td>

      <td data-teams data-label="Teams">
        <div className="team-badges-container">
          {member.teams && member.teams.length > 0 ? (
            (() => {
              const visible = member.teams.slice(0, 2);
              const extra = member.teams.length - visible.length;
              return (
                <>
            {visible.map((team, index) => {
                      const borderColor = teamColors[team] || (theme.isDarkMode ? '#ffffff' : '#000000');
                      // Inline capsule style as a robust fallback to ensure capsule look
                      const inlineBadge = {
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '6px 10px',
                        marginRight: 8,
                        marginBottom: 8,
                        borderRadius: 999,
                        border: `1px solid ${borderColor}`,
                        background: theme.isDarkMode ? 'rgba(255,255,255,0.04)' : 'transparent',
                        color: theme.isDarkMode ? '#fff' : '#111827',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '160px',
                      };

                      return (
                        <span
                          key={index}
                          className="team-badge"
                          data-team={team}
                          title={team}
                          style={inlineBadge}
                        >
                          {team}
                        </span>
                      );
                    })}
                  {extra > 0 && (
                    <span
                      className="team-badge team-more"
                      title={member.teams.slice(2).join(', ')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '6px 10px',
                        marginRight: 8,
                        marginBottom: 8,
                        borderRadius: 999,
                        border: `1px dashed ${theme.isDarkMode ? '#ffffff' : '#9ca3af'}`,
                        background: theme.isDarkMode ? 'rgba(255,255,255,0.04)' : '#f3f4f6',
                        color: theme.isDarkMode ? '#fff' : '#374151',
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      +{extra}
                    </span>
                  )}
                </>
              );
            })()
          ) : null}
        </div>
      </td>

  <td data-label="Actions" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onDelete(member.id)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: theme.isDarkMode ? "#ff8a80" : "red",
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

