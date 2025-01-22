"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  username: string;
  password: string;
  className?: string;
}

export function LoginForm({
  className,
  ...props
}: LoginFormProps) {
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.target as HTMLFormElement).elements.namedItem(
      "username"
    ) as HTMLInputElement;
    const password = (e.target as HTMLFormElement).elements.namedItem(
      "password"
    ) as HTMLInputElement;
    const user = {
      username: username.value,
      password: password.value,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/authenticate",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        Cookies.set("username", user.username, { expires: 1/24 });
        router.push("/admin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={cn("flex items-center flex-col gap-6", className)}
      {...props}
    >
      <Card className="bg-[#e2dfd9] w-[560px] border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Đăng nhập
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label className="text-gray-800 font-medium">Username</Label>
                <Input
                  id="username"
                  name="username"
                  required
                  // placeholder="m@example.com"
                  defaultValue={""}
                  className="bg-white text-gray-800 border border-gray-300 focus:border-[#2d50c0] focus:ring focus:ring-[#3c62e0] focus:ring-opacity-50 rounded-md"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="password"
                    className="text-gray-800 font-medium"
                  >
                    Mật khẩu
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  defaultValue={""}
                  className="bg-white text-gray-800 border border-gray-300 focus:border-[#2d50c0] focus:ring focus:ring-[#3c62e0] focus:ring-opacity-50 rounded-md"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#2d50c0] text-white font-medium hover:bg-[#3c62e0] h-[38px] transition-all text-xl rounded-md py-2"
              >
                Đăng nhập
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
