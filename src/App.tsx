import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { Bike, User, LogOut } from "lucide-react";
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
import StaffLogin from "./components/StaffLogin"; // ✅ Import StaffLogin


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    // Check session status
    fetch('http://localhost:5004/auth/check-session', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if (data.isStaff) {
        setIsStaffLoggedIn(true);
        setUserEmail(data.email);
      } else if (data.isLoggedIn) {
        setIsLoggedIn(true);
        setUserEmail(data.email);
      }
    })
    .catch(err => {
      console.error('Session check failed:', err);
    });
  }, []);

  const handleStaffLogin = async (email: string, password: string) => {
    try {
        const response = await fetch('http://localhost:5004/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email, 
                password,
                isStaff: true  // Add staff flag
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            setIsStaffLoggedIn(true);
            setUserEmail(data.email);
            return data; // Return the data instead of redirecting
        } else {
            throw new Error('Staff login failed');
        }
    } catch (error) {
        console.error('Staff login error:', error);
        throw error;
    }
};

  // Update the header navigation based on login status
  const renderNavigation = () => {
    if (isLoggedIn) {
      return (
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{userEmail}</span>
          <button onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={20} /> Logout
          </button>
        </div>
      );
    } else {
      return (
        <>
          <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
          <Link to="/signup" className="text-gray-700 hover:text-gray-900">Sign Up</Link>
        </>
      );
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5004/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setIsLoggedIn(false);
      setIsStaffLoggedIn(false);
      setShowSettings(false);
      setUserEmail("");
      window.location.href = "/";
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Update the route protection
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-black text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            {/* Left side navigation stays the same */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Bike className="w-8 h-8" />
                <span className="text-xl font-bold">Fatboy's Rental</span>
              </Link>
              <Link to="/faq" className="hover:text-gray-300 transition-colors">FAQs</Link>
              <Link to="/earn" className="hover:text-gray-300 transition-colors">Earn With Us</Link>
              <Link to="/learn" className="hover:text-gray-300 transition-colors">Learn More</Link>
              <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact Us</Link>
            </div>

            {/* Updated account section */}
            <div className="flex items-center space-x-4">
              {(isLoggedIn || isStaffLoggedIn) ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowSettings(!showSettings)} 
                    className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Account</span>
                  </button>
                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">{userEmail}</span>
                      </div>
                      <button 
                        onClick={handleLogout} 
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-red-600"
                      >
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

        {/* Update the routes */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
          <Route path="/staff-login" element={isStaffLoggedIn ? <Navigate to="/staff-dashboard" /> : <StaffLogin onStaffLogin={handleStaffLogin} />} />
          <Route 
            path="/staff-dashboard" 
            element={
              isStaffLoggedIn ? (
                <StaffDashboard />
              ) : (
                <Navigate to="/staff-login" replace />
              )
            } 
          />
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/earn" element={<EarnWithUs />} />
          <Route path="/learn" element={<LearnMore />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
