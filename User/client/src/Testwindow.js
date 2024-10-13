import React, { useState, useEffect } from "react";
import './Testwindow.css';
import Aiproctor from "./Ai_proctor";

export default function Testwindow() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        // Load questions when component mounts
        loadQuestions();
    }, []);

    const loadQuestions = () => {
        const loadedQuestions = [
            {
                id: 1,
                text: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "Hyperlinks and Text Markup Language",
                    "Home Tool Markup Language",
                    "Hyper Transfer Markup Language"
                ]
            },
            {
                id: 2,
                text: "Which programming language is often used for client-side web development?",
                options: [
                    "Python",
                    "Java",
                    "JavaScript",
                    "C++"
                ]
            },
            {
                id: 3,
                text: "What does CSS stand for?",
                options: [
                    "Computer Style Sheets",
                    "Creative Style Sheets",
                    "Cascading Style Sheets",
                    "Colorful Style Sheets"
                ]
            },
            {
                id: 4,
                text: "Which of the following is a JavaScript framework?",
                options: [
                    "Django",
                    "Flask",
                    "Ruby on Rails",
                    "React"
                ]
            }
        ];
        setQuestions(loadedQuestions);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="Testwindow">
            <h1 className="h1-test">Assessment</h1>
            <div className="proper-align">
                <Aiproctor className="webcam1"/>
                <div className="container-test">
                    {currentQuestion && (
                        <>
                            <h5 className="h5-test">Q.No:{currentQuestionIndex + 1}</h5>
                            <div className="question">
                                <p>{currentQuestion.text}</p>
                                <ul className="answers">
                                    {currentQuestion.options.map((option, index) => (
                                        <li key={index}>
                                            <input 
                                                type="radio" 
                                                name={`q${currentQuestion.id}`} 
                                                value={index} 
                                                className="bullet"
                                            />
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                    <br/>
                    <button 
                        className="btn-prev" 
                        onClick={previousQuestion} 
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </button>
                    <button 
                        className="btn-next" 
                        onClick={nextQuestion} 
                        disabled={currentQuestionIndex === questions.length - 1}
                    >
                        Next
                    </button>
                </div>   
            </div>
            {/*<WebcamComponent Action={{pro:"Live Recording"}} className="webcam1"/>*/}
        </div>
    )
}