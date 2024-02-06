import BlogContext from "./BlogContext";
import React, { useState } from "react";

const BlogState = (props) => {
    const host = "http://localhost:5000";
    const [blogs, setBlogs] = useState([]);
    const [userBlogs, setUserBlogs] = useState([])
    const [particularBlog, setParticularBlog] = useState([])

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${host}/fetchblogs`);
            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }
            const blogs_fetched = await response.json();
            setBlogs(blogs_fetched);
        } catch (error) {
            console.error("Error fetching blogs:", error.message);
        }
    };

    const deleteblog = async (id) => {
        const response = await fetch(`${host}/deleteblog/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth_token": localStorage.getItem("token"),
            }
        });
        const json = response.json();
        const newblog = blogs.filter((blog) => { return blog.id !== id })
        setBlogs(newblog)
    }

    const addblog = async (title, blog) => {
        const authToken = localStorage.getItem("token")
        const response = await fetch(`${host}/addblog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth_token": authToken,
            },
            body: JSON.stringify({ title:title, blog:blog}),
        });

        const res = await response.json();
        setBlogs(blog.concat(res.blog));
        const resToUser = {
            status : response.status,
            msg : res.msg,
            error: res.errors ? res.errors[0].msg : undefined
        }
        return resToUser;
    };

    const updateblog = async (id, newTitle, newBlog) => {
        try {
            const response = await fetch(`${host}/updateblog/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth_token": localStorage.getItem("token"),
                },
                body: JSON.stringify({title: newTitle, blog: newBlog }),
            });
    
            let newBlogs = blogs
            for (let i = 0; i < newBlogs.length; i++) {
                const element = newBlogs[i];
                if (element._id === id) {
                    newBlogs[i].title = newTitle;
                    newBlogs[i].blog = newBlog;
                    break;
                }
            }
            setBlogs(newBlogs);

            const res = await response.json();
            const resToUser = {
                status : response.status,
                msg : res.msg,
                error: res.errors ? res.errors[0].msg : undefined,
            }
            return resToUser;

        } catch (error) {
            console.error("Error updating blog:", error);
        }
        
    }

    const fetchBlogsUser = async () => {
        try {
          const response = await fetch(`${host}/fetchblogsuser`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth_token": localStorage.getItem("token"),
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch blogs");
          }
          const blogs_user = await response.json();
          setUserBlogs(blogs_user);
        } catch (error) {
          console.error("Error fetching blogs:", error.message);
        }
      };

      const fetchParticularBlog = async (id) => {
        try {
            const response = await fetch(`${host}/fetchParticularBlog/${id}`,);
            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }
            const blog_fetched = await response.json();
            setParticularBlog(blog_fetched);
        } catch (error) {
            console.error("Error fetching blogs:", error.message);
        }
    };

    return (
        <BlogContext.Provider value={{ blogs, addblog, deleteblog, updateblog, fetchBlogs, fetchBlogsUser, userBlogs, fetchParticularBlog, particularBlog}}>
          {props.children}
        </BlogContext.Provider>
      )
}

export default BlogState;