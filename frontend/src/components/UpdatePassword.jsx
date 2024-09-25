import React, { useState } from "react";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="h-screen flex items-center justify-center w-full bg-gray-100">
      <div className="flex justify-between bg-white h-[600px] items-center w-[1000px] rounded-3xl shadow-2xl p-8">
        {/* Form Section */}
        <div className="w-full h-full flex flex-col justify-center px-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-700">
            Update Password
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            {/* Old Password Input */}
            <div className="relative">
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 px-4 py-2 rounded-lg"
                placeholder="Old Password"
                required
              />
              <label
                htmlFor="oldPassword"
                className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-indigo-600 peer-focus:bg-white"
              >
                Old Password
              </label>
            </div>

            {/* New Password Input */}
            <div className="relative">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 px-4 py-2 rounded-lg"
                placeholder="New Password"
                required
              />
              <label
                htmlFor="newPassword"
                className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-indigo-600 peer-focus:bg-white"
              >
                New Password
              </label>
            </div>

            {/* Confirm New Password Input */}
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
