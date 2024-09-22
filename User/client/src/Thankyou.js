import React from "react";
import './Thankyou.css';

export default function Thankyou(){
    return(
        <div className="Thankyou">
            <h1 className="content">thank you! your Test has been Submitted</h1>
            <p className="content">You can view your test reports in view past reports tab presented in your dashboard</p>
            <button className="DB-btn">Go to Dashboard</button>
        </div>
    )
}