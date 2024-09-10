import React, { useState } from "react";
import Button from "./button";
import uiImage from "../assets/images/Rectangle 20 (3).png";
import { loginUser } from "../redux/slices/user/authSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = authData;

  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const validateForm = (authData) => {
    if (!authData) {
      Swal.fire({
        title: "Warning",
        text: "Please fill all the fields!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    const { email, password } = authData;

    if (!email || !password) {
      Swal.fire({
        title: "Warning",
        text: "Please fill all the fields!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(authData)) return;
    try {
      console.log("The auth dtaa uis", authData);
      const resultAction = await dispatch(loginUser(authData)).unwrap();
      console.log("THE AUTH DATA a", authData);
      console.log("The result action while logging in  is", resultAction);

      navigate("/");

      if (loginUser.fulfilled.match(resultAction)) {
        console.log("The user login matched");
        Swal.fire({
          title: "Success",
          icon: "success",
          text: resultAction.payload.Result.message,
        });

        navigate("/");
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          text:
            resultAction.payload.ErrorMessage[0]?.message ||
            "An error occurred",
        });
      }
    } catch (error) {
      console.log("The error while logging in is", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "An error occurred",
      });
      return error;
    }
  };

  return (
    <div>
      {" "}
      <div className="h-screen flex items-center justify-center w-full bg-gray-100">
        <div className="flex justify-evenly bg-white h-[600px] items-center w-[1000px] rounded-3xl shadow-2xl">
          {/* Right Div for Form */}
          <div className="w-7/12 mr-9 h-5/6 p-16 pb-4 bg-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-700 ">Login </h2>
            <p>Login to access your account</p>

            <form className="grid grid-cols-1 gap-6 ">
              <div className="grid grid-cols-2 gap-4"></div>

              {/* Username and Image Upload */}
              <div className="grid grid-cols-2 gap-4"></div>

              {/* Email */}
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="peer h-11 w-96 border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-lg"
                  placeholder="email"
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
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="peer h-11 w-96 border border-gray-300 text-black placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-lg"
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
              <div className="flex  space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-black">
                  Remember me
                </label>
                <label htmlFor="terms" className="text-sm text-red-500">
                  Forgot password
                </label>
              </div>

              <Button type="submit" onClick={handleSubmit} className="w-96">
                Login
              </Button>
              <p className=" text-sm px-6">Don't have an account? Register</p>
            </form>
          </div>
          {/* Left Div for Image */}
          <div className="ml-8 w-5/12 h-5/6 px-3 rounded-3xl shadow-3xl">
            <img
              src={uiImage}
              alt="UI Image"
              className="w-full h-full object-cover rounded-3xl shadow-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
