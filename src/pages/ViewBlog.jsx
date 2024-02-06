import React, { useContext, useEffect } from "react";
import BlogContext from "../context/BlogContext";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import Navbar from "../components/Navbar";

const ViewBlog = () => {
  const context = useContext(BlogContext);
  const { userBlogs, fetchBlogsUser } = context;

  useEffect(() => {
    // eslint-disable-next-line
    fetchBlogsUser();
  });

  return (
    <>
    <Navbar/>
      <Header img={"src/assets/home.png"} title="Your Blogs" />
      <div className="flex flex-col justify-center items-center">
        {userBlogs.map((blog) => {
          return <UserCard blog={blog} />;
        })}
      </div>
    </>
  );
};

export default ViewBlog;
