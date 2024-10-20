import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { isTokenExpired } from "../components/ProtectedRoute";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("accessToken");

  const userName = useSelector(
    (state) => state?.auth?.user?.Result?.user?.userName
  );

  useEffect(() => {
    // Check if token is available and not expired
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("accessToken"); // Remove expired token
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <NavBar />

      {isLoggedIn ? (
        // User Home Section
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="bg-white shadow-md py-12 px-6 rounded-lg text-center max-w-lg mx-auto">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">
              Welcome, {userName}!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your users efficiently with easy-to-use tools.
            </p>
          </div>

          {/* Dashboard Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 max-w-6xl mx-auto mt-8">
            {/* Manage Users */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-800">
                Manage Users
              </h2>
              <p className="text-gray-600 mt-2">
                Add, edit, or delete users from your system.
              </p>
              <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
                Go to Users
              </button>
            </div>

            {/* View Reports */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-800">
                View Reports
              </h2>
              <p className="text-gray-600 mt-2">
                Check user activity and system reports.
              </p>
              <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
                View Reports
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
              <p className="text-gray-600 mt-2">
                Customize your account settings.
              </p>
              <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
                Go to Settings
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Guest Home Section
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="bg-white shadow-md py-12 px-6 rounded-lg text-center max-w-lg mx-auto">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">
              Welcome to Our Website!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Please log in or register to access more features.
            </p>
            <div className="mt-4">
              <button className="mr-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
                <a href="/login">Login</a>
              </button>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
                <a href="/register">Register</a>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
