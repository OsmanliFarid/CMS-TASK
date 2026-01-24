import Link from "next/link";
import React from "react";
import { FiPlus } from "react-icons/fi";
const HeaderComponent = () => {
  return (
    <>
      <div className="flex items-center justify-between py-4 border-b border-gray-300">
        <div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Lead Management Dashboard
          </h1>
          <p>Track and manage your sales pipeline like a boss 🚀</p>
        </div>
        <button className="flex items-center px-2 gap-x-1.5 py-1.5 bg-linear-to-r from-blue-500 to-purple-600 text-white  rounded-md hover:from-blue-600 hover:to-purple-700">
          <FiPlus className="text-white" />
          <h1>Add Lead</h1>
        </button>
      </div>
    </>
  );
};

export default HeaderComponent;
