import React from 'react';
import Signin from "../src/components/Signin";
import Signup from "../src/components/Signup";

import './components/auth.css';

const Account = (props) => {
    console.log("account", props)
    return (
        <div className="bodySing">
            <Signup />
            <Signin id={props.id} setId={props.setId} />
        </div>
    )
}

export default Account;