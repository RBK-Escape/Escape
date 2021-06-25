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
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Sign up</h2>
                        <form method="POST" class="register-form" id="register-form">
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name" placeholder="Your Name" onChange={(e) => {
                                    setfullname(e.target.value)
                                }} />
                            </div>
                            <div class="form-group">
                                <label for="email"><i class="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" id="email" placeholder="Your Email" onChange={(e) => {
                                    setemail(e.target.value)
                                }} />
                            </div>
                            <div class="form-group">
                                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="phone" id="pass" placeholder="Phone number" onChange={(e) => {
                                    setphone(e.target.value)
                                }} />
                            </div>
                            <div class="form-group">
                                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="adress" id="pass" placeholder="Adress" onChange={(e) => {
                                    setadress(e.target.value)
                                }} />
                            </div>
                            <div class="form-group">
                                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="pass" id="pass" placeholder="Password" onChange={(e) => {
                                    setpassword(e.target.value)
                                }} />
                            </div>
                            <div class="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signup" id="signup" class="form-submit" value="Register" onClick={signup} />
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img id="img" src="https://res.cloudinary.com/rbkescape/image/upload/v1624649856/Escape/vz9l6edewd9yucsyvdau.jpg" alt="sing up image" /></figure>
                        <a href="#" class="signup-image-link">I am already member</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default SignUp;

