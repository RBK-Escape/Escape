import React, { useState, useEffect } from "react";
import axios from "axios";
import './postBlog.css';

const PostBlog = () => {
  const [resourceType, setresourceType] = useState("/postBlog");
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [submit, setSubmit] = useState({
    place: "",
    image: "",
    description: "",
  });
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  // const postRequest = () => {
  //   axios
  //     .post("http://localhost:3001/api/postblog", {
  //       place: place,
  //       image: image,
  //       description: description,
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    uploadImage(previewSource);
  };
  const uploadImage =(base64EncodedImage) => {
      axios.post("http://localhost:3001/api/postblog", {
        data: base64EncodedImage , place: place, description: description
      }).then(result => console.log(result)) 
    } 
  return (
    <div className="create">
      <div className="create-editor">
        <form onSubmit={handleSubmitFile}>
          <span>Write The Place Name</span>
          <input
            id="title"
            className="create-input"
            type="text"
            placeholder="Place"
            // onChange={(event) => {
            //   setPlace(event.target.value);
            // }}
            onChange={handleFileInputChange}
            value={place}
          />
          <span>Put This Area Image Here</span>
          <input
            id="imageUrl"
            className="create-input"
            type="text"
            placeholder="Photo"
            // onChange={(event) => {
            //   setImage(event.target.value);
            // }}
            onChange={handleFileInputChange}
            value={image}
          />
          <p>Or Just Upload It From Here If You Have Already In Your Device</p>
          <input
            id="imageUrl"
            className="create-input"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
          />
          <span>Share With Us Your Experience In this Area</span>
          <input
            className="create-body-textarea"
            type="text"
            placeholder="Description"
            // onChange={(event) => {
            //   setDescription(event.target.value);
            // }}
            onChange={handleFileInputChange}
            value={description}
          />
          <br></br>
          <br></br>
          <button
            onClick={() => {
              uploadImage();
            }}
            variant="success"
            type="submit"
          >
            Post
          </button>
        </form>
        {previewSource && <img src={previewSource} alt="chosen" />}
      </div>
    </div>
  );
};

export default PostBlog;
