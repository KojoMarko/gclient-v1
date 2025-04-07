import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/mongodb";
import User from "../../../../../../lib/models/User";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const user = await User.findById(params.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        location: user.location || null,
        gender: user.gender || null,
        phone: user.phone || null,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
