"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lato, Inter } from "next/font/google";
import NavbarAP from "./NavbarAP";

const lato = Lato({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-lato",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

const programTools = {
  "Data Science": [
    { name: "Python", borderColor: "border-blue-500" },
    { name: "PowerBI", borderColor: "border-gray-500" },
    { name: "Excel", borderColor: "border-green-500" },
    { name: "Tableau", borderColor: "border-red-500" },
  ],
  "Software Development": [
    { name: "JavaScript", borderColor: "border-yellow-500" },
    { name: "React", borderColor: "border-blue-500" },
    { name: "TypeScript", borderColor: "border-indigo-500" },
    { name: "Node.js", borderColor: "border-green-500" },
  ],
  "Cloud Computing": [
    { name: "AWS", borderColor: "border-orange-500" },
    { name: "Azure", borderColor: "border-blue-700" },
    { name: "Google Cloud", borderColor: "border-red-500" },
    { name: "Kubernetes", borderColor: "border-purple-500" },
  ],
};

const ApplicationProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  const tools = programTools[user?.program] || [];

  return (
    <div className={`relative top-[-80px] h-auto flex flex-col justify-center overflow-x-hidden mx-[210px] bg-white ${lato.variable} ${inter.variable}`}>
      <div className="flex text-left">
        <NavbarAP />
      </div>

      <div className="flex flex-col gap-6 mt-10">
        <div className="flex flex-col gap-0">
          <div className="flex items-start text-left px-4 py-3">
            <div className="mr-6">
              <p className="text-sm text-gray-700 mb-1">Program</p>
              <p className="font-semibold text-black">{user?.program || "N/A"}</p>
            </div>
            <div className="h-10 border-r border-gray-300 mr-6"></div>
            <div className="mr-6">
              <p className="text-sm text-gray-700 mb-1">Date registered</p>
              <p className="font-semibold text-black">{user?.registeredAt ? new Date(user.registeredAt).toDateString() : "N/A"}</p>
            </div>
            <div className="h-10 border-r border-gray-300 mr-6"></div>
            <div className="mr-6">
              <p className="text-sm text-gray-700 mb-1">Status</p>
              <p className="font-semibold text-black">{user?.status || "Not Registered"}</p>
            </div>
            <div className="h-10 border-r border-gray-300 mr-6"></div>
            <div>
              <p className="text-sm text-gray-700 mb-1">Paid</p>
              <p className="font-semibold text-black">${user?.amountPaid || 0}</p>
            </div>
          </div>
          <hr className="border-t border-gray-300 my-4" />
        </div>

        <div className="flex justify-start space-x-5 mb-[32px]">
          {tools.length > 0 ? (
            tools.map((tool, index) => (
              <button key={index} className={`px-4 py-2 rounded-md font-medium border text-gray-800 hover:bg-gray-300 ${tool.borderColor}`}>
                {tool.name}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No tools available for this program.</p>
          )}
        </div>

        <div className="flex justify-start space-x-5">
          <Link href="/" passHref>
            <button className="px-5 py-2 text-black rounded bg-[#e0e0e0]">
              Home
            </button>
          </Link>

          <Link href="/RegisterAP" passHref>
            <button className="px-5 py-2 text-white rounded bg-[#0056b3]">
              Start new application
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProfile;
