import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";
import { IoCheckmark } from "react-icons/io5";
import { Typewriter } from "react-simple-typewriter";

const Plans = () => {
  return (
    <div className="py-14 lg:py-24 flex justify-center items-center">
      <div className="">
        <div className="text-center font-semibold py-3 lg:py-12">
          <h1 className="text-5xl">
            <span className="text-[#211f54] font-bold  tracking-wide">
              <Typewriter
                loop={5}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
                words={["Flexible", "Adaptive", "Awesome", "Scalable!","Smooth"]}
              />{" "}
            </span>
            <span>Plans</span>
          </h1>
          <p className="pt-6 text-xl text-gray-600 font-normal w-full px-8 md:w-full">
            Choose a plan that works best for you.
          </p>
        </div>
        <div className="px-3 lg:px-0 py-14 md:py-24 lg:flex items-center gap-12 space-y-6 lg:space-y-0">
          {/* <!-- Basic Card --> */}
          <div className="max-w-2xl lg:w-[490px] p-6 lg:p-9 bg-white text-center rounded-xl lg:rounded-3xl lg:px-16 shadow-xl">
            <h2 className="text-[#211f54] text-2xl lg:text-3xl font-bold">
              Basic Plan - “News Lite”
            </h2>
            <p className="text-gray-600 my-6 font-bold text-xl">
              {" "}
              Best For: Casual readers
            </p>

            <p className="text-5xl font-bold text-gray-800 mb-6">
              $49/
              <span className="text-2xl font-bold text-green-600">1 Min</span>
            </p>
            {/* divider */}
            <div className="flex items-center py-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-xl font-medium">
                What's Included
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* divider ends */}

            <div className="pt-2 lg:pt-8 icon">
              <ul>
                <li className="flex items-center gap-3 my-5">
                  <RxCross2 className="text-2xl text-red-600 " />
                  <span className="text-[17px] text-gray-700">
                    Access To Premium Articles Pages
                  </span>
                </li>
                <li className="flex items-center gap-3 my-5">
                  <RxCross2 className="text-2xl text-red-600" />
                  <span className="text-[17px] text-gray-700">
                    Access To Premium Articles Details
                  </span>
                </li>
                <li className="flex items-center gap-3 my-5">
                  <RxCross2 className="text-2xl text-red-600" />
                  <span className="text-[17px] text-gray-700">
                    Unlimited Articles Post
                  </span>
                </li>
              </ul>

              <div className="mx-auto text-center mt-12 ">
                <Link
                  className="mt-3 px-6 lg:px-12 py-2 lg:py-3 rounded-sm shadow-md bg-[#16b7cc] w-full md:text-xl font-bold text-white"
                  to={`/subscriptions`}
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
          {/* <!-- StartUp Card --> */}
          <div className="max-w-96 lg:w-full p-6 lg:px-6 lg:py-9  bg-[#05117c] text-center rounded-xl lg:rounded-3xl text-white border-4 shadow-xl border-white lg:transform lg:scale-125">
            <h2 className="text-2xl lg:text-3xl pt-2 lg:pt-6 font-bold text-white mb-4">
              Standard Plan – “News Plus”
            </h2>
            <p className="text-gray-200 my-6 font-medium">
              Best For: Regular readers who want more access
            </p>
            <p className="text-5xl font-bold text-gray-100 mb-6">
              $99/
              <span className="text-2xl font-bold text-gray-200">5 D</span>
            </p>
            {/* divider */}
            <div className="flex items-center py-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-200 text-xl font-medium">
                What's Included
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* divider ends */}
            <div className="pt-3 lg:pt-8 icon">
              <ul>
                <li className="flex items-center gap-3 my-2">
                  <IoCheckmark className="text-2xl lg:text-3xl text-green-500 " />
                  <span className="urbanist lg:text-[17px] text-gray-100">
                    Access To Premium Articles Pages
                  </span>
                </li>
                <li className="flex items-center gap-3 my-2">
                  <IoCheckmark className="text-2xl lg:text-3xl text-green-500" />
                  <span className="urbanist lg:text-[17px] text-gray-300">
                    Access To Premium Articles Details
                  </span>
                </li>
                <li className="flex items-center gap-3 my-2">
                  <IoCheckmark className="text-2xl lg:text-3xl text-green-500" />
                  <span className="urbanis lg:text-[17px] text-gray-300">
                    Unlimited Articles Post
                  </span>
                </li>
              </ul>

              <div className="mx-auto text-center mt-12">
                <Link
                  className="mt-3 px-6 lg:px-12 py-2 lg:py-3 rounded-sm shadow-md bg-[#16b7cc] w-full md:text-xl font-bold text-white"
                  to={`/subscription`}
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <p className="bg-blue-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">
                Popular
              </p>
            </div>
          </div>

          {/* enter prise card */}
          <div className="max-w-2xl lg:w-[490px] p-6 lg:p-9 bg-white text-center rounded-xl lg:rounded-3xl lg:px-16 shadow-xl">
            <h2 className="text-[#211f54] text-3xl font-bold">
              Premium Plan – “Pro Reader”
            </h2>
            <p className="text-gray-600 my-6 font-bold text-xl">
              {" "}
              Best For: News lovers and professionals
            </p>

            <p className="text-5xl font-bold text-gray-800 mb-6">
              $149/
              <span className="text-2xl font-bold text-green-600">15</span>
            </p>
            {/* divider */}
            <div className="flex items-center py-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-xl font-medium">
                What's Included
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* divider ends */}

            <div className="pt-3 lg:pt-8 icon">
              <ul>
                <li className="flex items-center gap-3 my-5">
                  <RxCross2 className="text-2xl text-red-600 " />
                  <span className="text-[17px] text-gray-700">
                    Access To Premium Articles Pages
                  </span>
                </li>
                <li className="flex items-center gap-3 my-5">
                  <RxCross2 className="text-2xl text-red-600" />
                  <span className="text-[17px] text-gray-700">
                    Access To Premium Articles Details
                  </span>
                </li>
                <li className="flex items-center gap-3 my-5">
                  <RxCross2 className="text-2xl text-red-600" />
                  <span className="text-[17px] text-gray-700">
                    Unlimited Articles Post
                  </span>
                </li>
              </ul>

              <div className="mx-auto text-center mt-12">
                <Link
                  className="mt-3 px-6 lg:px-12 py-2 lg:py-3 rounded-sm shadow-md bg-[#16b7cc] w-full md:text-xl font-bold text-white"
                  to={`/subscription`}
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
