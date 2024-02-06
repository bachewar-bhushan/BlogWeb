import React, { useContext, useEffect, useState} from "react";
import BlogContext from "../context/BlogContext";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const UpdateBlog = () => {
  const { id } = useParams();
  const context = useContext(BlogContext);
  const { updateblog, fetchParticularBlog, particularBlog } = context;

  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");



  useEffect(()=>{
    fetchParticularBlog(id);
  },[])

  useEffect(() => {
    if (particularBlog) {
      setTitle(particularBlog.title || ''); // Ensure it's not undefined
      setBlogContent(particularBlog.blog || ''); // Ensure it's not undefined
  }
}, [particularBlog]);

  const handleUpdateButton = async (e) => {
    e.preventDefault();
    const newTitle = title
    const newBlog = blogContent

    const response = await updateblog(id, newTitle, newBlog);

    if(response.status === 201){
        setSubmitStatus("success");
        setSubmitMessage(response.msg);
    } else {
        setSubmitStatus("error");
        setSubmitMessage(response.error);
      }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="flex justify-center flex-col items-center">
          <form
            className="mt-9 w-[90vw] rounded-xl bg-slate-300 flex flex-col items-center"
            onSubmit={handleUpdateButton}
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
                type="title"
                className="w-[85vw] h-[40px] rounded-md px-4 text-lg bg-slate-100"
                id="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
              />
            </div>
              <button type="submit" onClick={handleUpdateButton} className="w-[150px] h-[50px] rounded-md bg-[#145dbb] opacity-80 font-bold m-2 hover:bg-[#5d99e7] cursor-pointer text-xl">
                Update Blog
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

export default UpdateBlog;
