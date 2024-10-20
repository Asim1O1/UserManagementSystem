import React, { useState } from "react";
import uiImage from "../assets/images/forgot password.avif";
import Swal from "sweetalert2";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/forgot-password",
        { email }
      );
      console.log(
        "The response while sending the reset password code is",
        response
      );

      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: "A password reset link has been sent to your email address.",
      });

      setEmail("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message || "Failed to send the reset email.",
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full bg-gray-100">
      <div className="flex justify-between bg-white h-[600px] items-center w-[1000px] rounded-3xl shadow-2xl p-8">
        <div className="w-7/12 h-full flex flex-col justify-center px-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-700">
            Forgot Password
          </h2>
          <p className="text-gray-600 mb-6">
            Enter your email to reset your password.
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

            {/* Agree to Terms */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
              <a
                href="/forgotPassword"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button with ClipLoader */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              disabled={loading} // Disable button during loading
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

        {/* Left Div for Image */}
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

export default ForgotPassword;
