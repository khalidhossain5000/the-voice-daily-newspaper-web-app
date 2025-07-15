import React from "react";
import imgi from "../../assets/forbiddenImg/forbidden-img.jpg";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="max-w-7xl lg:max-w-full lg:px-12 mx-auto min-h-screen shadow-2xl ">
      <h1 className="text-3xl lg:text-7xl text-center text-[#4a3993] font-bold rancho py-6 lg:py-9">
        Oops! You Shall Not Pass!
      </h1>
      <h1 className="text-xl py-3 lg:py-0 lg:text-xl font-bold text-center">
        Looks like this page is more secret than your browser history. Try going back before Gandalf gets mad.
      </h1>
      <div className="imgs text-center ">
        <img src={imgi} className="text-center mx-auto lg:w-7/12" alt="" />
      </div>
      <div className="w-full  text-center py-4">
        <Link
          className="inline-block px-6 lg:px-12 py-2 lg:py-3 rounded-sm shadow-md bg-[#16b7cc] md:text-xl font-bold text-white"
          to="/"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
