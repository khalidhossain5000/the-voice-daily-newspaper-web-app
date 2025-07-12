import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("Log out success");
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
        <NavLink to='/subscription'>Subscription</NavLink>
      </li>
      <li>
        <NavLink to='/dashboard'>DashBoard(C)</NavLink>
      </li>
      <li>
        <NavLink>My Articles</NavLink>
      </li>
      <li>
        <NavLink to='/premium-articles'>Premium Articles(C)</NavLink>
      </li>
      <li>
        <NavLink to='/allArticles'>All Articles(C)</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-red-300   py-3">
      <div className="hidden md:flex items-center">
        <div className="links max-w-7xl mx-auto">
          <ul className="flex items-center gap-3">{links}</ul>
        </div>
        <div className="auth max-w-7xl mx-auto">
          {user ? (
            <div className="flex items-center gap-6">
              
                <NavLink to='/my-profile-layout/my-profile'>
                  <img
                    src={user?.photoURL}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                </NavLink>
              
              <button onClick={handleLogOut} className="btn btn-warning btn-md">
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
                <button
                  onClick={handleLogOut}
                  className="btn btn-warning btn-sm"
                >
                  Log Out
                </button>
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
