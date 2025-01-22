"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Hiệu ứng vòng quay */}
        <div className="w-16 h-16 border-4 border-indigo-500 border-solid rounded-full border-t-transparent animate-spin"></div>
        {/* Thông báo đang tải */}
        <p className="mt-4 text-xl text-gray-600">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
};

export default Loading;
