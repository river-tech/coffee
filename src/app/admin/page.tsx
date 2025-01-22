"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"

const Page = () => {
  const text = "WELCOME TO ADMIN PAGE !";
  const [key, setKey] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const username = Cookies.get("username");
    if (!username) {
      router.push("/login");
    }
  }, []);


  // tạo hiệu ứng động cho 
  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center fixed top-0 bottom-0 left-0 right-0  h-screen bg-[#eae8e3]">
      {/* <HeaderManager /> */}
      <h1 key={key} className="text-7xl font-extrabold text-gray-800">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden"
            style={{
              display: "inline-block",
              animation:
                "text-reveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              animationDelay: `${index * 0.08}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
      <style jsx>{`
        @keyframes text-reveal {
          0% {
            opacity: 0;
            transform: translateX(-5px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
