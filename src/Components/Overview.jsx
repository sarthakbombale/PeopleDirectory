// Overview.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import People from "./People";
import { useTheme } from "../context/ThemeContext";

function Overview() {
  const theme = useTheme();

  return (
    <div
      style={{
        marginLeft: "220px", // sidebar width
        marginTop: "60px", // header height
        height: "calc(100vh - 60px)",
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
        overflowY: "auto",
        transition: "background-color 0.3s ease",
      }}
    >
      <Routes>
        <Route
          path="/overview"
          element={
            <h2
              style={{
                fontWeight: "bold",
                color: theme.colors.text,
                marginTop: "10px",
              }}
            >
              Welcome, Sarthak Bombale!
            </h2>
          }
        />
        <Route path="/overview/people" element={<People />} />
      </Routes>
    </div>
  );
}

export default Overview;


