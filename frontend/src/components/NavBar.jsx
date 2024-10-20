import React, { useEffect, useState } from "react";
import { isTokenExpired } from "../components/ProtectedRoute"; // Ensure this import is available

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("accessToken");
  const currentPath = window.location.pathname; // Get the current URL path

  useEffect(() => {
    // Check if token is available and valid
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("accessToken"); // Remove expired token
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false); // Update login state after logout
  };

  const getActiveClass = (path) => {
    return currentPath === path ? "border-b-2 border-green-500" : "";
  };

  return (
    <>
      <nav className="w-full max-w-3xl bg-gray-500 h-16 mx-auto rounded-3xl place-content-center sticky z-50 top-3">
        <ul className="flex justify-around text-white cursor-pointer font-semibold font-mono">
          <li>
            <a
              href="/"
              className={`hover:text-blue-500 ${getActiveClass("/")}`}
            >
              Home
            </a>
          </li>

          {!isLoggedIn && (
            <>
              <li>
                <a
                  href="/register"
                  className={`hover:text-blue-500 ${getActiveClass(
                    "/register"
                  )}`}
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className={`hover:text-blue-500 ${getActiveClass("/login")}`}
                >
                  Login
                </a>
              </li>
            </>
          )}

          {isLoggedIn && (
            <>
              <li>
                <a
                  href="/userProfile"
                  className={`hover:text-blue-500 ${getActiveClass(
                    "/userProfile"
                  )}`}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="hover:text-blue-500"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
