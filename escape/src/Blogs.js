import React,{useState, useEffect} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const Blogs = () => {
 const [blogs, setBlogs] = useState([])
  useEffect(() => {
      axios.get('/blogs').then((result) => {
        setBlogs(result.data)
      }).catch((err) => {
          console.log(err);
      })
    }) 
 return (
        <div>
            <div>
                {blogs.map((blog) => {
                   
                    <div>
                         <h1>{blog.place}</h1>
                         <img src={blog.image} alt='' />
                         <p>{blog.experience}</p>
                    </div>
                                 
})
}
            </div>
            <button>
            <Link to="/postBlog">Post Your Blog</Link>
            </button>
        </div>
    )
}
export default Blogs;
