import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import uiImage from "../assets/images/forgot password.avif";
import axios from "axios";
import { useParams } from "react-router-dom";
import PasswordToggle from "./PasswordToggle.jsx";
import Swal from "sweetalert2"; // Import SweetAlert2

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { token } = useParams();
  console.log(token);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entered the handle submit");

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3001/api/users/reset-password/${token}`,
        {
          newPassword: password,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password has been reset successfully.",
      });

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log("The error while resetting password is", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.ErrorMessage ||
          "An error occurred while resetting the password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full bg-gray-100">
      <div className="flex justify-between bg-white h-[600px] items-center w-[1000px] rounded-3xl shadow-2xl p-8">
        <div className="w-7/12 h-full flex flex-col justify-center px-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-700">
            Reset Password
          </h2>
          <p className="text-gray-600 mb-6">
            Enter your email and new password
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 px-4 py-2 rounded-lg"
                placeholder="Email"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-indigo-600 peer-focus:bg-white"
              >
                Email
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 px-4 py-2 rounded-lg"
                placeholder="New Password"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-indigo-600 peer-focus:bg-white"
              >
                New Password
              </label>
              <PasswordToggle
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 px-4 py-2 rounded-lg"
                placeholder="Confirm Password"
                required
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-indigo-600 peer-focus:bg-white"
              >
                Confirm Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#ffffff" size={20} />
              ) : (
                "Reset Password"
              )}
            </button>

            <p className="text-sm text-gray-500 mt-4">
              Don't have an account?{" "}
              <a href="/register" className="text-indigo-600 hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>

        <div className="w-5/12 h-full rounded-3xl overflow-hidden shadow-lg">
          <img
            src={uiImage}
            alt="Password Recovery Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
