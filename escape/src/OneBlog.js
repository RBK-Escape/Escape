import React from "react";
import moment from "moment";
import reactHtmlParser from 'react-html-parser';

function OneBlog(props) {
  console.log(props.blog)
  return (
    <div className="post">

      <h1 className="post-title">{props.blog.place}</h1>
      <div><span className="post-byline-author">
        {moment().startOf("hour").fromNow()}
      </span></div>
      {console.log(props.blog)}

      <img src={props.blog.image} alt="blog" className="post-image" />
      {/* {props.blog.description.map((paragraph, index) => (
        <p key={index}>{reactHtmlParser(paragraph)}</p>
      ))} */}
      <p>{props.blog.experience}</p>


    </div>
  );
}
export default OneBlog;
