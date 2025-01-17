import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./LoginPage"; // Import LoginPage
import ChatBot from "./components/ChatBot";
import FAQPage from "./pages/FAQPage";
import IssuePage from "./pages/IssuePage";
import DashBoard from "./pages/DashBoard";
import EmailForm from "./pages/Noti";
import HomePage from "./pages/HomePage";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (userInfo) => {
    setUser(userInfo);
    navigate("/home"); // Redirect to the home page after login
  };

  const handleLogout = () => {
    setUser(null); // Clear user data
    navigate("/login"); // Redirect to the login page
  };

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login page if not logged in
    }
  }, [user, navigate]);

  return (
    <div>
      {user && <NavBar onLogout={handleLogout} />} {/* Pass logout function */}
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/home"
          element={
            user ? <HomePage user={user} /> : null
          }
        />

        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/issue" element={<IssuePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/noti" element={<EmailForm />} />
      </Routes>
    </div>
  );
}

export default App;

