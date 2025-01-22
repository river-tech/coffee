"use client";
import Header from "@/components/ui/Header";
import React, { use, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import ButtonToAdmin from "@/components/ui/ButtonToAdmin";
import Swal from "sweetalert2";
import { Dreviews } from "@/app/fakedb";
import axios from "axios";
import { number, set } from "zod";

const reviewList = Dreviews

const page = () => {
  const [reviews, setReviews] = useState(reviewList);


  const handleDelete =  (index: any) => {
    Swal.fire({
          title: "Bạn sẽ không thể hoàn tác khi xóa?",
          // text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Tiếp tục xóa đánh giá",
          cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            const newReviews = reviews.filter((item, i) => i !== index);
            setReviews(newReviews);
            // xoa review tren server
            try {
              const deleteReview = async () => {
                 await axios.delete('https://httpbin.org/delete', {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
              }
              deleteReview();
            } catch (error) {
              console.log(error);
            };

            Swal.fire({
              title: "Đã xóa!",
              text: "Đánh giá đã được xóa",
              icon: "success",
            });
          }
        });
    
      };




  return (
    <div>
      <Header className="text-5xl pr-0">Quản lí đánh giá</Header>
      <div className="mb-20">
        <Table className="">
          <TableHeader>
            <TableRow className="bg-[#d4ab58] h-14   text-black text-xl font-bold">
              <TableHead className="pl-4 w-[100px] text-black font-bold">
                Số thứ tự
              </TableHead>
              <TableHead className="text-black font-bold">
                Ảnh đại diện
              </TableHead>
              <TableHead className="text-black font-bold ">Tên</TableHead>
              <TableHead className="text-black font-bold">
                Sao đánh giá
              </TableHead>
              <TableHead className="text-black font-bold ">Bình luận</TableHead>
              <TableHead className="text-black font-bold">Chức năng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review, index) => (
              <TableRow
                key={index}
                className="border-b-2 border-[#444] text-xl hover:text-black"
              >
                <TableCell className="pl-10 font-bold">{index + 1}</TableCell>
                <TableCell>
                  {review.img ? (
                    <img
                      src={review.img}
                      alt={review.name}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  ) : (
                    <img
                      src="/img/no_avatar.jpg"
                      alt={review.name}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  )}
                </TableCell>
                <TableCell>{review.name}</TableCell>
                <TableCell className="flex size-40 items-center">
                  {" "}
                  {Array(5)
                    .fill(0)
                    .map((_, starIndex) => (
                      <FontAwesomeIcon
                        key={starIndex}
                        icon={faStar}
                        className={
                          starIndex < review.rating
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }
                      />
                    ))}
                </TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>
                  <Button
                    onClick={()=>handleDelete(index)}
                    className="text-white text-sm bg-[#eb3030] hover:bg-[#ff4242] px-8 py-5 rounded-xl ml-4"
                  >
                    Xóa
                  </Button>
                </TableCell>
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
