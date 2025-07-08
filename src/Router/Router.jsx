import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/LogIn/LogIn";
import PrivateRoute from "../Routes/PrivateRoute";
import AddArticle from "../Pages/AddArticle/AddArticle";
import Home from "../Pages/Home/Home/Home";
import ArticleDetails from "../ArticleDetails/ArticleDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index:true,
        Component:Home
      },
      {
        path:'add-article',
        element:<PrivateRoute>
          <AddArticle/>
        </PrivateRoute>
      },
      {
        path:'article/:id',
        element:<PrivateRoute>
          <ArticleDetails/>
        </PrivateRoute>
      }
    ],
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
