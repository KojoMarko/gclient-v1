import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface LoginClientProps {
  onClose: () => void;
  onForgotPassword: () => void;
  onSignup: () => void;
  onLoginSuccess: (userData: { name: string; email: string }) => void; // Pass user data
}

// Define an error interface to replace 'any'
interface ApiError {
  message: string;
}

const LoginClient: React.FC<LoginClientProps> = ({ onClose, onForgotPassword, onSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/user/auth/login", {// Uses NextJS API route
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // ✅ Store both token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user.id);  // 👈 Store userId separately

      console.log("✅ Stored User ID:", localStorage.getItem("userId")); // 👈 Debugging log

     // ✅ Pass user data to Navbar
    onLoginSuccess(data.user);

    // alert("Login successful!");
    onClose();
  } catch (err) {
    // Fixed: Use type casting instead of 'any'
    const error = err as Error | ApiError;
    setError(error.message || "An unexpected error occurred");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="h-full bg-black/50 flex items-center justify-center z-[1000]">
      <div className="w-[436px] h-[520px] p-6 rounded-none shadow-md bg-white text-black relative">
        <button className="absolute top-[10px] right-[15px] cursor-pointer" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-3xl leading-10 mb-6 text-center">Login</h2>

        <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-sm mb-4 bg-transparent cursor-pointer">
          <Image src="/google-icon.svg" alt="Google Icon" width={20} height={20} priority />
          Log in using Google
        </button>

        <div className="text-center mb-4 text-gray-500">or</div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="email" placeholder="Enter your email" className="w-full p-3 border border-gray-300 rounded-sm" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Enter your password" className="w-full p-3 border border-gray-300 rounded-sm" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          {/* Forgot Password Link */}
          <a className="block text-center mb-6 text-blue-600 cursor-pointer" onClick={onForgotPassword}>Forgot password?</a>
          
          <button type="submit" className="w-full p-3 border-none rounded-sm bg-blue-600 text-white">{loading ? "Logging in..." : "Login"}</button>
        </form>

        {/* Switch to Signup */}
        <div className="text-center mt-4">
          Need to create an account? <span className="text-blue-600 cursor-pointer" onClick={onSignup}>Signup</span>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;