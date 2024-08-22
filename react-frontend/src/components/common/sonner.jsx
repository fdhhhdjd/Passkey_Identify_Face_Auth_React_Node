import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  // const { theme = "system" } = useTheme();

  return (
    <Sonner
      // theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast transition-all duration-300 border-l-4 flex items-center", // Common toast styling
          description: "text-muted-foreground",
          success: "border-green-500 text-green-600", // Success border
          error: "border-red-500 text-red-600", // Error border
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
