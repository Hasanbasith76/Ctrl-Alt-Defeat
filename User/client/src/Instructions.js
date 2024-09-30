import React from "react";
import './Instructions.css';

export default function Instructions(){
    return(
        <div className="Instructions">
            <div className="contentinst">
                <h1>Instructions To Be Noted:</h1>
                <p>Disable all the Desktop Notifications throught the assessment</p>
                <ul>
                    <li>Do not leave the camera preview</li>
                    <li>Do not look away from the screen</li>
                    <li>Do not leave your web browser</li>
                    <li>Do not speak unless instructed</li>
                    <li>Do not allow othersin the room with you</li>
                    <li>Do not use any outside reference material</li>
                </ul>
                <div className="nav-btn">
                    <a href="/Checkwindow">
                        <button className="L"> 
                            <img src={require("./left.png")} width={40}></img>
                        </button>
                    </a>
                    <a href="/Testwindow">
                        <button className="L">
                            <img src={require("./right.png")} width={40}/>
                        </button>
                    </a>
                </div>
            </div>
            <img src={require("./lap.png")}></img>
        </div>
    )
}