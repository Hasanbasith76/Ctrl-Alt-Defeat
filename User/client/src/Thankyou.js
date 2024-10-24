import React from "react";
import './Thankyou.css';

export default function Thankyou(){
    return(
        <div className="Thankyou">
            <img src={require("./submitted.webp")} width={300} height={300} className="imagethank"/>
            <h1 className="content">Thank you! your Test has been Submitted. We are processing your application.</h1>
                <a href="/">
                    <button className="DB-btn">Logout</button>
                </a>
        </div>
    )
}