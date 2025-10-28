import React, { useState, useEffect } from "react";
import TeamMember from "./TeamMember";
import { members as data } from "../data";
import { FaCheckCircle, FaSearch, FaTimes, FaUserPlus } from "react-icons/fa";
import EditMemberModal from "./EditMemberModal";
import AddMemberModal from "./AddMemberModal";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

// Get stored members from localStorage or use default data
const getStoredMembers = () => {
  try {
    const storedMembers = localStorage.getItem('members');
    return storedMembers ? JSON.parse(storedMembers) : data;
  } catch {
    return data;
  }
};

function People() {
  const theme = useTheme();
  const [members, setMembers] = useState(getStoredMembers());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  // Save members to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  const membersPerPage = 10;

  // Filter Logic
  const filteredMembers = members.filter((m) => {
    const matchName =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = selectedRole ? m.role === selectedRole : true;
    const matchTeam = selectedTeam ? m.teams.includes(selectedTeam) : true;
    return matchName && matchRole && matchTeam;
  });

  const indexOfLast = currentPage * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const deleteMember = (id) => {
    const member = members.find((m) => m.id === id);
    if (!member) return;

    const toastId = toast(
      ({ closeToast }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>Are you sure you want to delete <strong>{member.name}</strong>?</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                toast.dismiss(toastId);
              }}
              style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${theme.colors.buttonBorder}`, background: theme.colors.buttonBg }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setMembers((prev) => prev.filter((m) => m.id !== id));
                if (selectedMember?.id === id) setSelectedMember(null);
                toast.dismiss(toastId);
                toast.error(`${member.name} deleted`, { autoClose: 3000 });
              }}
              style={{ padding: '6px 10px', borderRadius: 6, border: 'none', background: '#d9534f', color: '#fff' }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        closeOnClick: false,
        closeButton: false,
        autoClose: false,
      }
    );
  };

  const [editingMember, setEditingMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const editMember = (id) => {
    const member = members.find((m) => m.id === id);
    if (!member) return;
    setEditingMember(member);
  };

  const handleSaveMember = (updated) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === updated.id ? { ...m, ...updated } : m))
    );
    setSelectedMember((cur) => (cur?.id === updated.id ? { ...cur, ...updated } : cur));
    setEditingMember(null);
    toast.success(`${updated.name} updated`);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "25px",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          background: theme.colors.background,
          color: theme.colors.text,
          minHeight: "100vh",
          transition: "all 0.25s ease",
          flexWrap: "wrap", // allow wrapping for smaller screens
        }}
      >
        {/* TABLE SIDE */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: theme.colors.surface,
            borderRadius: "10px",
            padding: "20px",
            boxShadow: theme.colors.cardShadow,
            transition: "all 0.25s ease",
          }}
        >
          <h2 style={{ marginBottom: "15px", color: theme.colors.primary }}>
            Team Members ({filteredMembers.length})
          </h2>

          {/* Search + Filters */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
                flex: "1",
                minWidth: "220px",
              }}
            />

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            >
              <option value="">All Roles</option>
              {[...new Set(data.map((m) => m.role))].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.surface,
                color: theme.colors.text,
              }}
            >
              <option value="">All Teams</option>
              {[...new Set(data.flatMap((m) => m.teams))].map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedRole("");
                setSelectedTeam("");
              }}
              style={{
                background: "transparent",
                color: "red",
                border: "2px solid red",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
                display:
                  searchTerm || selectedRole || selectedTeam
                    ? "block"
                    : "none",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "red";
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "red";
              }}
            >
              Clear Filters
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              style={{
                background: theme.colors.primary,
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <FaUserPlus size={16} />
              Add Member
            </button>
          </div>

          {/* Table */}
          <div
            className="table-scroll-wrapper"
            style={{
              overflowX: "auto",
              minWidth: 0,
              width: "100%",
            }}
          >
            <table
              width="100%"
              cellPadding="10"
              style={{
                borderCollapse: "collapse",
                tableLayout: "auto",
                color: theme.colors.text,
              }}
            >
              <colgroup>
                <col style={{ width: "auto" }} />
                <col style={{ width: "auto" }} />
                <col style={{ width: "auto" }} />
                <col style={{ width: "auto" }} />
                <col style={{ width: "auto" }} />
                <col style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr style={{ background: theme.colors.tableHeader }}>
                  <th align="left">Name</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Teams</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentMembers.length > 0 ? (
                  currentMembers.map((member) => (
                    <TeamMember
                      key={member.id}
                      member={member}
                      onDelete={deleteMember}
                      onEdit={editMember}
                      onSelect={setSelectedMember}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              style={{
                background: theme.colors.buttonBg,
                color: theme.colors.buttonText,
                borderRadius: "6px",
                border: `1px solid ${theme.colors.buttonBorder}`,
                padding: "6px 10px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  background:
                    currentPage === i + 1
                      ? theme.colors.primary
                      : theme.colors.buttonBg,
                  color:
                    currentPage === i + 1
                      ? "#fff"
                      : theme.colors.buttonText,
                  borderRadius: "6px",
                  border: `1px solid ${theme.colors.buttonBorder}`,
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              style={{
                background: theme.colors.buttonBg,
                color: theme.colors.buttonText,
                borderRadius: "6px",
                border: `1px solid ${theme.colors.buttonBorder}`,
                padding: "6px 10px",
                cursor:
                  currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>

        {/* Detail Panel (right side) */}
        {selectedMember && (
          <div
            style={{
              flex: 1,
              minWidth: 0,
              position: "relative",
              background: theme.colors.surface,
              borderRadius: "10px",
              boxShadow: theme.colors.cardShadow,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.25s ease",
            }}
          >
            <button
              onClick={() => setSelectedMember(null)}
              aria-label="Close details"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: theme.colors.text,
                fontSize: 18,
                padding: 6,
              }}
            >
              <FaTimes />
            </button>
            <div
              style={{
                background: theme.colors.primary,
                color: "white",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <img
                src={selectedMember.avatar}
                alt={selectedMember.name}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid white",
                }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{selectedMember.name}</h3>
                <p style={{ margin: 0 }}>@{selectedMember.username}</p>
                <p style={{ margin: 0 }}>{selectedMember.role}</p>
              </div>
            </div>

            <div style={{ padding: "20px" }}>
              <h4 style={{ paddingBottom: "8px" }}>
                Personal Information
              </h4>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {selectedMember.dob || "29-04-2005"}
              </p>
              <p>
                <strong>Gender:</strong>{" "}
                {selectedMember.gender || "Female"}
              </p>
              <p>
                <strong>Nationality:</strong>{" "}
                {selectedMember.nationality || "Canadian"}
              </p>
              <p>
                <strong>Contact No.:</strong>{" "}
                {selectedMember.contact || "1234567890"}
              </p>
              <p>
                <strong>Email:</strong> {selectedMember.email}
              </p>
              <p>
                <strong>Work Email:</strong>{" "}
                {selectedMember.workEmail || selectedMember.email}
              </p>

              <h4
                style={{
                  paddingBottom: "8px",
                  marginTop: "20px",
                }}
              >
                Research & Publication
              </h4>
              <p>
                <strong>
                  AI and User Experience: The Future of Design
                </strong>
                <br />
                Published in the Journal of Modern Design • 2022
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: theme.colors.secondaryText,
                }}
              >
                AI and IoT-based real-time monitoring of electrical machines
                using Python. Abstract: Maintaining induction motors in good
                working order before they fail...
              </p>
              <a
                href="#"
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                → See Publication
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Edit modal */}
      {editingMember && (
        <EditMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleSaveMember}
        />
      )}

      {/* Add Member modal */}
      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAddModal(false)}
          onSave={(newMember) => {
            setMembers((prev) => [...prev, newMember]);
            setShowAddModal(false);
            toast.success(`${newMember.name} added successfully!`);
          }}
        />
      )}

      {/* Responsive table CSS */}
      <style>
        {`
          /* Tablet adjustments */
          @media (max-width: 900px) {
            table {
              font-size: 14px;
            }
            th, td {
              padding: 8px;
            }
          }

          /* Mobile: transform table to cards */
          @media (max-width: 700px) {
            table thead {
              display: none;
            }
            table, table tbody, table tr, table td {
              display: block;
              width: 100%;
            }
            table tr {
              margin-bottom: 15px;
              border: 1px solid ${theme.colors.border};
              border-radius: 8px;
              padding: 10px;
              background: ${theme.colors.surface};
            }
            table td {
              text-align: left;
              padding-left: 50%;
              position: relative;
            }
            table td::before {
              content: attr(data-label);
              position: absolute;
              left: 10px;
              width: 45%;
              white-space: nowrap;
              font-weight: bold;
            }
          }
        `}
      </style>
    </>
  );
}

export default People;
