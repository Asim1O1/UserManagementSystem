import React from "react";

const ForgotPassword = () => {
  return (
    <div>
      {" "}
      <div className="h-screen flex items-center justify-center w-full bg-gray-100">
        <div className="flex justify-evenly bg-white h-[600px] items-center w-[1000px] rounded-3xl shadow-2xl">
          {/* Right Div for Form */}
          <div className="w-7/12 mr-9 h-5/6 p-16 pb-4 bg-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-700 ">Login </h2>
            <p>Forgot your password?</p>

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

export default ForgotPassword;
