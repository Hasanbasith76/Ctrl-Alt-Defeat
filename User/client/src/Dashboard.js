import React from "react";
import './Dashboard.css';

export default function Dashboard(){
    const candidatename="Ashok";
    return(
        <div className="Dashboard">
            <img src={require("./m_image.png")} className="Dash-image"></img>
            <div className="Dash-content">
                <h1>Welcome Back, {candidatename}! Ready to conquer your assessments? </h1>
                <p>Dive into your personalized dashboard to start or review your assessments. Track your progress and view past reports to prepare for future success.</p>
                <button className="Start-btn">Start Your Assessment</button>
                <br/>
                <button className="Reports-btn">View Past Reports</button>
                <p>Your journey towards excellence begins here!</p>
                <h3>{candidatename}</h3>
            </div>
        </div>
    )
}