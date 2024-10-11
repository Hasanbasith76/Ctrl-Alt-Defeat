import React from "react";
import './Testwindow.css';
import Aiproctor from "./Ai_proctor";

export default function Testwindow(){
    return(
        <div className="Testwindow">
            <h1 className="h1-test">Assessment</h1>
            <div className="proper-align">
            <Aiproctor className="webcam1"/>
            <div className="container-test">
                <h5 className="h5-test">Q.No:1</h5>
                <div class="question">
                    <p>1. What does HTML stand for?</p>
                    <ul class="answers">

                        <li><input type="radio" name="q1" value="a" className="bullet"/> Hyper Text Markup Language</li>
                        <li><input type="radio" name="q1" value="b" className="bullet"/> Hyperlinks and Text Markup Language</li>
                        <li><input type="radio" name="q1" value="c" className="bullet"/> Home Tool Markup Language</li>
                    </ul>
                </div>
                <br/>
                <button className="btn-prev">Previous</button>
                <button className="btn-next">Next</button>
            </div>   
        </div>
    </div>
    )
}