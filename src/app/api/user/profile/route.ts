import { NextRequest, NextResponse } from "next/server";  
import { verifyToken } from "../../../../../middleware/auth";
import { connectDB } from "../../../../../lib/mongodb";
import User from "../../../../../lib/models/User"; 

export async function GET(req: NextRequest) {
    await connectDB();
  
    const decodedUser = verifyToken(req);
    console.log("🔍 Decoded User from Token:", decodedUser); // ✅ Debugging
  
    if (!decodedUser || !decodedUser._id) {
        console.warn("⚠️ Unauthorized access attempt.");
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  
    try {
        const user = await User.findById(decodedUser._id).select("-password");
        console.log("✅ Found User in DB:", user); // ✅ Debugging
  
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // ✅ Ensure data is returned correctly
        return NextResponse.json({
            message: "Profile fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                program: user.program || "N/A", // ✅ Ensure program exists
                registeredAt: user.registeredAt,
                status: user.program ? "Registered" : "Not Registered",
                amountPaid: user.amountPaid,
                location: user.location || "N/A",  // ✅ Retrieve location
                gender: user.gender || "N/A",      // ✅ Retrieve gender
                phone: user.phone || "N/A",        // ✅ Retrieve phone
            },
        });
    } catch (error) {
        console.error("❌ Error fetching user profile:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
