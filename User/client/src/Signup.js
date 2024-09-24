import React from "react";
import './Signup.css';

export default function Signup(){
    return(
        <div className="Signin">
        <h1 className="Greet">Join Our Community</h1>
        <p>Create an account to unlock exclusive features and benefits tailored for you.</p>
        <label className="lbl">Email Address</label>
        <br/>
        <input type="text" placeholder="Enter your email address" className="email-input"></input>
        <br/>
        <br/>
        <label className="lbl">Choose a username</label>
        <br/>
        <input type="text" placeholder="Pick a unique username" className="email-input"></input>
        <br/>
        <br/>
        <label className="lbl">Create a Password</label>
        <br/>
        <input type="text" placeholder="Enter your password" className="password-input"></input>
        <br/>
        <br/>
        <a href="/signin">
            <button className="Submit-btn">Continue to Signup</button>
            <h4 className="h4-signup">Sign in with google account</h4>
        </a>
        
        </div>
    )
}