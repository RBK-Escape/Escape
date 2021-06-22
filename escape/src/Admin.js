import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
            <Nav className="navbar navbar-dark bg-secondary">
                <Link to="/" className="navbar-brand" > <a>Home</a> </Link>
                <Link to="/store" className="navbar-brand" > <a> Store </a> </Link>
            </Nav>


            {console.log("test here ", data)}

            <div id="adminFeed">{data.length && data.map((post) => {

                return <div className="AdminPost" >
                    {console.log("test")}
                    <img className="card-img-top" src={post.image} alt="Card image" id="imagePreviewAdmin" />
                    <div className="card-body">

                        <h5 className="card-title">Title: {post.name}</h5>
                        <p className="card-text">Description: {post.description}</p>
                        {post.priceSell && <div> Selling price: {post.priceSell} dt</div>}
                        {post.priceRent && <div> Renting price: {post.priceRent} dt/day</div>}
                        <div> Post status: {post.status} </div>
                        <button type="button" class="btn btn-success" onClick={() => acceptPost(post.id)}>Accept post</button>
                        <button type="button" class="btn btn-danger" onClick={() => deletePost(post.id)}>Delete post</button>

                    </div>
                </div>


            })}</div>



        </div>

    )
}




export default Admin;