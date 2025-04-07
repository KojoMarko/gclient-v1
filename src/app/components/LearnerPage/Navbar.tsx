// Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import LoginClient from "../LearnerRegFlow/LoginClient";
import SignupClient from "../LearnerRegFlow/SignupClient";
import ResetPassword from "../LearnerRegFlow/ResetPassword";
import Link from "next/link";
import Image from "next/image";
import { LogIn, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowResetPassword(false);
  };

  const handleForgotPassword = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowResetPassword(true);
  };
  

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowResetPassword(false);
    setShowSignup(true);
  };
  
  

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowResetPassword(false);
    setShowLogin(true);
  };
  

  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <nav className=" flex fixed justify-between items-center px-xl py-4 bg-white font-sans mx-auto top-0 left-0 w-full z-50 rounded box-border shadow-md">
      <div className="flex items-center gap-6 space-y-2 m-2">
        <Link href="/" className="link">
          <Image className="max-h-8" src="/Azubi-Logo.svg" alt="logo" width={100} height={100} />
        </Link>
        <Link href="/" className="link m-0 block pb-2 text-black text-[16px] font-inter">Home</Link>
        <button
  onClick={() => {
    document.getElementById("our-solutions")?.scrollIntoView({ behavior: "smooth" });
  }}
  className="m-0 block pb-2 text-black text-[16px] font-inter cursor-pointer"
>
  Courses
</button>
      </div>

      <div className="relative">
        {user ? (
          // Logged-in UI (Profile Dropdown)
          <div className="relative flex items-center  cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="w-10 h-10 rounded-full bg-hero-bg flex items-center justify-center mr-[16px] text-white text-lg font-semibold">
            {user?.name
              ? user.name
                  .split(" ") // Split by space into words
                  .map((word) => word.charAt(0).toUpperCase()) // Get first letter of each word
                  .slice(0, 2) // Take only first two words (if available)
                  .join("") // Combine letters
              : "U"} 
              
            </div>
            <span className="text-black font-medium">{user.name}</span>
            <ChevronDown className="text-black ml-[48px]" />
            
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-[60px] right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-md z-20">
                <nav className="w-full text-left px-4 py-2 hover:bg-white text-black">
                  <Link href="/LearnerPage" className="block py-2 text-black text-[16px] font-inter hover:text-hero-bg transition-colors duration-200">Portal</Link>
                  <Link 
                    href="/" 
                    onClick={handleLogout} 
                    className="block py-2 text-black text-[16px] font-inter hover:text-hero-bg transition-colors duration-200"
                  >
                    Logout
                  </Link>
                </nav>
              </div>

            )}
          </div>
        ) : (
          // Login Button
          <button
            className="link bg-transparent text-blue-700 py-3 px-6 border border-blue-700 rounded-md flex items-center gap-3 text-base font-medium transition-colors duration-300 ease-in-out hover:bg-hero-bg hover:text-white font-inter"
            onClick={() => setShowLogin(true)}
          >
            <span className="font-inter">Login</span>
            <LogIn />
          </button>
        )}

        {/* LOGIN / SIGNUP / RESET PASSWORD MODALS */}
        {showLogin || showSignup || showResetPassword ? (
          <div className="absolute top-[70px] right-[0px] z-10">
            {showLogin && (
              <LoginClient
                onClose={handleCloseModals}
                onForgotPassword={handleForgotPassword}
                onSignup={handleSwitchToSignup}
                onLoginSuccess={handleLoginSuccess}
              />
            )}
            {showSignup && (
              <SignupClient
                onClose={handleCloseModals}
                onLogin={handleSwitchToLogin}
              />
            )}
            {showResetPassword && (
  <ResetPassword onClose={handleCloseModals} onSignup={handleSwitchToSignup} />
)}


          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
