import React from "react";
import uiImage from "../assets/images/Rectangle 20 (3).png";
import Button from "../components/button";

const Register = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center w-full bg-gray-100">
        <div className="flex justify-evenly bg-white h-[600px] items-center w-[1000px] rounded-3xl shadow-2xl">
          {/* Left Div for Image */}
          <div className="ml-10 w-5/12 h-5/6 px-3 rounded-3xl shadow-3xl">
            <img
              src={uiImage}
              alt="UI Image"
              className="w-full h-full object-cover rounded-3xl shadow-3xl"
            />
          </div>

          {/* Right Div for Form */}
          <div className="w-7/12 mr-7 h-5/6 p-6 pb-4 bg-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-700 ">Sign Up</h2>

            <form className="grid grid-cols-1 gap-6 ">
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    className="peer h-11 w-full border border-gray-300 text-black placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
                    placeholder="First Name"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
                  >
                    First Name
                  </label>
                </div>

                {/* Last Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
                    placeholder="Last Name"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
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
                    className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
                    placeholder="Username"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
                  >
                    Username
                  </label>
                </div>

                {/* Image Upload */}
                <div className="relative">
                  <input
                    type="file"
                    id="profileImage"
                    className="h-12 w-full border text-xs border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
                  />
                  <label
                    htmlFor="profileImage"
                    className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black"
                  >
                    Image
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
                >
                  Email
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="peer h-11 w-full border border-gray-300 text-black placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
                >
                  Password
                </label>
              </div>
              {/* Agree to Terms */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-indigo-600 underline">
                    terms and privacy policies
                  </a>
                </label>
              </div>

              <Button type="submit">Create account</Button>
              <p className="text-center text-sm">
                Already have an account? Login
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
