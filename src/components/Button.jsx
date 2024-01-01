import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      className="bg-blue-500 text-white rounded-md hover:bg-blue-600 px-2 py-1 flex items-center space-x-2 justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
