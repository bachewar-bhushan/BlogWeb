import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <>
      <div className="card w-[75vw] my-9 border border-gray-100 bg-slate-200 rounded shadow-md">
        <div className="card-body m-4">
          <Link to={`/blog/${props.blog._id}`}>
            <h5 className="card-title text-3xl hover:underline font-bold">{props.blog.title}</h5>
          </Link>
          <br />
            <hr className="bg-black h-[1.5px]" />
          <br />
          <p className="card-text">{props.blog.blog.split(/\s+/).slice(0,100).join(' ')}...</p>
        </div>
      </div>
    </>
  );
};

export default Card;
