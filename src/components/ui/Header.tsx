import { cn } from "@/lib/utils";
import React from "react";


const Header = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string; 
}) => {
  return (
    <div>
      <h1
        className={cn(
          "text-center text-9xl font-bold p-10 text-[#444433]", 
          className 
        )}
      >
        {children}
      </h1>
    </div>
  );
};

export default Header;
