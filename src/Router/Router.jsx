import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/LogIn/LogIn";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path:'login',
        Component:Login
      }
    ],
  },
]);
