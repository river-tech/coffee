import React from 'react';
import { useRouter } from 'next/router';

const PageNotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/'); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
