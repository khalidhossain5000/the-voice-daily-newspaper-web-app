import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import useRole from "../../Hooks/useRole";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useRole();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Log Out Success",

          icon: "success",

          buttonsStyling: false,
          color: "black",
          customClass: {
            popup: "error-gradient-bg",
            confirmButton:
              "bg-gradient-to-r from-yellow-500 text-black  to-amber-600 hover:bg-red-200  text-black font-semibold px-6 py-2 rounded-sm shadow-md  cursor-pointer",
            cancelButton:
              "bg-yellow-600 ml-3 text-xl text-black cursor-pointer hover:bg-yellow-500 font-bold px-6 py-2 rounded-xl",
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      {!roleLoading && role === "admin" && (
        <li>
          <NavLink to="/dashboard">Dashboard (C)</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/my-articles">My Articles</NavLink>
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
    <div className="bg-white py-6 shadow-xl">
      <div className="hidden md:flex items-center">
        <div className="links max-w-7xl mx-auto">
          <ul className="flex items-center gap-3 text-[17px] font-semibold text-[#0b0f32] inter">
            {links}
          </ul>
        </div>
        <div className="auth max-w-7xl mx-auto">
          {user ? (
            <div className="flex items-center gap-6">
              <NavLink to="/my-profile">
                <img
                  src={user?.photoURL}
                  className="w-12 lg:w-16 lg:h-16 h-12 rounded-full"
                  alt=""
                />
              </NavLink>

              <button
                onClick={handleLogOut}
                className="px-6 py-3 urbanist text-white rounded-sm shadow-xl font-bold text-xl bg-[#04c018] hover:bg-[#04c01810] hover:text-black cursor-pointer btn-md"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/auth/login" className="btn btn-md btn-success">
              Login
            </Link>
          )}
        </div>
      </div>
      {/* MOBILE DRAWER STARTS */}
      <div className="drawer drawer-end md:hidden z-[9999]  ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button">
            <GiHamburgerMenu size={30} className="mx-3" />
          </label>
        </div>
        <div className="drawer-side  ">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex flex-col justify-between min-h-full w-80 bg-base-200 max-w-[300px] p-4">
            <div>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {links}
              </ul>
            </div>
            <div className="">
              {user ? (
                <div className="flex items-center gap-6">
                  <NavLink to="/my-profile">
                    <img
                      src={user?.photoURL}
                      className="w-12 lg:w-16 lg:h-16 h-12 rounded-full"
                      alt=""
                    />
                  </NavLink>

                  <button
                    onClick={handleLogOut}
                    className="px-6 py-3 urbanist text-white rounded-sm shadow-xl font-bold text-xl bg-[#04c018] hover:bg-[#04c01810] hover:text-black cursor-pointer btn-md"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <Link to="/auth/login" className="btn btn-md btn-success">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
