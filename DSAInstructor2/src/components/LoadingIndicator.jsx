import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex space-x-2 justify-center">
      <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
      <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
      <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

export default LoadingIndicator;