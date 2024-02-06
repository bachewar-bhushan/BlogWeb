import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <header className="header bg-slate-400 h-36 flex justify-between px-4 pl-9">
        <img src={props.img} alt="no img" className="self-start h-[150px]" />
        <div className="font-extrabold text-[50px] left-[250px] top-[100px] absolute lg:left-[500px] md:left-[300px] xl:left-[500px] 2xl:left-[600px]">
            {props.title}
        </div>
        <div className="">
          <Link to={`/addBlog`} className="absolute sm:top-[150px] sm:right-[50px] top-[180px] right-[30px]">
            <button className="bg-[#145dbb] bg-opacity-80 sm:h-[50px] sm:w-[120px] h-[30px] w-[90px] font-semibold rounded-md text-xl">Add Blog</button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
