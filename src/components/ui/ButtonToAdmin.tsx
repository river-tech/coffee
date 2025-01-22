import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const ButtonToAdmin = () => {
  const router = useRouter();
  return (
    <div>
      <Button className='fixed bottom-5 left-5 text-xl p-6 rounded-xl bg-[#d4ab58] hover:bg-[#b58939]' onClick={()=>router.push("/admin")}>Trở về trang chủ</Button>
    </div>
  );
};

export default ButtonToAdmin;
