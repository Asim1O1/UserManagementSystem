import React from "react";

const Button = ({ type = "button", onClick, children, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
