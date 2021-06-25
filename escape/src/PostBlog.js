import React, { useState, useEffect } from "react";
import axios from "axios";
import './postBlog.css';
import Swal from 'sweetalert2'

function PostBlog(props) {
  // const [resourceType, setresourceType] = useState("/postBlog");
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  // const [submit, setSubmit] = useState({
  //   place: '',
  //   image: '',
  //   description: '',
  // });
  const postRequest = () => {
    axios
      .post("http://localhost:3001/api/postblog", { place: place, image: image, description: description, id: props.id })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <span>Write The Place Name</span>
      <input
        type="text"
        placeholder="Place"
        onChange={(event) => {
          setPlace(event.target.value);
        }}
      />
      <span>Put This Area Image Here</span>
      <input
        type="text"
        placeholder="Photo"
        onChange={(event) => {
          setImage(event.target.value);
        }}
      />
      <span>Share With Us Your Experience In this Area</span>
      <input
        type="text"
        placeholder="Description"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <br></br>
      <br></br>
      <button onClick={() => {
        postRequest()
        Swal.fire(
          'Done!',
          'Your post status is pending! it will be accepted once it is checked',
          'success'
        )
      }} variant="success" type="submit">
        Post
      </button>
    </div>
  );
};

export default PostBlog;
