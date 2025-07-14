import React from "react";
import footerlogo from "../../../assets/logo/footer-logo.webp";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { NavLink } from "react-router";
const Footer = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/add-article">Add Articles</NavLink>
      </li>
      <li>
        <NavLink to="/subscription">Subscription</NavLink>
      </li>
      <li>
        <NavLink to="/premium-articles">Premium Articles(C)</NavLink>
      </li>
      <li className="inter">
        <NavLink to="/allArticles">All Articles(C)</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-[#030b13] py-12 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="logos border-b-1 border-b-gray-300 pb-6">
          <img src={footerlogo} className="max-w-64 md:w-64 mx-auto" alt="" />
        </div>
        <div className="socialnadmenu">
          <div className="flex flex-col lg:flex-row  justify-center items-center mt-3 lg:mt-12 gap-6 lg:gap-12">
            <a href="https://facebook.com/" target="_blank">
              <FaFacebook
                size={50}
                className="text-white hover:text-[#1447e6] transition duration-200"
              />
            </a>
            <a href="https://x.com/" target="_blank">
              <BsTwitterX
                size={50}
                className="text-white hover:text-[#1447e6] transition duration-200"
              />
            </a>
            <a href="https://github.com/khalidhossain5000" target="_blank">
              <FaGithub
                size={50}
                className="text-white hover:text-[#1447e6] transition duration-200"
              />
            </a>
            <a href="https://youtube.com/" target="_blank">
              <FaYoutube
                size={50}
                className="text-white hover:text-[#1447e6] transition duration-200"
              />
            </a>
            <a href="https://www.linkedin.com/" target="_blank">
              <FaLinkedin
                size={50}
                className="text-white hover:text-[#1447e6] transition duration-200"
              />
            </a>
          </div>
          <div>
            <ul className="flex items-center justify-center flex-col lg:flex-row text-white urbanist text-xl font-semibold gap-6 lg:gap-7 mt-12">
              {links}
            </ul>
          </div>

          <div className="copyright py-6 border-t border-gray-300 mt-7">
            <h3 className="text-center text-2xl text-gray-300">
              &copy;{" "}
              <span className="font-bold text-white mx-1">The Voice Daily</span>
              All Rights Reserved
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
