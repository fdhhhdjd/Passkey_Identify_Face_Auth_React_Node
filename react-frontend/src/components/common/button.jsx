import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/libs/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
        destructive: "bg-red-500 text-white shadow-md hover:bg-red-600",
        outline: "border border-gray-300 bg-white shadow-sm hover:bg-gray-100",
        secondary: "bg-blue-500 text-white shadow-md hover:bg-blue-600",
        ghost: "hover:bg-gray-200 hover:text-gray-800",
        link: "text-blue-500 underline-offset-4 hover:underline",
        identity: "bg-purple-500 text-white shadow-md hover:bg-purple-600",
        mfa: "bg-green-500 text-white shadow-md hover:bg-green-600",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 rounded-md px-4 text-sm",
        lg: "h-14 rounded-md px-8 text-lg",
        icon: "h-12 w-12 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "opacity-50 cursor-not-allowed"
        )}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading ? <span className="loader"></span> : props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
