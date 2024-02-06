import React, { useContext, useEffect, useState } from 'react'
import BlogContext from '../context/BlogContext'
import Header from '../components/Header'
import Card from '../components/Card'
import Navbar from '../components/Navbar'

const Home = () => {
  const context = useContext(BlogContext)
  const { blogs, fetchBlogs } = context
  const [updatedBlogs, setUpdatedBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (Array.isArray(blogs)) {
      setUpdatedBlogs([...blogs].reverse());
    }
  }, [blogs]);
  return (
    <>
      <Navbar/>
      <Header img={'src/assets/home.png'} title="BlogWeb"/>
      <div className='flex justify-center items-center flex-col'>
      {Array.isArray(updatedBlogs) && updatedBlogs.map((blog) => (
          <Card key={blog._id} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default Home
