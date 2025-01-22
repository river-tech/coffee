"use client";
import React, { useState } from "react";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Header from "@/components/ui/Header";
import { time } from "console";
import RatingForm from "./RatingForm";
import axios from "axios";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Tên quá ngắn",
      })
      .max(50, {
        message: "Tên quá dài",
      }),
    email: z.string().email({
      message: "Email không hợp lệ",
    }),
    number: z.number().positive({
      message: "Số người đặt không thể là số âm",
    }),
    date: z.string().refine(
      (value) => {
        const selectedDate = new Date(value);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "Ngày không hợp lệ" }
    ),
    time: z.string(),
    message: z.string().optional(),
  })
  .refine(
    (data) => {
      const today = new Date();
      const selectedDate = new Date(data.date);
      const selectedTime = new Date(`${data.date}T${data.time}`);

      if (selectedDate.toDateString() === today.toDateString()) {
        return selectedTime >= today;
      }
      return true;
    },
    { message: "Thời gian không hợp lệ", path: ["time"] }
  );

const BookingForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      number: 0,
      date: "",
      time: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const bookingRequest = {
      username: values.username,
      email: values.email,
      number: values.number,
      date: values.date,
      time: values.time,
      message: values.message,
    };
    try {
      const res = await axios.post("https://httpbin.org/post", bookingRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        form.reset();
        toast.success("Gửi thông tin đặt chỗ thành công");
      }
    } catch (error) {
      console.log(error);
      toast.error("Gửi thông tin đặt chỗ thất bại");
    }
  }

  const [isBooking, setIsBooking] = React.useState(false);
  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <div>
      {!isBooking ? (
        <div className="w-full h-fit-content pb-10 flex flex-col items-center bg-[#e2dfd9]">
          <Header>Đặt chỗ</Header>
          <div className="w-full max-w-[500px] p-6 bg-white rounded-lg shadow-lg relative">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 "
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Vui lòng nhập tên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Vui lòng nhập email" {...field} />
                      </FormControl>
                      <FormMessage className="text-[12px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập số lượng khách"
                          {...field}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? undefined
                                : parseFloat(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between ">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className=" w-[250px]"
                            type="time"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          className=" resize-none   flex h-[170px] mb-[80px] w-full rounded-md border-gray-900 border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
                          placeholder="Thêm yêu cầu"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-[100px] h-[40px] text-xl bg-[#444438] hover:bg-[#303027] absolute bottom-10"
                  type="submit"
                  // onClick={() => handleSubmit()}
                >
                  Send
                </Button>
              </form>
            </Form>
          </div>
          <Button
            onClick={() => setIsBooking(!isBooking)}
            className="m-5 p-10 text-xl bg-black hover:bg-[#303027] "
          >
            Chuyển sang đánh giá
          </Button>
        </div>
      ) : (
        <div className="w-full h-fit-content pb-10 flex flex-col items-center bg-[#e2dfd9]">
          <RatingForm />
          <Button
            onClick={() => setIsBooking(!isBooking)}
            className=" p-10 text-xl bg-black hover:bg-[#303027]"
          >
            Chuyển sang đặt chỗ
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
