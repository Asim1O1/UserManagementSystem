import React from "react";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100">
        {/* Welcome Section */}
        <div className="bg-white shadow-md py-12 px-6">
          <h1 className="text-4xl font-bold text-center text-indigo-600">
            Welcome to the User Management System
          </h1>
          <p className="mt-4 text-lg text-center text-gray-600">
            Manage your users efficiently with easy-to-use tools.
          </p>
        </div>

        {/* Dashboard Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 max-w-6xl mx-auto mt-8">
          {/* Manage Users */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800">Manage Users</h2>
            <p className="text-gray-600 mt-2">
              Add, edit, or delete users from your system.
            </p>
            <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
              Go to Users
            </button>
          </div>

          {/* View Reports */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800">View Reports</h2>
            <p className="text-gray-600 mt-2">
              Check user activity and system reports.
            </p>
            <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
              View Reports
            </button>
          </div>

          {/* Settings */}
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
    </>
  );
};

export default Home;
