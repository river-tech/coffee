"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

// Component trang đăng nhập
export default function LoginPage() {
  // Khởi tạo state cho form đăng nhập
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // const validateEmail = (email:string) => {
  //   return String(email)
  //     .toLowerCase()
  //     .match(
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     );
  // };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
  //  alert("chao");
    e.preventDefault();
    // TODO: Thêm logic xác thực đăng nhập ở đây
//     console.log("Đăng nhập với:", formData);
//     if(!validateEmail(formData.email)){
//      Swal.fire({
//   title: 'Error!',
//   text: 'Enter right email pls!',
//   icon: 'error',
//   confirmButtonText: 'Cool'
// })
//       return;
//     }
    const res = await axios.post("http://localhost:8080/auth/authenticate", formData);
    console.log(res);
    alert(res);
    if (res) {
      router.push("/");
      Cookies.set("isLoggedIn", "true");
    }
    else {
       Swal.fire({
  title: 'Error!',
  text: 'Enter right email pls!',
  icon: 'error',
  confirmButtonText: 'Cool'
});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
      <div className="max-w-2xl w-full space-y-8 p-12 bg-white rounded-xl shadow-2xl">
        {/* Logo và tiêu đề */}
        <div className="text-center">
          <Image
            src="/img/depo_logo.jpg"
            alt="Logo"
            width={150}
            height={150}
            className="mx-auto"
            style={{borderRadius: "20%"}}
          />
          <h2 className="mt-8 text-4xl font-bold text-[#a08246]">
            Đăng nhập thành viên
          </h2>
        </div>

        {/* Form đăng nhập */}
        <form className="mt-12 space-y-8" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-6">
            {/* Input tài khoản */}
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-[#a08246] mb-2">
                Tài khoản
              </label>
              <input
                id="text"
                name="username"
                type="text"
                required
                className="block w-full px-4 py-3 text-lg border border-[#a08246] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a08246] focus:border-[#a08246]"
                placeholder="Nhập tài khoản"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* Input mật khẩu */}
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-[#a08246] mb-2">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full px-4 py-3 text-lg border border-[#a08246] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a08246] focus:border-[#a08246]"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Nút đăng nhập */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-[#a08246] hover:bg-[#8a703c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a08246] transition duration-200"
            >
              Đăng nhập
            </button>
          </div>

          {/* Liên kết đến trang đăng ký */}
          <div className="text-center mt-6">
            <p className="text-lg text-gray-600">
              Chưa có tài khoản?{" "}
              <Link href="/memberAuthen/signup" className="font-medium text-[#a08246] hover:text-[#8a703c]">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}