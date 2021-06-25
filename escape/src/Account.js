import React from 'react';
import Signin from "../src/components/Signin";
import Signup from "../src/components/Signup";

import './components/auth.css';


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