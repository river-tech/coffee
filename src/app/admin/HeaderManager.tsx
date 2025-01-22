"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function HeaderManager() {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();

  const buttons = [
    { label: "Menu", path: "/admin/manager/menu" },
    { label: "Booking", path: "/admin/manager/booking" },
    { label: "Rating", path: "/admin/manager/rating" },
  ];

  const handleNavigate = (path: string) => {
    setIsShow(false);
    router.push(path);
  }

  const handleLogout = () => {
    Cookies.remove("username");
    router.push("/login");
  }

  return (
    <div className="fixed bottom-5 right-5">
      {isShow ? (
        <div className="relative flex flex-col gap-4">
          <div className="flex flex-col gap-8 items-end mb-4">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(button.path)}
                className={`bg-[#3b5998] text-white px-4 py-2 rounded shadow-lg hover:bg-[#4a69bd] transition-all duration-300`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {button.label}
              </button>
            ))}
          </div>
          <button
            className="bg-[#d4ab58] p-4 text-white text-2xl rounded-full shadow-lg hover:bg-[#b58939] transition-all duration-300"
            onClick={() => setIsShow(false)}
          >
            Cancel
          </button>
        </div>
      ) : (

        <button
          className="bg-[#d4ab58] p-4 text-white text-2xl rounded-full shadow-lg hover:bg-[#b58939] transition-all duration-300"
          onClick={() => setIsShow(true)}
        >
          Manager
        </button>
      )}
      <button className="bg-[#d42929] fixed left-9 p-4 text-white text-2xl rounded-full shadow-lg hover:bg-[#e04a56] transition-all duration-300" onClick={handleLogout} >
        Logout
      </button>
    </div>
  );
}
