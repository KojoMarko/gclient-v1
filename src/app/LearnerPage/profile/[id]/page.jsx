"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Lato, Inter } from "next/font/google";
import NavbarAP from "../../../components/LearnerAppPage/NavbarAP";

const lato = Lato({ subsets: ["latin"], weight: ["700"], variable: "--font-lato" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-inter" });

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/user/profile/${id}`);
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

    if (id) fetchUserProfile();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!user) return <p className="text-center text-red-500">User not found.</p>;

  return (
    <div className={`relative top-[-80px] h-auto flex flex-col justify-center overflow-x-hidden mx-[210px] bg-white ${lato.variable} ${inter.variable}`}>
      <div className="flex text-left">
        <NavbarAP />
      </div>

      {/* Profile Section */}
      <div className={`flex my-[62px] gap-6 ${inter.variable}`}>
        <div className="flex items-center gap-6">
          <div className="w-[60px] h-[60px] rounded-full bg-hero-bg text-white text-2xl font-bold flex items-center justify-center mr-2.5">
            {user.username?.split(" ").map((n) => n[0]).join("").toUpperCase()}
          </div>
          <div className="m-0">
            <p className="text-black"><strong>{user.username}</strong></p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="h-10 border-r border-gray-300 mr-6"></div>
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">Location</p>
          <p className="text-gray-500">{user.location || "N/A"}</p>
        </div>
        <div className="h-10 border-r border-gray-300 mr-6"></div>
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">Gender</p>
          <p className="text-gray-500">{user.gender || "N/A"}</p>
        </div>
        <div className="h-10 border-r border-gray-300 mr-6"></div>
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">Phone</p>
          <p className="text-gray-500">{user.phone || "N/A"}</p>
        </div>
      </div>

      {/* Password Update */}
      <div className="flex gap-4 mt-[72px] rounded-lg">
        <input type="password" placeholder="Old Password" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        <input type="password" placeholder="New Password" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        <button className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md">Update</button>
      </div>

      {/* Actions Section */}
      <div className="flex justify-start space-x-5 mt-[72px]">
        <button className="px-5 py-2 text-black rounded bg-[#e0e0e0]">Back</button>
        <Link href={`/profile/edit/${id}`}>
          <button className="px-5 py-2 text-white rounded bg-[#0056b3]">Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;