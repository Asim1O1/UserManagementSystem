import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/button";
import {
  getUserProfile,
  updateUserProfile,
} from "../redux/slices/user/userProfile";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.UserProfile);
  console.log("The user  is", user);

  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userName: user.userName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setIsEditable(!isEditable);
  };

  return (
    <div className="min-h-screen bg-[#BAD0F8] flex flex-col items-center justify-center">
      <div
        className="relative bg-[#F9F9F9] w-[800px] h-[500px] mx-[20px] my-[5%] p-4 rounded-3xl"
        style={{
          border: "7px solid #E3E3E3",
          borderRadius: "1.5rem",
        }}
      >
        {status === "loading" && <p>Loading...</p>}

        {!user && <p>No user profile found.</p>}
        {user && (
          <>
            <h1>Welcome {user.firstName || "User"}</h1>
            <p>{new Date().toDateString()}</p>
            <div className="bg-[#BAD0F8] h-[50px] my-3 rounded-md border border-[#F9F9F9]"></div>
            <div className="px-1 flex flex-row items-center border border-[#FFFFFF]">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={user.image || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex flex-col border border-[#F9F9F9]">
                <h1 className="text-lg font-semibold">
                  {user.firstName || "User"}
                </h1>
                <p className="text-gray-500">
                  {user.email || "user@example.com"}
                </p>
              </div>
              <Button
                onClick={handleEditClick}
                className="ml-auto bg-[#4182F9] text-white px-4 py-2 rounded-md"
              >
                {isEditable ? "Cancel" : "Edit"}
              </Button>
            </div>
            <div className="mt-8 border border-[#F9F9F9]">
              <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter First Name"
                    disabled={!isEditable}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Last Name"
                    disabled={!isEditable}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Username"
                    disabled={!isEditable}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Email"
                    disabled={!isEditable}
                  />
                </div>

                {isEditable && (
                  <div className="col-span-2 mt-4">
                    <Button
                      className="w-full bg-[#4182F9] text-white px-4 py-2 rounded-md"
                      onClick={handleSubmit}
                    >
                      {status === "loading" ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
