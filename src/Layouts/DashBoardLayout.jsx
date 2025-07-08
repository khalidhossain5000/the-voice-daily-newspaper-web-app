import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Outlet } from "react-router";
const DashBoardLayout = () => {
    const links =<>
    <li><NavLink to='/dashboard/all-users'>All users</NavLink></li>
    <li><NavLink to='/dashboard/all-articles'>All Articles</NavLink></li>
    <li><NavLink to='/dashboard/add-publisher'>All Publisher</NavLink></li>
    </>
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-center">
          {/* Page content here */}
          <div>
            <Outlet></Outlet>
          </div>

          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <GiHamburgerMenu size={30} className="mx-3" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full lg:w-80 max-w-80 p-4">
            {/* Sidebar content here */}
            {links}
          </ul>
        </div>
      </div>
      {/* mobile responsive dashboard layout */}
     
    </div>
  );
};

export default DashBoardLayout;
