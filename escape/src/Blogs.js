import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./blogs.css";

const Blogs = () => {
  const [resourceType, setresourceType] = useState("blogs");
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/${resourceType}`)
      .then((result) => {
        console.log(result, "blooooooooooogs");
        setBlogs(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [resourceType]);
  return (
    <div>
      <div>
        {blogs.map((blog) => {
          return(
          <div>
            <h1>{blog.place}</h1>
            <img src={blog.image} alt="blog" />
            <p>{blog.experience}</p>
          </div>
          )
        })}
      </div>
      <button>
        <Link to="/postBlog">Post Your Blog</Link>
      </button>
    </div>
  );
};
export default Blogs;
