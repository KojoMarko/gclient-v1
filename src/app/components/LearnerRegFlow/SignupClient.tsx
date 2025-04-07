import { useState } from "react";
import { X, Lock } from "lucide-react"; // Removed unused Eye import
import { Lato, Inter } from "next/font/google";
import Image from "next/image";
import OTPVerification from "./OTPVerification";// ✅ Import OTPVerification component

// Font variables can be commented out if not used in CSS classes
// const lato = Lato({
//   subsets: ["latin"],
//   weight: ["700"],
//   variable: "--font-lato",
// });

// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["400", "600"],
//   variable: "--font-inter",
// });

interface SignupClientProps {
  onClose: () => void;
  onLogin: () => void;
}

// Define an error interface to replace 'any'
interface ApiError {
  message: string;
  status?: number;
}

const SignupClient: React.FC<SignupClientProps> = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Removed unused state variables
  // const [verificationCode, setVerificationCode] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showVerification, setShowVerification] = useState<boolean>(false);

 //Handle Signup
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/user/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      setSuccess("Signup successful! Check your email for the verification code.");
      setShowVerification(true); // Show verification code input
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
      <div className="w-[436px] h-auto p-6 rounded-none shadow-md bg-white text-black relative">
        <button className="absolute top-[10px] right-[15px] cursor-pointer" onClick={onClose}>
          <X />
        </button>

        {/* Show OTPVerification After Signup */}
        {showVerification ? (
          <OTPVerification email={email} onLogin={onLogin} />
        ) : (
          <>
            <h2 className="text-3xl leading-10 mb-6 text-center">Sign Up</h2>

            <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-sm mb-4 bg-transparent cursor-pointer">
              <Image src="/google-icon.svg" alt="Google Icon" width={20} height={20} priority />
               Signup using Google
            </button>

            <div className="text-center mb-4 text-gray-500">or</div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            <form onSubmit={handleSignup} className="flex flex-col space-y-4">
              <input type="text" placeholder="Enter your username" className="w-full p-3 border border-gray-300 rounded-sm" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <input type="email" placeholder="Enter your email" className="w-full p-3 border border-gray-300 rounded-sm" value={email} onChange={(e) => setEmail(e.target.value)} required />
              
              <div className="relative mb-6">
                <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                <input className="w-full p-3 pl-10 border border-gray-300 rounded-sm text-base leading-6 box-border" type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <button type="submit" className="w-full p-3 border-none rounded-sm bg-blue-600 text-white" disabled={loading}>
                {loading ? "Signing up..." : "Register"}
              </button>
            </form>

            <div className="text-center mt-4">
              Already have an account? <span className="text-blue-600 cursor-pointer" onClick={onLogin}>Login</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupClient;