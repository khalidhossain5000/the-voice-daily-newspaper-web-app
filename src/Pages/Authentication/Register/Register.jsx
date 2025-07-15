import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxios from "../../../Hooks/useAxios";
import { FiUpload } from "react-icons/fi";
import bgImg from "../../../assets/authBg/bg-img.jpg";

const Register = () => {
  const [profilePic, setProfilePic] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { createUser, loading, updateUserProfile, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const axiosInstance = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    setPasswordError("");
    // password validation start
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (passwordPattern.test(password) == false) {
      setPasswordError(
        "Password Length must be at least 6 characters And Must have an Uppercase and a Lowercase letter"
      );
      return;
    }
    // password validation end
    createUser(email, password)
      .then((result) => {
        alert("User created");
        console.log(result);
        const user = result.user;
        //SENDING USER INFO TO THE DB
        const userInfo = {
          name,
          email,
          role: "user", //default role
          profilePic,
          premiumInfo: null,
        };
        axiosInstance
          .post("/users", userInfo)
          .then((res) => {
            alert("user sended to db");
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
        // update user profile in firebase
        const userProfile = {
          displayName: name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("profile name pic updated");
            setUser({ ...user, displayName: name, photoURL: profilePic });
            navigate(from);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreviewUrl(URL.createObjectURL(image)); // ✅ preview দেখানোর জন্য
    }
    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Imgbb_Key
    }`;
    const res = await axios.post(imagUploadUrl, formData);

    setProfilePic(res.data.data.url);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgImg})` }}
      className="bg-cover bg-no-repeat py-14 lg:py-36 min-h-screen px-2 lg:px-0"
    >
      {/* Login form card */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl lg:mx-auto overflow-hidden ">
        {/* top accent bar */}
        <div className="bg-[#0f1e3d] h-2"></div>

        <div className="p-6 lg:p-8">
          {/* Title */}
          <h1 className="text-center lg:text-left text-2xl lg:text-5xl font-bold text-[#0f1e3d] mb-6 lg:mb-12">
            Register
          </h1>

          <form onSubmit={handleSubmit}>
            {/* User Name */}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Enter Your Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full mb-5 border border-gray-200 rounded-lg px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-[#031934]"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Enter Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full mb-5 border border-gray-200 rounded-lg px-4 py-3
                   focus:outline-none focus:ring-2 focus:ring-[#031934]"
              />
            </div>

            {/* upload image */}
            <div className="mx-auto border border-gray-600 p-5 md:full my-2 rounded-xl shadow-md">
              <label
                htmlFor="image"
                className="block text-gray-800 p-3 text-xl"
              >
                Select Article Image:
              </label>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-4 w-12 h-12 rounded-full shadow mb-2 lg:mb-5"
                />
              )}
              <label
                htmlFor="image"
                className="mx-auto flex items-center gap-3 px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition"
              >
                <FiUpload className="text-xl" />
                <span>Choose Image</span>
              </label>

              <input
                onChange={handleImageUpload}
                className="hidden mx-auto"
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            {/* upload image ends */}

            {/* Password */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mb-5">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className=" w-full border border-gray-200 rounded-lg px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-[#031934]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-xl"
              >
                {showPassword ? "🙉" : "🙈"}
              </button>
            </div>

            <div>
              {/* password error */}
                <div className="py-2 w-full">
                  {passwordError && (
                    <h2 className="text-red-600 text-xl ">{passwordError}</h2>
                  )}{" "}
                  
                </div>

              <button
                type="submit"
                className="w-full bg-[#0f1e3d] text-white py-3 rounded-lg
                   hover:bg-red-600 cursor-pointer transition-colors duration-500"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
          {/* social logi componnet */}
          <h2 className="border-y border-y-[#031934] mt-5 w-full text-center border[#fce7f350] py-2 text-2xl font-bold text-gray-900">
            Or
          </h2>
          <SocialLogin />

          <div className="text-center">
            <h5 className="w-full mx-auto text-xl font-bold text-gray-900">
              Already have an account?
              <Link
                state={{ from: from || "/" }}
                to="/auth/login"
                className="text-green-600 mx-2 font-bold"
              >
                Login
              </Link>
              Here
            </h5>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex justify-center items-center min-h-screen bg-white">
    //   <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
    //     <div className="mb-8 text-center">
    //       <h1 className="my-3 text-4xl font-bold">Register</h1>
    //       <p className="text-sm text-gray-400">Welcome to NewsPaper</p>
    //     </div>
    //     <form
    //       onSubmit={handleSubmit}
    //       className="space-y-6 ng-untouched ng-pristine ng-valid"
    //     >
    //       <div className="space-y-4">
    //         <div>
    //           <label htmlFor="email" className="block mb-2 text-sm">
    //             Name
    //           </label>
    //           <input
    //             type="text"
    //             name="name"
    //             id="name"
    //             placeholder="Enter Your Name Here"
    //             className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
    //             data-temp-mail-org="0"
    //           />
    //         </div>
    //         <div>
    //           <label htmlFor="image" className="block mb-2 text-sm">
    //             Select Image:
    //           </label>
    //           <input
    //             onChange={handleImageUpload}
    //             className="bg-gray-200 cursor-pointer"
    //             type="file"
    //             id="image"
    //             name="image"
    //             accept="image/*"
    //           />
    //         </div>
    //         <div>
    //           <label htmlFor="email" className="block mb-2 text-sm">
    //             Email address
    //           </label>
    //           <input
    //             type="email"
    //             name="email"
    //             id="email"
    //             required
    //             placeholder="Enter Your Email Here"
    //             className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
    //             data-temp-mail-org="0"
    //           />
    //         </div>
    //         <div>
    //           <div className="flex justify-between">
    //             <label htmlFor="password" className="text-sm mb-2">
    //               Password
    //             </label>
    //           </div>
    //           <input
    //             type="password"
    //             name="password"
    //             autoComplete="new-password"
    //             id="password"
    //             required
    //             placeholder="*******"
    //             className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
    //           />
    //         </div>
    //       </div>
    //       {/* password error */}
    //       <div className="py-2 w-full">
    //         {passwordError && (
    //           <h2 className="text-red-600 text-xl ">{passwordError}</h2>
    //         )}
    //         *
    //       </div>
    //       <div>
    //         <button
    //           type="submit"
    //           className="bg-lime-500 w-full rounded-md py-3 text-white"
    //         >
    //           {loading ? (
    //             <TbFidgetSpinner className="animate-spin m-auto" />
    //           ) : (
    //             "Continue"
    //           )}
    //         </button>
    //       </div>
    //     </form>
    //     <SocialLogin />
    //     <p className="px-6 text-sm text-center text-gray-400">
    //       Already have an account?{" "}
    //       <Link
    //         to="/login"
    //         className="hover:underline hover:text-lime-500 text-gray-600"
    //       >
    //         Login
    //       </Link>
    //       .
    //     </p>
    //   </div>
    // </div>
  );
};

export default Register;
