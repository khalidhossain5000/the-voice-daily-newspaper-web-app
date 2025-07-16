import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../../../Hooks/useAxios";
const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
  const axiosInstance=useAxios()
  const {setUser,updateUserProfile}=useAuth()
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        
const user = result.user;
        //SENDING USER INFO TO THE DB
        const userInfo = {
          name:user?.displayName,
          email:user?.email,
          role: "user", //default role
          profilePic:user?.photoURL,
          premiumInfo: null,
        };
        axiosInstance
          .post("/users", userInfo)
          .then(() => {
            
            
          })
          .catch((error) => {
            console.log(error);
          });
        // update user profile in firebase
        const userProfile = {
          displayName: user?.displayName,
          photoURL: user?.photoURL,
        };
        updateUserProfile(userProfile)
        // success toast
          .then(() => {
            
            setUser({ ...user, displayName: user?.displayName, photoURL: user?.photoURL });
            toast.success(`User Registered SuccessFully`, {
          className: "w-[300px] h-[100px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid #08086c",
            color: "white",
            backgroundImage: "linear-gradient(to bottom right, #050342,#01c3f4 )"
          },
        });
            navigate(from);
          })
          .catch((error) => {
            console.log(error);
          });
        navigate(from);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        <p className="px-3 text-sm dark:text-gray-400">
          Login with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
      </div>
      <div
        onClick={handleGoogleSignIn}
        className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
      >
        <FcGoogle size={32} />

        <p>Continue with Google</p>
      </div>
    </div>
  );
};

export default SocialLogin;
