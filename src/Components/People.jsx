import React, { useState, useEffect } from "react";
import TeamMember from "./TeamMember";
import { members as data } from "../data";
import { FaTimes, FaUserPlus } from "react-icons/fa";
import EditMemberModal from "./EditMemberModal";
import AddMemberModal from "./AddMemberModal";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";
import { LuFilter } from "react-icons/lu";
import FilterMenu from "./FilterMenu";

const getStoredMembers = () => {
  try {
    const storedMembers = localStorage.getItem("members");
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
  const [editingMember, setEditingMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const membersPerPage = 10;

  const filteredMembers = members.filter((m) =>
    [m.name, m.username].some((v) =>
      v.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLast = currentPage * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const deleteMember = (id) => {
    const member = members.find((m) => m.id === id);
    if (!member) return;

    const toastId = toast(
      ({ closeToast }) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            Are you sure you want to delete <strong>{member.name}</strong>?
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              onClick={() => toast.dismiss(toastId)}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: `1px solid ${theme.colors.buttonBorder}`,
                background: theme.colors.buttonBg,
              }}
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
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: "none",
                background: "#d9534f",
                color: "#fff",
              }}
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
          fontFamily: "Arial, sans-serif",
          background: theme.colors.background,
          color: theme.colors.text,
          minHeight: "100vh",
          transition: "all 0.25s ease",
          flexWrap: "wrap",
        }}
      >
        {/* TABLE SIDE */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: theme.colors.surface,
            padding: "20px",
            boxShadow: theme.colors.cardShadow,
            transition: "all 0.25s ease",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            {/* Left side - Title */}
            <h2
              style={{
                color: theme.colors.primary,
                margin: 0,
                fontSize: "22px",
                fontWeight: "600",
              }}
            >
              Team Members ({filteredMembers.length})
            </h2>

            {/* Right side - Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: "8px 10px",
                  borderRadius: "6px",
                  border: `1px solid ${theme.colors.border}`,
                  background: theme.colors.surface,
                  color: theme.colors.text,
                  width: "400px",
                  outline: "none",
                }}
              />

              <FilterMenu onFilterChange={(filter) => console.log("Selected:", filter)} />


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
                  fontWeight: "500",
                }}
              >
                <FaUserPlus size={16} />
                Add Member
              </button>
            </div>
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
                    <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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

        {/* DETAILS PANEL */}
        {selectedMember && (
          <div
            style={{
              flex: 1,
              minWidth: 0,
              position: "relative",
              background: theme.colors.surface,
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
              <h4>Personal Information</h4>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {selectedMember.dob || "29-04-2005"}
              </p>
              <p>
                <strong>Gender:</strong> {selectedMember.gender || "Female"}
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
            </div>
          </div>
        )}
      </div>

      {editingMember && (
        <EditMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleSaveMember}
        />
      )}

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
    </>
  );
}

export default People;

