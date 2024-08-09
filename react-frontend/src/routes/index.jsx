import React from "react";
import { toast } from "sonner";
import { createBrowserRouter, json } from "react-router-dom";

import App from "@/App";
import PageLoader from "@/components/ui/loaders/pageLoader";
import RootLoader from "@/components/ui/loaders/rootLoader";
import { randomNumber } from "@/helpers/randomUtils";
import { Toaster } from "@/components/common/sonner";
import ErrorFallback from "@/pages/error";

const NotFound = React.lazy(() => import("@/pages/notfound"));
const Login = React.lazy(() => import("@/pages/login"));
const Dashboard = React.lazy(() => import("@/pages/dashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense fallback={<RootLoader />}>
        <App />
      </React.Suspense>
    ),
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Dashboard />
          </React.Suspense>
        ),
        handle: { crumb: "Dashboard" },
        loader: async () => {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${randomNumber(1, 10)}`
          );
          return response.json();
        },
      },
      {
        path: "/login",
        handle: { crumb: "Login" },
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Login />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <React.Suspense fallback={<RootLoader />}>
        <NotFound />
      </React.Suspense>
    ),
    handle: { crumb: "Not Found" },
  },
]);

export default router;
