import React, { useState } from "react";
import uiImage from "../assets/images/Rectangle 20 (3).png";
import Button from "../components/button";
import { registerUser } from "../redux/slices/user/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PasswordToggle from "./PasswordToggle";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, userName, email, password } = formData;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    console.log("The event files iss", e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const validateForm = (formData) => {
    if (!formData) {
      Swal.fire({
        title: "Warning",
        text: "Please fill all the fields!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    const { firstName, lastName, userName, email, password } = formData;

    if (!firstName || !lastName || !userName || !email || !password) {
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

    if (!validateForm(formData)) return;

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Conditionally append image if it exists
    if (image) {
      formDataToSend.append("image", image);
    }
    setLoading(true);

    try {
      const resultAction = await dispatch(
        registerUser(formDataToSend)
      ).unwrap();
      console.log("The result action is", resultAction);

      if (resultAction?.IsSuccess) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text:
            resultAction?.payload?.Result?.message ||
            resultAction?.Result?.message ||
            "User Registered Successfully",
        });

        navigate("/login");
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
      console.log("The erorr is", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text:
          error?.ErrorMessage[0]?.message ||
          "An unexpected server error occurred",
      });
    } finally {
      setLoading(false); 
    }
  };

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
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
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
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
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
                    name="userName"
                    value={userName}
                    onChange={handleChange}
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
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="h-12 w-full border text-xs border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
                  />
                  <label
                    htmlFor="image"
                    className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black"
                  >
                    Image
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="peer h-11 w-full border border-gray-300 text-black placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
                >
                  Password
                </label>
                {/* Password Toggle */}
                <div className="absolute inset-y-6 mx-24">
                  <PasswordToggle
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                  />
                </div>
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

              {/* Loader or Submit Button */}
              {loading ? (
                <div className="flex justify-center items-center">
                  <ClipLoader color={"#0000ff"} loading={loading} size={50} />
                </div>
              ) : (
                <Button type="submit" onClick={handleSubmit}>
                  Create account
                </Button>
              )}
              <p className="text-center text-sm">
                Already have an account?
                <a href="/login" className="text-red-500 cursor-pointer">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
