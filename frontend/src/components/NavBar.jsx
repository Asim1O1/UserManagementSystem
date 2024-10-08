import React from "react";

function NavBar() {
  const token = localStorage.getItem("accessToken");
  const currentPath = window.location.pathname; // Get the current URL path

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

  const getActiveClass = (path) => {
    return currentPath === path ? "border-b-2 border-blue-500" : ""; // Add active class if path matches
  };

  return (
    <>
      <nav className="w-full max-w-3xl bg-gray-500 h-16 mx-auto rounded-3xl place-content-center sticky z-50 top-0">
        <ul className="flex justify-around text-white cursor-pointer font-semibold font-mono">
          <li>
            <a
              href="/"
              className={`hover:text-blue-500 ${getActiveClass("/")}`}
            >
              Home
            </a>
          </li>

          {!token && (
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

          {token && (
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
