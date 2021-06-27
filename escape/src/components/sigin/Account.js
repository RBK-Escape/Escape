import React from 'react';
import Signin from "./Signin.js";
import Signup from "./Signup.js";

import '../../auth.css';


const Account = (props) => {
    console.log("account", props)
    return (
        <div className=" bodysing">
        <div className="container-s ">
            <div className="signin-signup">
            <Signin id={props.id} setId={props.setId} />
            <Signup />
            </div>
            
        </div>
        </div>
    )
}

export default Account;