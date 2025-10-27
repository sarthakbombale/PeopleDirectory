import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaRegBell, FaMoon, FaSun } from "react-icons/fa";
import profilePic from "../assets/image/self.jpg";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const theme = useTheme();
  
  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: theme.colors.headerBg,
        boxShadow: theme.colors.cardShadow,
        padding: "10px 30px",
        transition: "all 0.3s ease",
      }}
    >
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Left Side - Logo */}
        <Navbar.Brand href="#home" style={{ margin: 0 }}>
          <h2
            style={{
              color: "#6f42c1",
              fontWeight: "bold",
              margin: 0,
              lineHeight: 1,
            }}
          >
            PEOPLE.CO
          </h2>
        </Navbar.Brand>

        {/* Right Side - Bell & Profile */}
        <div className="d-flex align-items-center gap-4">
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
              color: theme.colors.primary
            }}
          >
            {theme.isDarkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
          </button>

          <FaRegBell size={22} color={theme.colors.primary} style={{ cursor: "pointer" }} />

          <div className="d-flex align-items-center gap-2">
            <img
              src={profilePic}
              alt="Jane Doe"
              style={{
                width: "35px",
                height: "39px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span style={{ fontWeight: "500", color: theme.colors.text }}>Sarthak Bombale</span>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
