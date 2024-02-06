import React, {useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import BlogContext from '../context/BlogContext'
import Navbar from '../components/Navbar'

const Blog = () => {
    const { id } = useParams()
    const context = useContext(BlogContext)
    const { fetchParticularBlog, particularBlog } = context

    useEffect(() => {
      fetchParticularBlog(id);
    },[])

    
  return (
    <>
      <Navbar/>
      <header className="header bg-slate-400 h-36 flex justify-between px-4 pl-9">
        <div className="font-extrabold text-[50px] left-[250px] top-[100px] absolute lg:left-[500px] md:left-[300px] xl:left-[500px] 2xl:left-[600px]">
            {particularBlog.title}
        </div>
        </header>
        <div className='flex justify-center items-center'>
        <div className="items-center w-[90vw] my-9 border border-gray-100 rounded shadow-md">
          <p className="m-7 whitespace-pre-line">{particularBlog.blog}</p>
      </div>
      </div>
    </>
  )
}

export default Blog