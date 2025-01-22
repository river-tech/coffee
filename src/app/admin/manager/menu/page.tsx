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
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import ButtonToAdmin from "@/components/ui/ButtonToAdmin";
import { set, z } from "zod";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
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
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "react-toastify";
import { DmenuItems } from "@/app/fakedb";
import axios from "axios";

const menuItems = DmenuItems;

const formSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(1, {
    message: "Tên không được để trống, vui lòng nhập tên",
  }),
  price: z.number().positive({
    message: "Giá không hợp lệ",
  }),
  description: z.string().optional(),
});

const page = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [edit, setEdit] = useState(-1);
  const [newImage, setNewImage] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newDescription, setNewDescription] = useState("");
  const [menuItem, setMenuItem] = useState(menuItems);

  useEffect(() => {
    try {
      const fetchMenu = async () => {
        const res = await axios.get("https://httpbin.org/get", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res) {
          setMenuItem(res.data);
        }
      };
      fetchMenu();
    } catch (error) {
      console.log(error);
    }
  },[])

  const handleDeleteItem = (index: number) => {
    Swal.fire({
      title: "Bạn sẽ không thể hoàn tác khi xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Tiếp tục xóa món",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(index);
        const newMenu = menuItem.filter((item, i) => i !== index);
        try {
          const deleteMenu = async () => {
            const res = await axios.delete("https://httpbin.org/delete", {
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (res) {
              setMenuItem(newMenu);
              Swal.fire({
                title: "Đã xóa!",
                text: "Món đã được xóa khỏi menu.",
                icon: "success",
              });
            }
          };
          deleteMenu();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // cập nhật món
  const handleSubmit = () => {
    setEdit(-1);
    try {
      const updateMenu = [...menuItem];
      updateMenu[edit] = {
        ...updateMenu[edit],
        image: newImage,
        name: newName,
        price: newPrice,
        description: newDescription,
      };
      const editDrink = updateMenu[edit];
      const handleUpdateMenu = async () => {
        const res = await axios.put("https://httpbin.org/put", editDrink, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res) {
          setMenuItem(updateMenu);
          toast.success("Cập nhật món thành công");
        }
      };
      handleUpdateMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditButton = (index: number) => {
    setEdit(index);
    setNewImage(menuItem[index].image);
    setNewName(menuItem[index].name);
    setNewPrice(menuItem[index].price);
    setNewDescription(menuItem[index].description);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      price: 0,
      description: "",
    },
  });

  // thêm món
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.image) {
      toast.error("Vui lòng chọn ảnh cho món");
      return;
    }
    try {
      const newDrink = {
        id: menuItem.length + 1,
        image: values.image,
        name: values.name,
        price: values.price,
        description: values.description || "",
      };
      const res = await axios.post("https://httpbin.org/post", newDrink, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        setMenuItem([
          ...menuItem,
          {
            id: menuItem.length + 1,
            image: values.image,
            name: values.name,
            price: values.price,
            description: values.description || "",
          },
        ]);
        toast.success("Thêm món thành công");
        form.reset();
        console.log(values);
        setIsAdd(false);
      }
    } catch (error) {
      toast.error("Thêm món thất bại");
      console.log(error);
    }
  };

  const imageWatcher = form.watch("image");
  return (
    <div>
      <Header className="text-5xl">Quản lí thực đơn</Header>
      {!isAdd ? (
        <div>
          <Table className="w-screen">
            <TableHeader>
              <TableRow className="bg-[#d4ab58] h-14   text-black text-xl font-bold">
                <TableHead className="pl-4 w-[100px] text-black font-bold">
                  Số thứ tự
                </TableHead>
                <TableHead className="text-black font-bold ">
                  Hình ảnh
                </TableHead>
                <TableHead className="text-black font-bold">Tên</TableHead>
                <TableHead className="text-black font-bold">Giá</TableHead>
                <TableHead className="text-black font-bold w-[850px]">
                  Mô tả
                </TableHead>
                <TableHead className="text-black font-bold">
                  Chức Năng
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItem.map((menu, index) =>
                edit === index ? (
                  <TableRow
                    key={index}
                    className=" text-xl bg-gray-300 hover:bg-gray-300"
                  >
                    <TableCell className="pl-4">{index + 1}</TableCell>
                    <TableCell className="flex flex-col items-center justify-center mr-[40px]">
                      <img
                        src={newImage}
                        alt="preview"
                        className="w-20 h-40 pb-5 object-cover rounded-lg"
                      />
                      <UploadButton
                        className="w-20 h-20 object-cover rounded-lg"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res && res.length > 0 && res[0]?.url) {
                            setNewImage(res[0].url);
                            toast.success("Upload ảnh thành công");
                          }
                        }}
                        onUploadError={(error: Error) => {
                          console.log(`ERROR! ${error.message}`);
                          toast.error("Upload ảnh thất bại");
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        defaultValue={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="bg-white  w-[100px] "
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        defaultValue={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="bg-white  w-[100px]"
                      />
                    </TableCell>
                    <TableCell>
                      <textarea
                        defaultValue={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="bg-white text-xl w-[830px] p-2 h-[50px] resize-none rounded-lg"
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleSubmit()}>Hoàn tất</Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={index} className="hover:bg-gray-100 text-xl">
                    <TableCell className="pl-10 font-bold">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </TableCell>
                    <TableCell>{menu.name}</TableCell>
                    <TableCell>{menu.price}</TableCell>
                    <TableCell>{menu.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={() => handleEditButton(index)}
                          className="flex items-center justify-center text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                        >
                          Sửa
                        </Button>

                        <Button
                          onClick={() => handleDeleteItem(index)}
                          className="flex items-center justify-center text-white text-sm font-medium bg-red-500 hover:bg-red-600 active:bg-red-700 px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                        >
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
          <Button
            className="fixed top-10 right-10 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-base h-[40px] px-5 rounded-full shadow-lg font-medium transition-all duration-300 transform hover:scale-105"
            onClick={() => setIsAdd(true)}
          >
            <span>Thêm nước vào menu</span>
            <FontAwesomeIcon icon={faAdd} className="text-white text-xl" />
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold ">
                      Ảnh thức uống
                    </FormLabel>
                    <FormControl>
                      {imageWatcher ? (
                        <img
                          src={imageWatcher}
                          alt="preview"
                          className="w-[180p] h-[250px] object-cover rounded-md m-auto"
                        />
                      ) : (
                        <div>
                          <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              form.setValue("image", res[0].url);
                              toast.success("Upload ảnh thành công");
                            }}
                            onUploadError={(error: Error) => {
                              console.log(`ERROR! ${error.message}`);
                              toast.error("Upload ảnh thất bại");
                            }}
                          />
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-700">
                      Tên món nước
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập tên món"
                        {...field}
                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-700">
                      Giá
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập giá của món"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-700">
                      Mô tả
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Viết mô tả cho món"
                        {...field}
                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-5 justify-center">
                <Button
                  type="submit"
                  className="px-16 py-6 text-lg font-semibold text-white bg-[#444433] rounded-lg shadow-md hover:bg-[#81815e] focus:outline-none focus:ring-2 focus:ring-[#81815e] focus:ring-offset-2"
                >
                  Thêm
                </Button>
                <Button
                  onClick={() => setIsAdd(false)}
                  className="px-16 py-6 text-lg font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Hủy
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
      <ButtonToAdmin />
    </div>
  );
};

export default page;
