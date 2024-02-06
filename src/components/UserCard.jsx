import React, { useContext } from "react";
import BlogContext from "../context/BlogContext";
import { Link } from "react-router-dom";

const Card = (props) => {
  const context = useContext(BlogContext);
  const { deleteblog } = context;

  return (
    <>
      <div className="card w-[75vw] m-9 border">
        <div className="m-4  h-[330px]">
          <div className="m-4">
          <h5 className="mx-2 text-2xl font-bold">{props.blog.title}</h5>
          </div>
          <div className="h-[300px] overflow-auto m-4 border rounded-md">
          <p className="p-4 ">{props.blog.blog}</p>
          </div>
          
        </div>
        <div className="m-6">
        <button onClick={() => deleteblog(props.blog._id)} className="w-[77px] h-[41px] rounded-md bg-[#145dbb] opacity-80 font-bold m-2">Delete</button>
          <Link to={`/updateBlog/${props.blog._id}`}>
            <button className="w-[77px] h-[41px] rounded-md bg-[#145dbb] opacity-80 font-bold m-2">Edit</button>
          </Link>
          </div>
      </div>
      
    </>
  );
};

export default Card;
