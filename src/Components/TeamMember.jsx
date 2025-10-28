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

      <td>{member.role}</td>
      <td>{member.email}</td>

      <td>
        {member.teams.map((team, index) => (
          <span
            key={index}
            style={{
              backgroundColor: theme.isDarkMode ? "#2b2b2b" : "#f0f0f0",
              borderRadius: "20px",
              padding: "3px 8px",
              marginRight: "5px",
              fontSize: "0.8rem",
              color: theme.colors.text,
            }}
          >
            {team}
          </span>
        ))}
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

