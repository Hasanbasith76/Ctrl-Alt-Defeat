import React from "react";
import './Result.css';

export default function Results(){
    return(
        <div className="results">
            <p className="results-p">Your past performance awaits</p>
            <h1 className="results-h1">Review Your Previous Assessments</h1>
            <br/>
            <br/>
            <div className="catlog">
                    <img src={require("./Card.png")}></img>
                    <div className="Imptra">
                        <img src={require("./m_image02.png")}></img>
                        <h4>Improvement Tracking</h4>
                    </div>
                    <div className="feedback">
                        <img src={require("./m_image03.png")}></img>
                        <h4>feedback summary</h4>
                    </div>
                    <div className="skill">
                        <img src={require("./m_image05.png")}></img>
                        <h4>Skill enhancement</h4>
                    </div>
            </div>
        </div>
        
    )
}