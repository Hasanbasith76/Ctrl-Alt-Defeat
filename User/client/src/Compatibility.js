import React from "react";
import './Compatibility.css';

export default function Compatibility(){
    return(
        <div className="Compatibility">
            <div className="contentcomp">
                <h1>System Compatibility Check</h1>
                <p>Ensure Your System Meets the Requirements</p>
                <div className="nav-btn">
                    <button>=</button>
                    <button>=</button>
                </div>
            </div>
            <img src={require("./lap.png")}></img>
        </div>
    )
}