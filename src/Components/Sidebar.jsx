import React from "react";
import { Link } from "react-router-dom";
import { RxGrid } from "react-icons/rx";
import { useTheme } from "../context/ThemeContext";
import { Navbar } from "react-bootstrap";

function Sidebar() {
  const theme = useTheme();

  return (
    <div
      style={{
        position: "fixed",
        top: 0, // start from top
        left: 0,
        width: "220px",
        height: "100vh", // full viewport height
        backgroundColor: theme.colors.sidebarBg,
        padding: "20px",
        borderRight: `1px solid ${theme.colors.border}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        overflowY: "auto",
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          fontSize:'20px'
      }}
    >
      {/* Sidebar Top Section */}
      <div>
        <Navbar.Brand
          href="#home"
          style={{ marginBottom: "25px", display: "block" }}
        >
          <h2
            style={{
              color: "#6f42c1",
              fontWeight: "bold",
              margin: 0,
              lineHeight: 1,
              fontSize: "35px",
            }}
          >
            PEOPLE.CO
          </h2>
        </Navbar.Brand>

        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "15px" }}>
            <Link
              to="/overview"
              style={{
                textDecoration: "none",
                color: theme.colors.text,
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
              }}
            >
              <RxGrid style={{ marginRight: "8px" }} /> Overview
            </Link>
          </li>

          <li>
            <Link
              to="/overview/people"
              style={{
                textDecoration: "none",
                color: theme.colors.text,
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
              }}
            >
              <RxGrid style={{ marginRight: "8px" }} /> People Directory
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
