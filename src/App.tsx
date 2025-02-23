import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { Bike, User, LogOut, Settings } from "lucide-react";
import { handleLogin } from "./utils/auth";
import Login from "./components/Login";
import Home from "./components/Home";
import Landing from "./components/Landing";
import EarnWithUs from "./components/EarnWithUs";
import LearnMore from "./components/LearnMore";
import ContactUs from "./components/ContactUs";
import StaffDashboard from "./components/StaffDashboard";
import FAQ from "./components/FAQ";
import SignUp from "./components/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // ✅ Check login state on mount
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const staffToken = localStorage.getItem("staff-token");

    setIsLoggedIn(!!userToken);
    setIsStaffLoggedIn(!!staffToken);
  }, []);

  // ✅ Handle User Login
  const handleUserLogin = async (email: string, password: string) => {
    const userData = await handleLogin(email, password);
    if (userData) {
      localStorage.setItem("token", userData.token);
      setIsLoggedIn(true);
      window.location.href = "/home"; // Redirect after login
    } else {
      alert("Invalid email or password");
    }
  };

  // ✅ Handle Staff Login
  const handleStaffLogin = async (email: string, password: string) => {
    localStorage.setItem("staff-token", "staff-dummy-token");
    setIsStaffLoggedIn(true);
    window.location.href = "/staff-dashboard";
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("staff-token");
    setIsLoggedIn(false);
    setIsStaffLoggedIn(false);
    setShowSettings(false);
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* 🔹 Navbar */}
        <nav className="bg-black text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            {/* 🔹 Left Section: Logo & Links */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Bike className="w-8 h-8" />
                <span className="text-xl font-bold">Fatboy's Rental</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/rentals" className="hover:text-gray-300 transition-colors">Motorbike Rentals</Link>
                <Link to="/earn" className="hover:text-gray-300 transition-colors">Earn with us</Link>
                <Link to="/learn" className="hover:text-gray-300 transition-colors">Learn More</Link>
                <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact Us</Link>
                <Link to="/faq" className="hover:text-gray-300 transition-colors">FAQ</Link>
              </div>
            </div>

            {/* 🔹 Right Section: Auth Links / User Menu */}
            <div className="flex items-center space-x-4">
              {isLoggedIn || isStaffLoggedIn ? (
                <div className="relative">
                  <button onClick={() => setShowSettings(!showSettings)} className="flex items-center space-x-2 hover:text-gray-300 transition-colors">
                    <User className="w-5 h-5" />
                    <span>My Account</span>
                  </button>
                  {/* 🔹 Account Dropdown */}
                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-gray-600">john@example.com</p>
                      </div>
                      <Link to="/settings" className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Account Settings
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="hover:text-gray-300 transition-colors">LOGIN</Link>
                  <Link to="/signup" className="hover:text-gray-300 transition-colors">SIGN UP</Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* 🔹 Routes */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login onLogin={handleUserLogin} onStaffLogin={handleStaffLogin} />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/rentals" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/earn" element={isLoggedIn ? <EarnWithUs /> : <Navigate to="/login" />} />
          <Route path="/learn" element={<LearnMore />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/staff-dashboard" element={isStaffLoggedIn ? <StaffDashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
