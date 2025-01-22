"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header h-[100px] fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container flex items-center justify-between px-6">
        <button onClick={() => scrollToSection("home")} className="logo">
          <Image src="/img/depo_logo.jpg" alt="Logo" width={100} height={67} />
        </button>

        <nav className="navbar flex space-x-6">
          <button
            onClick={() => scrollToSection("home")}
            className="text-2xl text-gray-700 hover:text-black"
          >
            Trang chủ
          </button>
          <button
            onClick={() => scrollToSection("menu")}
            className="text-2xl text-gray-700 hover:text-black"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection("review")}
            className="text-2xl text-gray-700 hover:text-black"
          >
            Xem đánh giá
          </button>

          <button
            onClick={() => scrollToSection("footer")}
            className="text-2xl text-gray-700 hover:text-black"
          >
            Liên hệ
          </button>
        </nav>

        <button
          onClick={() => scrollToSection("book")}
          className="btn bg-primary px-4 py-2 text-white rounded"
        >
          Đặt chỗ/Đánh giá
        </button>
      </div>
    </header>
  );
};

export default Navbar;
