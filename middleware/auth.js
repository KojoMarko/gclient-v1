import { NextRequest } from "next/server"; 
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

export function verifyToken(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded.userId) {
            return null;
        }

        return { _id: decoded.userId, email: decoded.email };
    } catch (error) {
        return null;
    }
}
