import React from "react";
import uiImage from "../assets/images/Rectangle 20 (3).png";

const Register = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center w-full bg-gray-100">
        <div className="flex justify-evenly bg-white h-[600px] items-center w-[800px] rounded-3xl shadow-2xl">
          {/* Left Div for Image */}
          <div className="bg-black w-5/12 h-5/6">
            <img
              src={uiImage}
              alt="UI Image"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Div for Form */}
          <div className="w-5/12 h-5/6 p-6 bg-gray-400 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

            <form className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    className="peer h-12 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-md"
                    placeholder="First Name"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:bg-white"
                  >
                    First Name
                  </label>
                </div>

                {/* Last Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    className="peer h-12 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-md"
                    placeholder="Last Name"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:bg-white"
                  >
                    Last Name
                  </label>
                </div>
              </div>

              {/* Username and Image Upload */}
              <div className="grid grid-cols-2 gap-4">
                {/* Username */}
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    className="peer h-12 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-md"
                    placeholder="Username"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:bg-white"
                  >
                    Username
                  </label>
                </div>

                {/* Image Upload */}
                <div className="relative">
                  <input
                    type="file"
                    id="profileImage"
                    className="h-12 w-full border border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-600 p-4 rounded-md"
                  />
                  <label
                    htmlFor="profileImage"
                    className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500"
                  >
                    Profile Image
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="peer h-12 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-md"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:bg-white"
                >
                  Email
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="peer h-12 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-md"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:bg-white"
                >
                  Password
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
