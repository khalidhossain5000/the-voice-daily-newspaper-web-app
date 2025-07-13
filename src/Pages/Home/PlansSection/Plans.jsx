import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";
import { IoCheckmark } from "react-icons/io5";

const Plans = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="">
        <div className="text-center font-semibold">
          <h1 className="text-5xl">
            <span className="text-blue-700 tracking-wide">Flexible </span>
            <span>Plans</span>
          </h1>
          <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
            Choose a plan that works best for you and your team.
          </p>
        </div>
        <div className="py-24 lg:flex items-center gap-12">
          {/* <!-- Basic Card --> */}
          <div className="max-w-2xl lg:w-[490px] p-4 lg:p-9 bg-white text-center rounded-3xl px-16 shadow-xl">
            <h2 className="text-[#211f54] text-3xl font-bold">
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

            <div className="pt-8 icon">
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

              <Link
                to="/subscription"
                className="btn btn-xl btn-info w-full font-bold text-black"
              >
                Choose Plan
              </Link>
            </div>
          </div>
          {/* <!-- StartUp Card --> */}
          <div className="max-w-96 lg:w-full px-6 py-9  bg-[#05117c] text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-125">
            <h2 className="text-3xl pt-2 lg:pt-6 font-bold text-white mb-4">
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
             <div className="pt-8 icon">
              <ul>
                <li className="flex items-center gap-3 my-2">
                  <IoCheckmark className="text-3xl text-green-500 " />
                  <span className="text-[17px] text-gray-100">
                    Access To Premium Articles Pages
                  </span>
                </li>
                <li className="flex items-center gap-3 my-2">
                  <IoCheckmark className="text-3xl text-green-500" />
                  <span className="text-[17px] text-gray-300">
                    Access To Premium Articles Details
                  </span>
                </li>
                <li className="flex items-center gap-3 my-2">
                  <IoCheckmark className="text-3xl text-green-500" />
                  <span className="text-[17px] text-gray-300">
                    Unlimited Articles Post
                  </span>
                </li>
              </ul>

              <Link
                to="/subscription"
                className="btn btn-xl btn-info w-full font-bold text-black"
              >
                Choose Plan
              </Link>
            </div>
            <div className="absolute top-4 right-4">
              <p className="bg-blue-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">
                Popular
              </p>
            </div>
          </div>

          {/* enter prise card */}
          <div className="max-w-2xl lg:w-[490px] p-4 lg:p-9 bg-white text-center rounded-3xl px-16 shadow-xl">
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

            <div className="pt-8 icon">
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

              <Link
                to="/subscription"
                className="btn btn-xl btn-info w-full font-bold text-black"
              >
                Choose Plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
