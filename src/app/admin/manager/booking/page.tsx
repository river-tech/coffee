"use client";
import { Button } from "@/components/ui/button";
import ButtonToAdmin from "@/components/ui/ButtonToAdmin";
import Header from "@/components/ui/Header";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DBookings } from "@/app/fakedb";
import axios from "axios";
import { set } from "zod";


const BookingsList = DBookings;


const page = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState(BookingsList);
  // console.log(bookings);

  // lấy dữ liệu người dùng đặt 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://httpbin.org/get', {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (res) {
          // setBookings(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [])

  // Hàm kiểm tra và xóa các booking đã quá hạn 30 phút
  const removeExpiredBookings = () => {
    const now = new Date();
    const newBookings = bookings.filter((booking) => {
      const bookingTime = new Date(booking.time);
      const diff = now.getTime() - bookingTime.getTime();
      const diffInMinutes = diff / 1000 / 60;
      // console.log(diffInMinutes);
      return diffInMinutes < 30;
    });
    if(newBookings.length !== bookings.length) {
    setBookings(newBookings);
    }
    else return;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      removeExpiredBookings();
    }, 1000);
    const updateBookings = async () => {
      try {
        await axios.put('https://httpbin.org/put', bookings, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    updateBookings();
    return () => clearInterval(interval);
  }, [bookings]);

  return (
    <div>
      <Header className="text-5xl">Quản lí đặt chỗ</Header>
      <div>
        <Table className="w-screen">
          <TableHeader>
            <TableRow className="bg-[#d4ab58] h-14   text-black text-xl font-bold">
              <TableHead className="pl-4 w-[100px] text-black font-bold">
                Số thứ tự
              </TableHead>
              <TableHead className="text-black font-bold">Tên</TableHead>
              <TableHead className="text-black font-bold">
                Số điện thoại
              </TableHead>
              <TableHead className="text-black font-bold">
                Thời gian đặt
              </TableHead>
              <TableHead className="text-black font-bold">
                Lời nhắn đính kèm
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking,index) => (
              <TableRow key={index} className="hover:bg-gray-100 text-xl">
                <TableCell className="font-medium pl-10">
                  {index+1}
                </TableCell>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.phone}</TableCell>
                <TableCell>
                  {new Date(booking.time).toLocaleString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>{booking.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ButtonToAdmin />
    </div>
  );
};

export default page;
