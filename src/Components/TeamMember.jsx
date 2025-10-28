import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function TeamMember({ member, onDelete, onEdit, onSelect }) {
  const theme = useTheme();

  return (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => onSelect(member)}
    >
      <td>
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
          <div>
            <strong className="member-name-text">{member.name}</strong>
            <div className="member-name-text" style={{ color: theme.colors.secondaryText, fontSize: "0.9rem" }}>
              @{member.username}
            </div>
          </div>
        </div>
      </td>

      <td>
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

      <td>
        <span className="role-text" title={member.role}>{member.role}</span>
      </td>
      <td>
        <span className="email-text" title={member.email}>{member.email}</span>
      </td>

      <td>
        {/* Show first two teams, then a +N indicator if more exist */}
        {member.teams && member.teams.length > 0 ? (
          (() => {
            const visible = member.teams.slice(0, 2);
            const extra = member.teams.length - visible.length;
            return (
              <>
                {visible.map((team, index) => (
                  <span
                    key={index}
                    className={`team-badge ${index % 2 === 1 ? 'alt' : ''}`}
                    title={team}
                  >
                    {team}
                  </span>
                ))}
                {extra > 0 && (
                  <span
                    className="team-badge team-more"
                    title={member.teams.slice(2).join(', ')}
                  >
                    +{extra}
                  </span>
                )}
              </>
            );
          })()
        ) : null}
      </td>

      <td onClick={(e) => e.stopPropagation()}>
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

