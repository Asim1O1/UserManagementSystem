import React from "react";

function NavBar() {
  return (
    <>
      <nav className="  w-full max-w-3xl bg-gray-500 h-16 mx-auto rounded-3xl  place-content-center sticky z-50 top-0">
        <ul className="flex justify-around text-white cursor-pointer font-semibold font-mono">
          <li>
            <a href="/" className="hover:text-blue-500">
              Home
            </a>
          </li>

          <li>
            {" "}
            <a href="/register" className="hover:text-blue-500">
              Register
            </a>
          </li>
          <li>
            {" "}
            <a href="/login" className="hover:text-blue-500">
              Login
            </a>
          </li>
          <li>
            {" "}
            <a href="/userProfile" className="hover:text-blue-500">
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
