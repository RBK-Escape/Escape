import React from "react";
import moment from "moment";
import reactHtmlParser from 'react-html-parser';

function OneBlog(props) {
  return (
    <div className="post">
      <h1 className="post-title">{props.blog.place}</h1>
      {console.log(props.blog)}
      <span className="post-byline-author">
        {moment().startOf("hour").fromNow()}
      </span>
      <img src={props.blog.image} alt="blog" className="post-image" />
      {props.blog.experience.split("\n").map((paragraph, index) => (
        <p key={index}>{reactHtmlParser(paragraph)}</p>
      ))}
    </div>
  );
}
export default OneBlog;
