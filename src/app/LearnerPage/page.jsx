"use client"; 

import Navbar from "../components/LearnerPage/Navbar";
import ApplicationProfile from "../components/LearnerAppPage/ApplicationProfile"; 
import OopsAP from "../components/LearnerAppPage/OopsAP"; 
import Dashboard from "../components/LearnerAppPage/Dashboard"; 
import FooterAP from "../components/LearnerAppPage/FooterAP"; 
import { useState, useEffect } from "react";

export default function Page() {
    const [hasApplication, setHasApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("🔄 Fetching user profile..."); 

        const fetchUserProfile = async () => {
            try {
                const response = await fetch("/api/user/profile", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });

                const data = await response.json();
                console.log("✅ Fetched user profile:", data); 

                if (response.ok && data.user) {
                    console.log("📌 User program status:", data.user.program); 

                    // ✅ Fix: Explicitly check if program is valid
                    const isRegistered = data.user.program && data.user.program !== "N/A";
                    setHasApplication(isRegistered);
                } else {
                    setHasApplication(false);
                }
                
            } catch (error) {
                console.error("❌ Error fetching user profile:", error);
                setHasApplication(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="pt-20 h-[100vh]"> 
                <Dashboard />
                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : hasApplication ? (
                    <ApplicationProfile />
                ) : (
                    <OopsAP /> // ✅ Redirects to Oops page if the user is not registered
                )}
            </div>
            <FooterAP />
        </div>
    );
}
