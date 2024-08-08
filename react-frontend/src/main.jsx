import router from "@/routes";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import RootLoader from "@/components/ui/loaders/rootLoader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    fallbackElement={<RootLoader />}
    future={{
      v7: true, // Example option for enabling features from v7
    }}
  />
);
