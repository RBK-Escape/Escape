import React from 'react';
import Signin from "../src/components/Signin";
import Signup from "../src/components/Signup"
const Account = (props) => {
    console.log("account", props)
    return (
        <div>
            <Signin id={props.id} setId={props.setId} />
            <Signup />
        </div>
    )
}

export default Account;