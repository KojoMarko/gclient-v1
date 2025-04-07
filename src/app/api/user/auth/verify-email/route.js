import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/mongodb";
import User from "../../../../../../lib/models/User";

export async function POST(req) {
  await connectDB();
  const { email, code } = await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (user.verified) {
    return NextResponse.json({ message: "User already verified" }, { status: 400 });
  }

  if (user.verificationCode !== code || user.verificationCodeExpires < new Date()) {
    return NextResponse.json({ message: "Invalid or expired verification code" }, { status: 400 });
  }

  user.verified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpires = undefined;
  await user.save();

  return NextResponse.json({ message: "Email verified successfully! You can now log in." }, { status: 200 });
}
