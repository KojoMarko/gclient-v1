import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/mongodb";
import User from "../../../../../../lib/models/User";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop() || ""; // Extract the dynamic 'id' from the request URL

    if (!id) {
      return new NextResponse(null, { status: 400 });
    }

    // Validate the 'id' before using it
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse(null, { status: 400, statusText: "Invalid ID format" });
    }

    await connectDB();
    const user = await User.findById(id);

    if (!user || !user.image) {
      return new NextResponse(null, { status: 404 });
    }

    // Return the image with the correct content type
    return new NextResponse(user.image.data, {
      headers: {
        "Content-Type": user.image.contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching user image:", error);
    return new NextResponse(null, { status: 500 });
  }
}
