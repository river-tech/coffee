"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

// Component trang đăng ký tài khoản
export default function SignUpPage() {
  // Khởi tạo state cho form đăng ký
  const [formData, setFormData] = useState({
    email: "", // Email đăng nhập
    password: "", // Mật khẩu
    confirmPassword: "", // Xác nhận mật khẩu
  });

  // State để lưu lỗi validation
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const router = useRouter();

  // Hàm validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset lỗi khi người dùng nhập
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  // Xử lý submit form đăng ký
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    // if (!validateEmail(formData.email)) {
    //   setErrors(prev => ({
    //     ...prev,
    //     email: "Email không hợp lệ"
    //   }));
    //   return;
    // }

    // Validate mật khẩu
    if (formData.password.length < 6) {
      setErrors(prev => ({
        ...prev,
        password: "Mật khẩu phải có ít nhất 6 ký tự"
      }));
      return;
    }

    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: "Mật khẩu xác nhận không khớp"
      }));
      return;
    }

    // TODO: Thêm logic đăng ký tài khoản ở đây
    const res = await axios.post("http://localhost:8080/users/register", formData);
    console.log("Đăng ký với:", formData);
    if (res) {
      router.push("/memberAuthen/login");
    }
    else {
      toast.error("Đăng ký thất bại");
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
            Đăng ký tài khoản mới
          </h2>
        </div>

        {/* Form đăng ký */}
        <form className="mt-12 space-y-8" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-6">
            {/* Input email */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-[#a08246] mb-2">
                Tên đăng nhập
              </label>
              <input
                id="email"
                name="email"
                // type="email"
                required
                className="block w-full px-4 py-3 text-lg border border-[#a08246] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a08246] focus:border-[#a08246]"
                placeholder="Nhập tên đăng nhập của bạn"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="mt-1 text-red-500">{errors.email}</p>}
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
                placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="mt-1 text-red-500">{errors.password}</p>}
            </div>

            {/* Input xác nhận mật khẩu */}
            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-medium text-[#a08246] mb-2">
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="block w-full px-4 py-3 text-lg border border-[#a08246] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a08246] focus:border-[#a08246]"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="mt-1 text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Nút đăng ký */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-[#a08246] hover:bg-[#8a703c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a08246]"
            >
              Đăng ký
            </button>
          </div>

          {/* Link đăng nhập cho người dùng đã có tài khoản */}
          <div className="text-center mt-6">
            <p className="text-lg text-gray-600">
              Đã có tài khoản?{" "}
              <Link href="/memberAuthen/login" className="font-medium text-[#a08246] hover:text-[#8a703c]">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}