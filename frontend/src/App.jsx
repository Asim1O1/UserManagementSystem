import React from "react";
import Register from "./components/register";
import Login from "./components/Login";
import UserProfile from "./pages/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./components/ForgotPassword";
import PageNotFound from "./pages/404 page";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./components/ResetPassword";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />

          <Route
            path="/userProfile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
