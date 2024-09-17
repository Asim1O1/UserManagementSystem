import React, { useState } from "react";
import Button from "../components/button";

const UserProfile = () => {
  const [isEditable, setIsEditable] = useState(false);

  // Toggle the edit mode
  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="min-h-screen bg-[#BAD0F8] flex flex-col items-center justify-center">
      <div
        className="relative bg-[#F9F9F9] w-[800px] h-[500px] mx-[20px] my-[5%] p-4 rounded-3xl"
        style={{ border: "7px solid #E3E3E3" }}
      >
        <h1>Welcome user X</h1>
        <p>Tues, 07 June 2022</p>
        <div className="bg-[#BAD0F8] h-[50px] my-3 rounded-md border border-[#F9F9F9]"></div>
        <div className="px-1 flex flex-row items-center border border-[#FFFFFF]">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4 flex flex-col border border-[#F9F9F9]">
            <h1 className="text-lg font-semibold">Asim Khadka</h1>
            <p className="text-gray-500">asimkhadka52@gmail.com</p>
          </div>
          <Button
            onClick={handleEditClick}
            className="ml-auto bg-[#4182F9] text-white px-4 py-2 rounded-md"
          >
            {isEditable ? "Cancel" : "Edit"}
          </Button>
        </div>
        <div className="mt-8 border border-[#F9F9F9]">
          <form className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Email"
                disabled={!isEditable}
              />
            </div>

            {isEditable && (
              <div className="col-span-2 mt-4">
                <Button className="w-full bg-[#4182F9] text-white px-4 py-2 rounded-md">
                  Submit
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
