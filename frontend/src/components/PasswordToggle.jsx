import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordToggle = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="relative w-full">
        {/* <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="peer h-11 w-96 border border-gray-300 text-black placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-lg"
        />
        <label
          htmlFor="password"
          className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
        >
          Password
        </label> */}
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-1/2 left-[22rem] transform -translate-y-1/2 text-xl text-gray-600 focus:outline-none"
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      </div>
    </div>
  );
};

export default PasswordToggle;
