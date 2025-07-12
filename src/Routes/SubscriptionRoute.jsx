import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Shared/Loading/Loading";
import Swal from "sweetalert2";

const SubscriptionRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  // Check if user has valid premiumTaken
  const isPremium =
    user?.premiumTaken && new Date(user.premiumTaken) > new Date();
  console.log("ispremium", isPremium);

  
  if (!user || !isPremium) {
    return <Navigate to="/subscription" state={{ from: location }} replace />;
  }

  return children;
};

export default SubscriptionRoute;
