import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import './auth.css'
function Signin() {

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
            console.log(res.data);
          });
      };


  return (
    <form>
      <h3>Sign In</h3>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange ={ (e) => {
          setemail(e.target.value)
          }}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange ={ (e) => {
          setpassword(e.target.value)
          }}
        />
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <button 
      type="submit"
      className="btn btn-primary btn-block"
      onClick={signin}
      >
        Sign In
      </button>
      <p className="forgot-password text-right"></p>
    </form>
  );
}
export default Signin;
