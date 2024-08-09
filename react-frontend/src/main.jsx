import router from "@/routes";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import RootLoader from "@/components/ui/loaders/rootLoader";
import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} fallbackElement={<RootLoader />} />
);
