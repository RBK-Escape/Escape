import React, { useState, useEffect } from 'react';
import { Nav, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

function AdminBlog() {
    const [blog, setBlog] = useState({ blog: [] });
    async function fetchBlog() {
        const result = await axios(
            "http://localhost:3001/admin/blog",
        );

        setBlog(result.data)
    }
    useEffect(() => {

        fetchBlog()

    }, []);


    const acceptBlog = (id) => {
        axios.patch(`http://localhost:3001/admin/blog/patch/${id}`)
            .then((result) => {
                console.log(result)
                fetchBlog()
            })
            .catch(err =>
                console.log(err))

    }

    const deleteBlog = (id) => {
        axios.delete(`http://localhost:3001/admin/blog/delete/${id}`)
            .then((result) => {
                console.log(result)
                fetchBlog()
            })
            .catch(err =>
                console.log(err))

    }



    return (
        <div>
            <Link to='/Admin' style={{ textDecoration: 'none' }}>
                <div className="button">
                    <span>Back to posts</span>
                </div>
            </Link>


            <div id="adminFeed">{blog.length && blog.map((blog) => {

                return <div className="AdminPost" >
                    {console.log("test")}
                    <img className="card-img-top" src={blog.image} alt="Card image" id="imagePreviewAdmin" />
                    <div className="card-body">

                        <h5 className="card-title">Title: {blog.place}</h5>
                        <p className="card-text">{blog.experience}</p>
                        <p className="card-text">Author: {blog.name}</p>
                        <div> blog status: {blog.status} </div>
                        <button type="button" class="btn btn-success" onClick={() => {
                            acceptBlog(blog.id)
                            Swal.fire(
                                'Done!',
                                'You accepted this blog!',
                                'success'
                            )
                        }}>Accept blog</button>
                        <button type="button" class="btn btn-danger" onClick={() => {
                            deleteBlog(blog.id)
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'This blog is deleted !',
                            })
                        }}>Delete blog</button>

                    </div>
                </div>


            })}</div>



        </div>

    )
}



export default AdminBlog;