import React from 'react';

function UserAccount(props) {

if(!props.id.auth) {
    console.log(props.id.auth);
    return (<p>nooooo</p>)
}
    return (
        <div>test</div>
    )
}


export default UserAccount;