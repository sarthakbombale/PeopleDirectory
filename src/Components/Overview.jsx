// Overview.jsx
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import People from "./People";
import { FaFileAlt, FaUsers } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
//"#7b4bff"

function Overview() {
  const theme = useTheme();
  
  return (
    <div style={{ 
      display: "flex", 
      height: "calc(100vh - 80px)", 
      backgroundColor: theme.colors.background,
      transition: "all 0.3s ease"
    }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          backgroundColor: theme.colors.sidebarBg,
          padding: "20px",
          borderRight: `1px solid ${theme.colors.border}`,
          transition: "all 0.3s ease"
        }}
      >

        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ marginBottom: "15px" }}>
            <Link 
              to="/overview"
              style={{
                textDecoration: "none",
                color: theme.colors.text,
                fontWeight: "600",
              }}
            >
              <FaFileAlt style={{ marginRight: "8px" }} /> Overview
            </Link>
          </li>

          <li style={{ marginBottom: "15px" }}>
            <Link
              to="/overview/people"
              style={{
                textDecoration: "none",
                color: theme.colors.text,
                fontWeight: "500",
              }}
            >
              <FaUsers style={{ marginRight: "8px" }} /> People Directory
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          backgroundColor: theme.colors.surface,
          borderRadius: "10px",
          margin: "20px",
          padding: "30px",
          boxShadow: theme.colors.cardShadow,
          overflowY: "auto",
        }}
      >
        <Routes>
          {/* Default Welcome Page */}
          <Route
            path="/overview"
            element={<h2 style={{ fontWeight: "bold", color: theme.colors.text }}>Welcome, Sarthak Bombale !</h2>}
          />

          {/* People Directory Page */}
          <Route path="/overview/people" element={<People />} />
        </Routes>
      </div>
    </div>
  );
}

export default Overview;
