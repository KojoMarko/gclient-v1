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

const JohnDoeAP = ({ user }) => {
  return (
    <div className={`relative top-[-80px] h-auto flex flex-col justify-center overflow-x-hidden mx-[210px] bg-white ${lato.variable} ${inter.variable}`}>
      <NavbarAP />
      <div className="flex my-[62px] gap-6">
        <div className="flex items-center gap-6">
          <div className="w-[60px] h-[60px] rounded-full bg-hero-bg text-white text-2xl font-bold flex items-center justify-center">
            {user?.username
              ? user.username
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase())
                  .slice(0, 2)
                  .join("")
              : "U"} 
          </div>
          <div>
            <p className="text-black font-bold">{user?.username || "Unknown User"}</p>
            <p className="text-gray-500">{user?.email || "N/A"}</p>
          </div>
        </div>
        <div className="h-10 border-r border-gray-300 mr-6"></div>
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">Location</p>
          <p className="text-gray-500">{user?.location}</p>
        </div>
        <div className="h-10 border-r border-gray-300 mr-6"></div>
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">Gender</p>
          <p className="text-gray-500">{user?.gender || "N/A"}</p>
        </div>
        <div className="h-10 border-r border-gray-300 mr-6"></div>
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">Phone</p>
          <p className="text-gray-500">{user?.phone || "N/A"}</p>
        </div>
      </div>

      {/* Password Update */}
      <div className="flex gap-4 mt-[72px] rounded-lg">
        <input
          type="password"
          placeholder="Old Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full px-4 py-2 bg-hero-bg text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Update
        </button>
      </div>

      {/* Actions Section */}
      <div className="flex justify-start space-x-5 mt-[72px]">
        <button className="px-5 py-2 text-black rounded bg-[#e0e0e0]">Back</button>
        <button className="px-5 py-2 text-white rounded bg-hero-bg hover:bg-blue-600">Edit</button>
      </div>
    </div>
  );
};

export default JohnDoeAP;
