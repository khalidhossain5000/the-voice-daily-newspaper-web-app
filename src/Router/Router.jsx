import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/LogIn/LogIn";
import PrivateRoute from "../Routes/PrivateRoute";
import AddArticle from "../Pages/AddArticle/AddArticle";
import Home from "../Pages/Home/Home/Home";

import DashBoardLayout from "../Layouts/DashBoardLayout";
import DashBoardHome from "../Pages/DashBoard/DashBoardHome/DashBoardHome";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import AllArticles from "../Pages/DashBoard/AllArticles/AllArticles";
import AddPublisher from "../Pages/DashBoard/AddPublisher/AddPublisher";
import Subscription from "../Pages/Subscription/Subscription";
import Payment from "../Pages/Subscription/PaymentPage/Payment";
import PublicAllArticles from "../Pages/PublicAllArticles/PublicAllArticles";
import PremiumArticle from "../Pages/PremiumArticle/PremiumArticle";
import SubscriptionRoute from "../Routes/SubscriptionRoute";
import MyProfileLayout from "../Layouts/MyProfileLayout";
import MyProfile from "../Pages/MyProfile/MyProfile/MyProfile";
import UpdateProfile from "../Pages/MyProfile/UpdateProfile/UpdateProfile";
import MyArticles from "../Pages/MyProfile/MyArticle/MyArticles";
import UpdateMyArticle from "../Pages/MyProfile/MyArticle/UpdateMyArticle/UpdateMyArticle";
import Test from "../Pages/Subscription/Test";
import ArticleDetails from "../Pages/ArticleDetails/ArticleDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "add-article",
        element: (
          <PrivateRoute>
            <AddArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "article/:id",
        element: (
          <PrivateRoute>
            <ArticleDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "subscription",
        element: (
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "premium-articles",
        element: (
          <PrivateRoute>
            <SubscriptionRoute>
              <PremiumArticle />
            </SubscriptionRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "allArticles",
        Component: PublicAllArticles,
      },
      {
        path: "test",
        Component: Test,
      },
    ],
  },
  //AUTH LAYOUT
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  //DASHBOARD LAYOUT
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashBoardHome,
      },
      {
        path: "all-users",
        Component: AllUsers,
      },
      {
        path: "all-articles",
        Component: AllArticles,
      },
      {
        path: "add-publisher",
        Component: AddPublisher,
      },
    ],
  },

  //MY PROFILE LAYOUT
  {
    path: "my-profile",
    element: (
      <PrivateRoute>
        <MyProfileLayout></MyProfileLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: MyProfile,
      },
      {
        path: "my-articles",
        Component: MyArticles,
      },
      {
        path: "update-profile",
        Component: UpdateProfile,
      },
      {
        path: "update-my-article/:id",
        Component: UpdateMyArticle,
      },
    ],
  },
]);
