import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div className="ml-4">
              <h1 className="text-3xl font-bold">DSA Instructor Bot</h1>
              <p className="text-blue-100 mt-1">Your personal Data Structures & Algorithms mentor</p>
            </div>
          </div>
          <div className="bg-blue-500 rounded-full px-4 py-2 text-sm font-medium">
            Beta v1.0
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;