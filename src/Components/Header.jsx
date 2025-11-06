import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaRegBell, FaMoon, FaSun } from "react-icons/fa";
import profilePic from "../assets/image/self.jpg";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const theme = useTheme();

  return (
    <Navbar
      fixed="top" // ✅ keeps header fixed
      expand="lg"
      style={{
        backgroundColor: theme.colors.headerBg,
        boxShadow: theme.colors.cardShadow,
        transition: "all 0.3s ease",
        height: "60px",
        zIndex: 1000, // stays above sidebar/content
      }}
    >
      <Container
        fluid
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Theme toggle button */}
        <button
          onClick={theme.toggleTheme}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.colors.primary,
          }}
        >
          {theme.isDarkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
        </button>

        {/* Bell icon */}
        <FaRegBell
          size={22}
          color={theme.colors.primary}
          style={{ cursor: "pointer" }}
        />

        {/* Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img
            src={profilePic}
            alt="User"
            style={{
              width: "35px",
              height: "39px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span style={{ fontWeight: "500", color: theme.colors.text }}>
            Sarthak Bombale
          </span>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
