import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { router } from "./Router/Router";
import AuthProvider from "./Context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
