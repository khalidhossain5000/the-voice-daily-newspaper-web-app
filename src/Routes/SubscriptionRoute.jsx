import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Shared/Loading/Loading";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const SubscriptionRoute = ({ children }) => {
  const {user}=useAuth()
   const axiosSecure = useAxiosSecure();
    //fetch current logged in user data from mongodb FOR CHECKING PREMIUM STATS
  const { data: currentLogInUserDbData, isPending } = useQuery({
    queryKey: ["log-in-user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });
console.log(currentLogInUserDbData);
  const location = useLocation();
  if (isPending) return <Loading />;
  

  // Check if user has valid premiumTaken
  const isPremium =
    currentLogInUserDbData?.premiumInfo && new Date(currentLogInUserDbData.premiumInfo) > new Date();
  console.log("ispremium", isPremium);

  
  if (!user || !isPremium) {
    return <Navigate to="/subscription" state={{ from: location }} replace />;
  }

  return children;
};

export default SubscriptionRoute;
