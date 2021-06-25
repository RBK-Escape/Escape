import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ViewPost = (props) => {
    const [viewPosts, setViewPosts] = useState([]);
    const [ressource, setRessource] = useState('');
    
    useEffect(( )=> {
        axios.get(`http://localhost:3001/api/viewpost/${props.id.id}/${ressource}`).then((result) => {
                setViewPosts(result.data);
             
            
        })
    }, [props.id.id, ressource])

    
    const deletePost = (id) => {
        axios.delete(`http://localhost:3001/api/deletePostByUser/${id}/${ressource}`).then((result) => {
            console.log(viewPosts);
        })
    }
    const handledlete = (id) => {
        deletePost(id);
    }

  

    return (
        <>
        <main>
                <section className="equipment section">
                    <div className="title">
                        <h2>Welcome To Your Escape Room</h2>
                        <div className="btn-container">
                            <button type="button" className="filter-btn space" onClick={() => setRessource('posts')}>All Posts</button>
                            <button type="button" className="filter-btn space" onClick={() => setRessource('blogs')}>All Blogs</button>    
                        </div>
                        <div className="underline"></div>
                    </div>
                    <div className="section-center">
                        {!ressource.length ? <div className="container__view__post__s"> <p>Say cheese</p> <img  src="https://i.pinimg.com/originals/09/df/30/09df30f765d088be030da204f2e7ec32.gif"alt="hahagif"/></div>: ''}
                        {  typeof viewPosts === "object" ?
                            viewPosts.map((post, key) => {
                                return (
                                    <div key={post.id}>
                                        <article className="eq-item">
                                            <img src={post.image} alt="post" className="photo" />
                                            <div className="item-info" >
                                                <header>
                                                    <h4>{post.name} </h4>
                                                    {
                                                        ressource === "posts"? <h4 className="price">  TDN {post.price}</h4> : <h4> {post.place}</h4>
                                                    }
                                                </header>
                                                { ressource === "posts"?  <p className="item-tex">{post.description}</p>:  <p className="item-tex">{post.experience}</p> }
                                                <p> Status : {post.status}</p>
                                                <button type="button" class="btn btn-danger m-4" onClick={()=> {handledlete(post.id); setViewPosts(viewPosts.filter(item=>item.id !==post.id)) ; 
                                                }} >Delete</button>
                                            </div>
                                        </article>
                                    </div>
                                )
                            }) :  ( <> <div className="container__view__post__s"><p> No Post In View </p>  <img src="https://media4.giphy.com/media/26xBHIOYHnNMGpUPK/giphy.gif?cid=790b76114f92609f13834af0d698d0edc7c93d2940c5fd5a&rid=giphy.gif&ct=g" alt="giy" /> </div></>)
                        }
                    </div>
                </section>
            </main>
        </>
        
    )

}

export default ViewPost;