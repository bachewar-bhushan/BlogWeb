import React from "react";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  }
  return (
    <>
      <nav className="bg-[#1f1e1e] h-16 shadow-lg">
        <div className="ml-4 mr-4 pt-4 flex justify-between">
          <div className="text-[#fffffa] text-xl h-28"><img className="size-12" src="/src/assets/logonav.png" alt="" /></div>
          <div>
            <ul className="flex space-y-4 justify-center space-x-6 items-baseline">
              <li className="text-[#fffffa]  text-[12px] sm:text-lg">
                <Link aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="text-[#fffffa]  text-[12px] sm:text-lg">
                <Link aria-current="page" to="/viewBlog">
                  View Your Blogs
                </Link>
              </li>
              <li className="text-[#fffffa]  text-[12px] sm:text-lg">
                <Link aria-current="page" to="/signin" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
