const express = require("express");
const router = express.Router();
const Blog = require("../models/Blogs");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

router.get("/fetchblogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post(
  "/addblog",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("blog", "Blog must be atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, blog } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const blogs = new Blog({
        title,
        blog,
        user: req.user.id,
      });
      const savedBlog = await blogs.save();

      res.status(201).json({ blog: savedBlog, msg: "Blog saved successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }
);

router.put(
  "/updateblog/:id",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("blog", "Blog must be atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, blog } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newBlog = {};
      if (title) {
        newBlog.title = title;
      }
      if (blog) {
        newBlog.blog = blog;
      }

      let blogs = await Blog.findById(req.params.id);
      if (!blogs) {
        return res.status(404).json({ errors: "Not Found" });
      }

      if (blogs.user.toString() !== req.user.id) {
        return res.status(401).json({ errors: "Not Allowed" });
      }
      blogs = await Blog.findByIdAndUpdate(
        req.params.id,
        { $set: newBlog },
        { new: true }
      );
      res
        .status(201)
        .json({ newBlogs: blogs, msg: "Blog updated successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ erros: "Internal Server Error" });
    }
  }
);

router.delete("/deleteblog/:id", fetchuser, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Not Found");
    }

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const blogs = await Blog.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", blogs: blogs });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/fetchblogsuser", fetchuser, async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });
    res.send(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/fetchParticularBlog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.send(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
