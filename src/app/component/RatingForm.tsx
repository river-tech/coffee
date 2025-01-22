"use client";
import React, { use, useState } from "react";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

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
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Tên quá ngắn",
    })
    .max(50, {
      message: "Tên quá dài",
    }),
  ratingIndex: z
    .number()
    .min(1, {
      message: "Vui lòng chọn số sao",
    })
    .max(5),
  comment: z.string().optional(),
});

const RatingForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      ratingIndex: 0,
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const res = await axios.post('https://httpbin.org/post',{
        username: values.username,
        ratingIndex: values.ratingIndex,
        comment: values.comment,
      },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res) {
        router.refresh();
        form.reset();
        toast.success('Gửi đánh giá thành công');
      }

    } catch (error) {
      console.log(error);
    }
    
  }

  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <div className="w-full h-fit-content pb-10 flex flex-col items-center bg-[#e2dfd9]">
      <Header className="text-5xl py-[30px]">
        Mọi sự đánh giá của bạn giúp quán phát triển hơn
      </Header>
      <div className="w-full max-w-[500px] p-6 bg-white rounded-lg shadow-lg relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
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
              name="ratingIndex"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex pl-2 mb-10  space-x-2 size-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => field.onChange(star)}
                          className="cursor-pointer text-4xl text-yellow-500 pl-2"
                        >
                          {hoverRating >= star ||
                          Number(field.value) >= star ? (
                            <AiFillStar />
                          ) : (
                            <AiOutlineStar />
                          )}
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className=" resize-none mb-[80px]   flex h-[300px] w-full rounded-md border-gray-900 border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-xl"
                      placeholder="Nhập đánh giá của bạn"
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
              //   onClick={() => handleSubmit()}
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RatingForm;
