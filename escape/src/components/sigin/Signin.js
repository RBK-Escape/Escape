// eslint-disable-next-line
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
// import UserAccount from "../userAccunt/UserAccount.js";

import '../../auth.css'



function Signin(props) {

  let history = useHistory();

  console.log("singin", props)


  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signin = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:3001/signin", {
        email,
        password
      })
      .then((res) => {
        if ( !res.data.auth ) {
          Swal.fire('Oops...', res.data.message, '!')
        } else {
          props.setId({id: res.data.id , auth: true, type: res.data.type});
        }
        console.log("helloooo", res.data)
      });
  };

  console.log("id here", props.id)
    if (props.id.auth ) {
      if (props.id.type === null) {
      history.push("/UserAccount");
    } else  {
      history.push("/Admin");
    }
  }
  return (
    <>
    <div >
      <form className='sign-in-form ss'>
        <h2 className="title-s">Sign In</h2>

        <div className="input-field-s">
          <i className="fas fa-user"></i>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => {
              setemail(e.target.value)
            }}
          />
        </div>

        <div className="input-field-s">
        <i className="fas fa-lock"></i>

          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => {
              setpassword(e.target.value)
            }}
          />
        </div>

        <button 
          type="submit"
          className="btn-s" id="sign-in-btn"
          onClick={signin}
        >
          Sign In
        </button>
      </form>
      <br />
    </div>
    </>
  );
}
export default Signin;





