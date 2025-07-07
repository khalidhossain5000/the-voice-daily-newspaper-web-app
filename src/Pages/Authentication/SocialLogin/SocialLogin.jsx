import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        // const user = result.user;
        console.log(result.user);
        // update userinfo in the database
        // const userInfo = {
        //     email: user.email,
        //     role: 'user', // default role
        //     created_at: new Date().toISOString(),
        //     last_log_in: new Date().toISOString()
        // }

        // const res = await axiosInstance.post('/users', userInfo);
        // console.log('user update info', res.data)

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
