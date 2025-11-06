// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Overview from "./Components/Overview";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div
          style={{
            minHeight: "100vh",
            transition: "background-color 0.3s ease",
            overflow: "hidden", // ✅ prevent unwanted outer scroll
          }}
        >
          <Sidebar />
          <Header />
          <Routes>
            <Route path="/*" element={<Overview />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
