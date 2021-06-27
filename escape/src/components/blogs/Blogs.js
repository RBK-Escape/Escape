import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import OneBlog from "./OneBlog.js";
import "../../blogs.css";

const Blogs = (props) => {
  const [blog, setBlog] = useState({});
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
      <div className="feed">
        <ul>
          {blogs.map((blog) => {
            return (

              <li className="feed-list-item">
                {console.log(blog)}
                <h1
                  className="feed-list-item-title"
                  onClick={() => props.setBlog(blog)}
                >
                  <Link to="/oneblog">{blog.place}</Link>
                </h1>
                <span className="feed-list-item-byline-author">
                  {moment().startOf("hour").fromNow()}
                </span>
                <img
                  src={blog.image}
                  alt="blog"
                  className="feed-list-item-image"
                  onClick={() => props.setBlog(blog)}
                />
                <p className="feed-list-item-lede" onClick={() => props.setBlog(blog)}>{blog.experience.split("\n")[0]}...</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Blogs;
