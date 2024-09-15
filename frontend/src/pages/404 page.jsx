import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-black font-bold text-3xl text-center">404 Error!</h1>
      <h2 className="text-red-500 text-center mt-4">
        The page you are looking for does not exist.
      </h2>
      <Link to="/" className="mt-8">
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
