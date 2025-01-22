"use client";
import React from "react";
import { useRouter } from "next/navigation";

const PageNotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#e2dfd9]">
      <div className="flex items-center justify-center w-40 h-40 bg-gray-300 rounded-full mb-6 shadow-lg">
        <h1 className="text-5xl font-bold text-gray-700">404</h1>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Trang không tồn tại
      </h2>

      <p className="text-lg text-gray-700 text-center max-w-md mb-8">
        Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        Vui lòng kiểm tra lại URL hoặc quay về trang chủ.
      </p>

      <button
        onClick={handleGoHome}
        className="px-6 py-3 text-lg font-medium text-white bg-[#2d50c0] rounded-lg shadow-md hover:bg-[#3c62e0] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3c62e0] focus:ring-offset-2"
      >
        Quay về trang chủ
      </button>
    </div>
  );
};

export default PageNotFound;
