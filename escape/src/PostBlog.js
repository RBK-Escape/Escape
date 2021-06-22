import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PostBlog = () => {
    const [place, setPlace] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('')
useEffect(() =>{
    axios.post(`http://localhost:3001/api/${resourceType}`, 
    place(setPlace),
    image(setImage),
    description(setDescription)
    ).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    })
})
    return (
        <div>
            <span>Write The Place Name</span>
            <input type='text' placeholder='Place' onChange={(event) => {
          setPlace(event.target.value)}}/>
            <span>Put This Area Image Here</span>
            <input type='text' placeholder='Photo'  onChange={(event) => {
          setImage(event.target.value)}}/>
            <span>Share With Us Your Experience In this Area</span>
            <input type='text' placeholder='Description' onChange={(event) => {
          setDescription(event.target.value)}}/><br></br><br></br>
            <button>Post</button>
        </div>
    )
}

export default PostBlog;