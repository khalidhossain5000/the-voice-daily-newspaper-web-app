import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink, Outlet } from "react-router";
import siteLogo from "../assets/logo/footer-logo.webp";

const MyProfileLayout = () => {
  
  const handleDrawerClose = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  const links = (
    <>
      <li>
        <NavLink to="/my-profile" onClick={handleDrawerClose}>
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-profile/my-articles" onClick={handleDrawerClose}>
          My Articles
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-profile/update-profile" onClick={handleDrawerClose}>
          Update Profile
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
          <div className="w-full overflow-x-hidden ">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          
          {/* bg-[#0093f0] */}
          <div className=" poppins menu flex flex-col justify-between bg-[#05050b] text-white urbanist text-[17px] font-medium min-h-full lg:w-80 max-w-64 p-4 ">
            <div className="logolinks">
              <Link to="/">
                <img src={siteLogo} className="p-6 mb-6 lg:mb-9" alt="" />
              </Link>
              <ul className="space-y-3">
                {/* Sidebar content here */}
                {links}
              </ul>

              
            </div>

            <div>
              <div className="mt-3 lg:mt-96">
                <Link
                  to="/"
                  className="inline-block bg-gradient-to-r from-[#211f54] to-[#4d4ba1] text-white px-5 py-2 lg:py-3 rounded-xl font-semibold text-md tracking-wide shadow-md hover:scale-105 transition duration-200"
                >
                  Back To Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile responsive dashboard layout */}
    </div>
  );
};

export default MyProfileLayout;
