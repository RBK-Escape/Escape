import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { Nav, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


function Admin() {

    const [data, setData] = useState({ data: [] });
    async function fetchdata() {
        const result = await axios(
            "http://localhost:3001/admin/data",
        );

        setData(result.data)
    }
    useEffect(() => {

        fetchdata()

    }, []);


    const acceptPost = (id) => {
        axios.patch(`http://localhost:3001/admin/patch/${id}`)
            .then((result) => {
                console.log(result)
                fetchdata()
            })
            .catch(err =>
                console.log(err))

    }

    const deletePost = (id) => {
        axios.delete(`http://localhost:3001/admin/delete/${id}`)
            .then((result) => {
                console.log(result)
                fetchdata()
            })
            .catch(err =>
                console.log(err))

    }





    return (
        <div>
            <Link to='/adminBlog' style={{ textDecoration: 'none' }}>
                <div className="button">
                    <span>Inspect Blogs</span>
                </div>
            </Link>


            <div id="adminFeed">{data.length && data.map((post) => {

                return <div className="AdminPost" >
                    {console.log("this is the post", post)}
                    <img className="card-img-top" src={post.image} alt="Card" id="imagePreviewAdmin" />
                    <div className="card-body">

                        <h5 className="card-title">Title: {post.name}</h5>
                        <p className="card-text">Description: {post.description}</p>
                        {post.toSell && <div> Selling price: {post.price} dt</div>}
                        {post.toRent && <div> Renting price: {post.price} dt/day</div>}
                        <div> Post status: {post.status} </div>
                        <button type="button" class="btn btn-success" onClick={() => {
                            acceptPost(post.id)
                            Swal.fire(
                                'Done!',
                                'You accepted this post!',
                                'success'
                            )
                        }}>Accept post</button>
                        <button type="button" class="btn btn-danger" onClick={() => {
                            deletePost(post.id)
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'This post is deleted !',
                            })
                        }}>Delete post</button>

                    </div>
                </div>


            })}</div>
        </div>

    )
}
export default Admin;


