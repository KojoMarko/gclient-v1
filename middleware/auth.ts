import { NextRequest } from "next/server"; 
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

export function verifyToken(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    console.log("🔍 Received Authorization Header:", authHeader); // ✅ Debugging
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.warn("⚠️ Missing or Malformed Authorization Header");
        return null;
    }
  
    const token = authHeader.split(" ")[1];
    console.log("🔍 Extracted Token:", token); // ✅ Debugging
  
    if (!token) {
        console.warn("⚠️ Missing Bearer Token");
        return null;
    }
  
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        console.log("✅ Decoded Token:", decoded);  // ✅ Debugging
  
        if (!decoded.userId) {
            console.warn("⚠️ Token does not contain a valid userId");
            return null;
        }
  
        return { _id: decoded.userId, email: decoded.email }; // ✅ Ensure `_id` matches MongoDB structure
    } catch (error) {
        console.error("❌ Invalid Token:", error);
        return null;
    }
  }
  