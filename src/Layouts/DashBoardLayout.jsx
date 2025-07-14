import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink, Outlet } from "react-router";
import { MdDashboard } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";
import { HiOutlineNewspaper } from "react-icons/hi";
import siteLogo from "../assets/logo/footer-logo.webp";
import useAuth from "../Hooks/useAuth";

const DashBoardLayout = () => {
  const { user } = useAuth();
  console.log(user);
  const handleDrawerClose = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  const links = (
    <>
      <li>
        <NavLink
          className="hover:bg-[#19191e] hover:p-2 hover:rounded-md"
          to="/dashboard"
          onClick={handleDrawerClose}
        >
          <MdDashboard className="text-xl mr-1" />
          Dashoboard
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:bg-[#19191e] hover:p-2 hover:rounded-md"
          to="/dashboard/all-users"
          onClick={handleDrawerClose}
        >
          <FaUserLarge className="text-xl mr-1" /> All users
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:bg-[#19191e] hover:p-2 hover:rounded-md"
          to="/dashboard/all-articles"
          onClick={handleDrawerClose}
        >
          <TfiWrite className="text-xl mr-1" /> All Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          className="hover:bg-[#19191e] hover:p-2 hover:rounded-md"
          to="/dashboard/add-publisher"
          onClick={handleDrawerClose}
        >
          <HiOutlineNewspaper className="text-xl mr-1" /> Add Publisher
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="drawer  lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-[#e8efef] ">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <GiHamburgerMenu size={30} className="mx-3" />
          </label>

          {/* Page content here */}
          <div className="w-full overflow-x-hidden">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className=" poppins menu flex flex-col justify-between bg-[#05050b] text-white urbanist text-[17px] font-medium min-h-full lg:w-80 max-w-64 p-4 ">
            <div className="logolinks">
              <Link to='/'><img src={siteLogo} className="p-6 mb-6 lg:mb-9" alt="" /></Link>
              <ul className="space-y-3">
                {/* Sidebar content here */}
                {links}
              </ul>

               <div className="mt-3 lg:mt-96">
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-[#211f54] to-[#4d4ba1] text-white px-5 py-2 lg:py-3 rounded-full font-semibold text-sm tracking-wide shadow-md hover:scale-105 transition duration-200"
              >
                Back To Home
              </Link>
            </div>
            </div>
           
            <div className="admin-info flex flex-col lg:flex-row items-center gap-5 p-3 rounded-2xl hover:bg-[#19191e] hover:rounded-md' ">
              
              <img
                className="w-12 h-12 rounded-full"
                src={user?.photoURL}
                alt=""
              />
              <h3>{user?.displayName}</h3>
            </div>
          </div>
        </div>
      </div>
      {/* mobile responsive dashboard layout */}
    </div>
  );
};

export default DashBoardLayout;
