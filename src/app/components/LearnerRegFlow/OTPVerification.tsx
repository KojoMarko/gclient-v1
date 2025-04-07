// components/OTPVerification.jsx
'use client';
import React, { useState } from "react"; // ✅ Import useState
import { Lato, Inter } from 'next/font/google';
// Removed unused 'styles' import

const lato = Lato({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-lato',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600'],
    variable: '--font-inter',
});

interface OTPVerificationProps {
    email: string;
    onLogin: () => void;
}

// Define error interface to replace 'any'
interface ApiError {
    message: string;
    status?: number;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ email, onLogin }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendMessage, setResendMessage] = useState("");

    const handleChange = (index: number, value: string) => { // ✅ Explicitly define `index` and `value` types
        if (value.match(/^[0-9]$/)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
    };

    // Handle OTP Verification

    const handleVerify = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/user/auth/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: otp.join("") }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Verification failed");

            alert("Email verified successfully! You can now log in.");
            onLogin(); // ✅ Switch to login modal
        } catch (err) {
            // Fixed: Use type casting instead of 'any'
            const error = err as Error | ApiError;
            setError(error.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };


    // Handle Resend OTP
  const handleResendOTP = async () => {
    setResendLoading(true);
    setResendMessage("");

    try {
      const response = await fetch("/api/user/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to resend OTP");

      setResendMessage("A new OTP has been sent to your email.");
    } catch (err) {
      // Fixed: Use type casting instead of 'any'
      const error = err as Error | ApiError;
      setError(error.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };



    return (
        <div className="flex justify-center items-center bg-white text-black">
            <div className="w-[383px] p-4 rounded-sm ">
                <h2 className={`text-3xl mb-4 text-center leading-10 ${lato.className}`}>OTP Verification</h2>
                <p className={`text-center mb-6 text-[#777] ${inter.className}`}>
                    Verify your account using the six-digit code sent to <strong>{email}</strong>
                </p>
                <div className="flex justify-center gap-4 mb-4">
                    {otp.map((value, index) => (
                        <input key={index} className={`w-10 h-10 border border-gray-300 rounded-md text-center text-xl focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200 invalid:border-red ${inter.className}`} type="text" maxLength={1} value={value} onChange={(e) => handleChange(index, e.target.value)} />
                    ))}
                </div>
                {error && <p className="text-red-500">{error}</p>}

<button className={`w-full px-3 py-2 border-none rounded-md bg-blue-700 text-white text-base leading-6 cursor-pointer ${inter.className}`} onClick={handleVerify} disabled={loading}>
  {loading ? "Verifying..." : "Verify account"}
</button>

{/* Resend OTP Section */}
<p className={`text-center mb-8 text-gray-500 ${inter.className}`}>
  Didn&apos;t get a code?{" "}
  <button className="text-blue-700 font-bold cursor-pointer border-none bg-none underline disabled:text-gray-500 disabled:cursor-not-allowed" onClick={handleResendOTP} disabled={resendLoading}>
    {resendLoading ? "Resending..." : "Click to resend"}
  </button>
</p>
{resendMessage && <p className="text-green-500 text-center mt-4">{resendMessage}</p>}
</div>
</div>
);
};

export default OTPVerification;