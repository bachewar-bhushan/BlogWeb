import React, { useContext, useState } from "react";
import BlogContext from "../context/BlogContext";
import Navbar from "../components/Navbar";

const AddBlog = () => {
  const context = useContext(BlogContext);
  const { addblog } = context;
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleAddButton = async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const blog = document.getElementById("blog").value;

    const response = await addblog(title, blog);
    if (response.status === 201) {
      document.getElementById("title").value = "";
      document.getElementById("blog").value = "";
      setSubmitStatus("success");
      setSubmitMessage(response.msg);
    } else {
      setSubmitStatus("error");
      setSubmitMessage(response.error);
    }
  };
  return (
    <>
    <Navbar/>
      <div>
        <div className="flex justify-center flex-col items-center">
          <form
            className="mt-9 w-[90vw] rounded-xl bg-slate-300 flex flex-col items-center"
            onSubmit={handleAddButton}
            method="post"
            encType="multipart/form-data"
            target="_parent"
          >
            <div className="my-4">
              <label htmlFor="title" className="text-black font-semibold">
                Title :
              </label>
              <br />
              <input
                type="text"
                className="w-[85vw] h-[40px] rounded-md px-4 text-lg bg-slate-100"
                id="title"
                placeholder="Enter the title"
              />
            </div>
            <div className="my-2 overflow-y-auto">
              <label htmlFor="blog" className="text-black font-semibold">
                Blog :
              </label>
              <br />
              <textarea
                type="text"
                className="w-[85vw] h-[55vh] py-2 px-4 text-lg rounded bg-slate-100"
                id="blog"
                placeholder="Blog"
              />
            </div>
              <button type="submit" className="w-[150px] h-[44px] rounded-md bg-[#145dbb] opacity-80 font-bold mx-2 mb-1 hover:bg-[#5d99e7] cursor-pointer text-xl">
                Add Blog
              </button>
            <div>
              {submitStatus === "success" && (
                <div className="grid col-span-1 items-center">
                  <div className="success-message bg-green-400 px-3 rounded-md">
                    {submitMessage}
                  </div>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="error-message bg-red-400 mx-10 px-3 rounded-md">
                  {submitMessage}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
