import React from "react";
import PropTypes from "prop-types";
import { Lock, Eye, X } from "lucide-react";

const ResetPassword = ({ onClose, onSignup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset Password form submitted");
  };

  return (
    <div className="flex justify-center items-center bg-white text-black">
      <div className="w-[383px] p-6 rounded-sm shadow-md relative">
        <button className="absolute top-[10px] right-[15px] cursor-pointer" onClick={onClose} aria-label="Close reset password form">
          <X />
        </button>

        <h2 className="text-3xl leading-10 mb-4 text-center text-black">Reset Password</h2>
        <p className="text-center mb-6 text-gray-500">Create a new password and get started</p>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            <input
              className="w-full p-3 pl-10 border border-gray-300 rounded-sm text-base leading-6 box-border"
              type="password"
              placeholder="New password"
              required
            />
          </div>

          <div className="relative mb-6">
            <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            <input
              className="w-full p-3 pl-10 border border-gray-300 rounded-sm text-base leading-6 box-border"
              type="password"
              placeholder="Confirm new password"
              required
            />
            <Eye className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer" />
          </div>

          <button type="submit" className="w-full p-3 border-none rounded-sm bg-blue-700 text-white text-base leading-6 cursor-pointer mb-4">
            Reset Password &gt;
          </button>
        </form>

        <div className="text-center text-gray-500">
          <span className="text-blue-600 cursor-pointer" onClick={onSignup}>Need to create an account? Signup</span>
        </div>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
};

export default ResetPassword;
