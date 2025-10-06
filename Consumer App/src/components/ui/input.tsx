import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-gray-300 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-white text-black transition-[border-color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-blue-500 focus-visible:ring-blue-500/20 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        // Prevent autofill styling changes
        "autofill:bg-white autofill:text-black autofill:border-gray-300",
        "autofill:shadow-[inset_0_0_0px_1000px_white]",
        "autofill:[-webkit-text-fill-color:black]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };