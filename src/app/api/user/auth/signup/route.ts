// src/app/api/user/auth/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../../../lib/mongodb";
import User from "../../../../../../lib/models/User";
import { sendVerificationEmail } from "../../../../../../lib/sendEmail";

export async function POST(req: Request) {
  try {
    // Log request received
    console.log("Signup request received");
    
    // Connect to the database - add error handling
    try {
      await connectDB();
      console.log("MongoDB connected successfully");
    } catch (dbError) {
      console.error("MongoDB connection failed:", dbError);
      return NextResponse.json(
        { message: "Database connection failed", error: String(dbError) }, 
        { status: 500 }
      );
    }
    
    // Parse request body with error handling
    let body;
    try {
      body = await req.json();
      console.log("Request body parsed:", body);
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { message: "Invalid request format" }, 
        { status: 400 }
      );
    }
    
    const { username, email, password } = body;
    
    // Validate required fields
    if (!email || !password) {
      console.log("Missing required fields");
      return NextResponse.json(
        { message: "Email and password are required" }, 
        { status: 400 }
      );
    }
    
    // Check if user already exists
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("User already exists");
        return NextResponse.json(
          { message: "User already exists" }, 
          { status: 400 }
        );
      }
    } catch (findError) {
      console.error("Error checking existing user:", findError);
      return NextResponse.json(
        { message: "Error checking user", error: String(findError) }, 
        { status: 500 }
      );
    }
    
    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password hashed successfully");
    } catch (hashError) {
      console.error("Password hashing failed:", hashError);
      return NextResponse.json(
        { message: "Error processing password", error: String(hashError) }, 
        { status: 500 }
      );
    }
    
    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Create user with all required fields
    const userObj = {
      username: username || email.split('@')[0],
      email,
      password: hashedPassword,
      firstName: "", // Default value
      lastName: "",  // Default value
      verified: false,
      verificationCode,
      verificationCodeExpires: new Date(Date.now() + 5 * 60 * 1000)
    };
    
    console.log("Attempting to create user with:", {
      ...userObj,
      password: "[HIDDEN]" // Don't log the password
    });
    
    // Create and save the user
    let newUser;
    try {
      newUser = new User(userObj);
      await newUser.save();
      console.log("User saved to database successfully");
    } catch (saveError) {
      console.error("Failed to save user:", saveError);
      return NextResponse.json(
        { 
          message: "Failed to create user", 
          error: saveError instanceof Error ? saveError.message : String(saveError)
        }, 
        { status: 500 }
      );
    }
    
    // Send verification email with error handling
    try {
      await sendVerificationEmail(email, verificationCode);
      console.log("Verification email sent successfully");
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Continue execution, don't fail the whole request
    }
    
    // Return success response
    return NextResponse.json(
      { message: "User registered. Check your email for the verification code." }, 
      { status: 201 }
    );
    
  } catch (error) {
    // Log the full error details
    console.error("Signup error details:", error);
    
    // Return detailed error response
    return NextResponse.json(
      { 
        message: "Registration failed", 
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}