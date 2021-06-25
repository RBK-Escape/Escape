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
    <div >
    <form className="sign-up-form ss">
      <h2 className="title-s">Sign Up</h2>

      <div className="input-field-s">
        <i className="fas fa-user"></i>
        <input 
        type="text" 
        className="form-control" 
        placeholder="Full name" 
        onChange ={ (e) => {
        setfullname(e.target.value)
        }}/>
      </div>

      <div className="input-field-s">
      <i className="fa fa-envelope"></i>
        
        <input
          type="email"
          className="form-control"
          placeholder="Email address"
          onChange ={ (e) => {
          setemail(e.target.value)
          }}
        />
      </div>

      <div className="input-field-s">
      <i className="fas fa-user"></i>
        <input
          type="phone"
          className="form-control"
          placeholder="Phone number"
          onChange ={ (e) => {
          setphone(e.target.value)
          }}
        />
      </div>

      <div className="input-field-s">
      <i className="fa fa-mobile"></i>
        <input type="address" 
        className="form-control" 
        placeholder="Address" 
        onChange ={ (e) => {
        setadress(e.target.value)
        }}
        />
      </div>

      <div className="input-field-s">
      <i className="fas fa-lock"></i>
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
      className="btn-s"
      id="sign-up-btn"
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


