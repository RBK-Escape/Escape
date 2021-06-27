import React from 'react';
import '../../userAccount.css'
import {Link} from 'react-router-dom';
import Post from './Post.js';
// import ViewPost from './viewPost.js';
import { useHistory } from "react-router-dom";


function UserAccount(props) {
  let history = useHistory();

if(!props.id.auth) {
    
    return (
    <div className="container__account"> 
    <div className="form__account">
    <img className="img__conatiner" src="https://i.pinimg.com/originals/17/77/65/177765d7905a93daeb7d2f2e08023203.gif" alt='gif' />
    <div className=".text__container"><p >Create an account or log in to continue.</p></div>
    <Link to='/SigIn'><button className="btn__account">Create an account</button></Link>
    </div>
    </div>)
}
    return (
        <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <div className="collapse navbar-collapse" id="navbarButtonsExample">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 marg sm">
       <div><i className="fa fa-sign-out" onClick={()=> history.go(0)}></i>Log out</div> 
      </ul>
      <div className="d-flex align-items-center marg">
        <Link to ='/post' >
            <button type="button" className="btn btn-outline-danger">
          Post An Equipment
        </button>
        </Link>
        <Link to='/postblog'>
        <button type="button" className="btn btn-outline-danger">
          Share Your Adventure
        </button>
        </Link>
        <Link to='/viewPost'>
        <button type="button" className="btn btn-outline-danger">
          View Post
        </button>
        </Link>
      </div>
    </div>
  </div>
</nav>
<Post id={props.id}/>      
</>
    )
}


export default UserAccount;