// eslint-disable-next-line
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import UserAccount from "../UserAccount.js";


import './auth.css'



function Signin(props) {

    let history = useHistory();



    // useEffect(() => {
    //   if (props.id !== "") {
    //     history.push("/UserAccount");
    //   }
    // }, [])

    console.log("singin", props)


    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [logInStatus, setLogInStatus] = useState(false)

    const signin = (e) => {
        e.preventDefault()
        axios
            .post("http://localhost:3001/signin", {
                email,
                password
            })
            .then((res) => {
                if (!res.data.auth) {
                    setLogInStatus(false)
                    Swal.fire('Oops...', res.data.message, '!')
                } else {
                    setLogInStatus(true)
                    props.setId({ id: res.data.id, auth: true });
                }
                console.log("helloooo", res.data)
            });
    };

    console.log("id here", props.id)
    if (logInStatus) {
        history.push("/UserAccount");
    }
    return (
        <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src="https://res.cloudinary.com/rbkescape/image/upload/v1624649756/Escape/f0vsjhirqm2gi2vtfb4g.jpg" alt="sing up image" /></figure>
                        <a href="#" class="signup-image-link">Create an account</a>
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Sign up</h2>
                        <form method="POST" class="register-form" id="login-form">
                            <div class="form-group">
                                <label ><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="your_name" id="your_name" placeholder="Your email" onChange={(e) => {
                                    setemail(e.target.value)
                                }} />
                            </div>
                            <div class="form-group">
                                <label ><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="your_pass" id="your_pass" placeholder="Password" onChange={(e) => {
                                    setpassword(e.target.value)
                                }} />
                            </div>
                            <div class="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                <label  class="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Log in" onClick={signin} />
                            </div>
                        </form>
                        <div class="social-login">
                            <span class="social-label">Or login with</span>
                            <ul class="socials">
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Signin;