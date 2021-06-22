import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import './App.css';


function Post() {

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [condition, setCondition] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")  // fileinputstate
    const [sell, setSell] = useState("")
    const [rent, setRent] = useState("")
    const [previewImage, setPreveiwImage] = useState("")

    console.log(title, category, description, condition, price, image, sell, rent)

    const onSubmit = (e) => {
        e.preventDefault();
        if (!previewImage) return;
        uploadImage(previewImage)

    }

    const uploadImage = (base64EncodedImage) => {

        axios.post("http://localhost:3001/api/upload", {
            data: base64EncodedImage, title: title, category: category,
            description: description, condition: condition, price: price, sell: sell, rent: rent
        }).then(result =>

            console.log(result.data))


    }

    const handleImageSubmit = (e) => {
        const file = e.target.files[0]
        previewImageFile(file)
    }

    const previewImageFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreveiwImage(reader.result)
        }
    }


    return (
        <div className="post">
            <h4>Create your post here</h4>
            <Form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <input className="form-control" onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input className="form-control" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Condition</label>
                    <input className="form-control" onChange={(e) => setCondition(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>The product is </label>
                </div>
                <div className="btn-group btn-group-toggle" data-toggle="buttons" >
                    <label className="btn btn-secondary active">
                        <input type="radio" name="options" id="option1" value={""} autoComplete="off" onChange={(e) => {
                            setRent("rent")
                            setSell("")
                        }} /> for rent
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option2" value={""} autoComplete="off" onChange={(e) => {
                            setSell("sell")
                            setRent("")
                        }} /> for sell
                    </label>
                </div>

                <div className="form-group">
                    <label>price</label>
                    <input className="form-control" type="number" onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label className="form-label">Upload image</label>
                    <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={handleImageSubmit} value={image} />
                </div>
                <Button variant="success" type="submit">Submit</Button>
            </Form>
            {previewImage && (
                <img src={previewImage} alt="chosen" id="imagePreview" />
            )}
        </div>

    )

}


export default Post;