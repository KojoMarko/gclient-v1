import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import User from "../../../../../lib/models/User";

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const imageFile = formData.get('image');
    let imageData = null;
    let contentType = null;

    if (imageFile && typeof imageFile !== 'string' && 'size' in imageFile && imageFile.size > 0) {
      imageData = Buffer.from(await imageFile.arrayBuffer());
      contentType = imageFile.type;
    }

    const email = formData.get('email');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const location = formData.get('location');
    const userModule = formData.get('module');
    const gender = formData.get('gender');
    const disabled = formData.get('disabled');
    const phone = formData.get('phone');
    const amount = formData.get('amount');
    const description = formData.get('description');

    const currentDate = new Date();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const updateData = {
        username: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        location,
        program: userModule,
        gender,
        disabled,
        phone,
        amountPaid: amount,
        description,
        image: { data: imageData, contentType },
        registeredAt: currentDate
      };

      const updatedUser = await User.findOneAndUpdate(
        { email },
        updateData,
        { new: true, runValidators: true }
      );

      return NextResponse.json({
        message: "User updated successfully",
        user: updatedUser
      });
    } else {
      const newUser = new User({
        username: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        verified: true,
        location,
        program: userModule,
        gender,
        disabled,
        phone,
        amountPaid: amount,
        description,
        image: { data: imageData, contentType },
        registeredAt: currentDate
      });

      await newUser.save();

      return NextResponse.json({
        message: "User registered successfully",
        user: newUser
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({
      message: "Server error",
      details: error.message
    }, { status: 500 });
  }
}