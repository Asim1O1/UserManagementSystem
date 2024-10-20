import React from "react";
import { jwtDecode } from "jwt-decode";

import { Navigate } from "react-router-dom";

// Helper function to check if the token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token || isTokenExpired(token)) {
    console.log("Token expired navigatiogn to loginpage");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
