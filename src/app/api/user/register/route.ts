import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import User from "../../../../../lib/models/User";
import multer from 'multer';

// Removed unused 'storage' variable
// Removed unused 'upload' variable

// Define TypeScript interfaces
// Removed FormDataObject as it's not being used

interface UserUpdateData {
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  location?: string;
  program?: string;
  gender?: string;
  disabled?: string;
  phone?: string;
  amountPaid?: string | number;
  description?: string;
  image?: { 
    data: Buffer | null; 
    contentType: string | null 
  }; // Store the image as binary data and content type
  registeredAt: Date;
}

// Define error type for better error handling
interface ServerError extends Error {
  message: string;
  code?: string | number;
}

export async function POST(request: NextRequest) {
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

    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const location = formData.get('location') as string;
    // Changed variable name from "module" to avoid conflict with Node.js module
    const userModule = formData.get('module') as string;
    const gender = formData.get('gender') as string;
    const disabled = formData.get('disabled') as string;
    const phone = formData.get('phone') as string;
    const amount = formData.get('amount') as string;
    const description = formData.get('description') as string;

    const currentDate = new Date();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log(`🔄 Updating existing user: ${email}`);

      const updateData: UserUpdateData = {
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
      console.log(`🆕 Creating new user: ${email}`);

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
    const serverError = error as ServerError;
    console.error("❌ Server error:", serverError);
    return NextResponse.json({
      message: "Server error",
      details: serverError.message
    }, { status: 500 });
  }
}