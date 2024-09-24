import React from "react";
import './Checkwindow.css'

export default function Checkwindow(){
    return(
        <div className="Checkwindow">
            <div className="h1-tags">
                <h1>Webcam Test</h1>
                <h1>Audio Test</h1>
            </div>
            <hr color="red"/>
            <h1>Instructions:</h1>
            <ul>
                <li>Please allow web cam permission for this site to check your camera is properly working or not</li>
                <li>Please click on<b>"Capture Photo"</b>button to see the captured photo. if the captured photo is neat and clear then click on the<b>"Continue to audio test"</b>butto to check your machine's audio.</li>
                <li>If live cam is not visible click on refresh page</li>
            </ul>
            <hr color="red"/>
            <div className="container-1">
                <div className="Liveweb">
                    <h1 className="h1-chk">Live Web Cam</h1>
                    <div className="videoelem">
                        <video className="Video"></video>
                    </div>
                    <button className="capimg">Capture Image</button>
                </div>
                <div className="Captured">
                    <h1 className="h1-chk">Captured Photo</h1>
                    <div className="videoelem">
                        <image className="Video"></image>
                    </div>
                    <button className="capimg">Continue to audio test</button>
                </div>
            </div>
            <hr color="blue"/>
            <h3>If you are getting error in connecting video camera, then please allow camera access for this site. you must allow your browser to access the web-camera. please do the followimg setting in compatible latest version of browsers such as google chrome or microsoft edge for a smoother experience </h3>
            <a href="/Compatibility">
            <button className="M">
                <img src={require("./R.png")} width={30}></img>
            </button>
            </a>
            <a href="/Instructions">
                <button className="strt">Start Assessment</button>
            </a>
        </div>
    )
}