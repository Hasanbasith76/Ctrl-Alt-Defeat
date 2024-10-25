import React, { useState } from "react";
import './uploadquestions.css';

export default function UploadQuestions() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log("Question:", question);
        console.log("Options:", options);
    };

    return (
        <div className="uploadquestions">
            <h1 className="title">Upload Questions</h1>
            <form onSubmit={handleSubmit}>
                <label className="label" htmlFor="questionbox">Enter the Question:</label>
                <br />
                <input 
                    type="text" 
                    className="textbox" 
                    id="questionbox" 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <br /><br />

                <div className="options">
                    {options.map((option, index) => (
                        <div key={index}>
                            <label className="label" htmlFor={`optionbox${index}`}>Enter Option {index + 1}:</label>
                            <br />
                            <input 
                                type="text" 
                                className="textbox" 
                                id={`optionbox${index}`} 
                                value={option} 
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <br /><br />
                        </div>
                    ))}
                </div>
                <button type="submit" className="submit-button" onSubmit={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}