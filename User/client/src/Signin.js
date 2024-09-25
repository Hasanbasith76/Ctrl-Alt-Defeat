import React from "react";
import './Signin.css'
import { GoogleLogin } from "@react-oauth/google";

export default function Signin(){
    return(
        <div className="Signin">
        <h1 className="Greet">Welcome Back, User!</h1>
        <p>Sign in with your email address</p>
        <label className="lbl">Email</label>
        <br/>
        <input type="text" placeholder="Enter your email address" className="email-input" required="true"></input>
        <br/>
        <br/>
        <label className="lbl">Password</label>
        <br/>
        <input type="text" placeholder="Enter your password" className="password-input" required="true"></input>
        <br/>
        <p className="f">forgot your password?</p>
        <br/>
        <a href="/Dashboard">
            <button className="Submit-btn">Continue to Dashboard</button>
            <h4 className="h4-signup">
            <span>
            <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            />
            </span></h4>
        </a>
        
        <a href="/signup">
            <p className="p">New here? Create an account and join us today!</p>
        </a>
        </div>
    )
}