"use client";

import { useEffect, useState } from "react";
import JohnDoeAP from "../components/LearnerAppPage/JohnDoeAP"; // Profile UI
import Navbar from "../components/LearnerPage/Navbar";
import Dashboard from "../components/LearnerAppPage/Dashboard";
import FooterAP from "../components/LearnerAppPage/FooterAP";

// Define a proper interface for the user object
interface User {
  id: string;
  username: string;
  email: string;
  // Add any other properties your user object has
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        console.log("✅ Profile Data:", data);

        if (response.ok) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="w-full bg-white">
      <Navbar />
        <div className="pt-20"> 
        <Dashboard />
      {user ? <JohnDoeAP user={user} /> : <p className="text-center text-gray-600">User not found</p>}
      </div>
        <FooterAP />
    </div>
  );
}