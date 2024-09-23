import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordToggle = ({ showPassword, togglePasswordVisibility }) => {
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute top-1/2 left-[22rem] transform -translate-y-1/2 text-xl text-gray-600 focus:outline-none"
      >
        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </button>
    </div>
  );
};

export default PasswordToggle;
