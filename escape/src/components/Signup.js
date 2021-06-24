// eslint-disable-next-line
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import './auth.css'
function SignUp() {
  const [fullname, setfullname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState(null);
  const [adress, setadress] = useState("");

  const signup = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:3001/signup", {
        fullname,
        password,
        email,
        phone,
        adress,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className='signup'>
    <form>
      <h3>Sign Up</h3>

      <div className="form-group">
        <label>Full name</label>
        <input 
        type="text" 
        className="form-control" 
        placeholder="Full name" 
        onChange ={ (e) => {
        setfullname(e.target.value)
        }}/>
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email address"
          onChange ={ (e) => {
          setemail(e.target.value)
          }}
        />
      </div>

      <div className="form-group">
        <label>Phone number</label>
        <input
          type="phone"
          className="form-control"
          placeholder="Phone number"
          onChange ={ (e) => {
          setphone(e.target.value)
          }}
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input type="address" 
        className="form-control" 
        placeholder="Address" 
        onChange ={ (e) => {
        setadress(e.target.value)
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

      <button 
      type="submit" 
      className="btn btn-primary btn-block"
      onClick={signup}
      >
        Sign Up
      </button>
      <p className="forgot-password text-right"></p>
    </form>
    </div>
  );
}
export default SignUp;
