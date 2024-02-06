import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AddBlog from './pages/AddBlog'
import BlogState from './context/BlogState'
import UpdateBlog from './pages/UpdateBlog';
import ViewBlog from './pages/ViewBlog';
import Blog from "./pages/Blog"
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    
    <BlogState>
      <Router>
        <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />  
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/addBlog" element={<AddBlog />} />
        <Route path="/updateBlog/:id" element={<UpdateBlog />} />
        <Route path="/viewBlog" element={<ViewBlog />} />
        <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </Router>
      </BlogState>
    </>
  );
}

export default App;
