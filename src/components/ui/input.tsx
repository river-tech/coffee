import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[50px] w-full  focus:ring-black rounded-md border-8 border-gray-800 bg-transparent px-3 py-2 text-base shadow-sm placeholder-gray-500 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-xl",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
