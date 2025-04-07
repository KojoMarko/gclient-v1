import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/mongodb";
import User from "../../../../../../lib/models/User";
import { sendVerificationEmail } from "../../../../../../lib/sendEmail";

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (user.verified) {
    return NextResponse.json({ message: "User already verified" }, { status: 400 });
  }

  // Generate a new OTP
  const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = newOTP;
  user.verificationCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes
  await user.save();

  // Send the new OTP via email
  await sendVerificationEmail(email, newOTP);

  return NextResponse.json({ message: "New OTP sent to your email." }, { status: 200 });
}
