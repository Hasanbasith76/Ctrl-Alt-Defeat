import React, { useState, useEffect } from "react";
import './Testwindow.css';
import Aiproctor from "./Ai_proctor"; // Assuming Aiproctor is a component you have
import axios from 'axios';

export default function TestWindow() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // State to track selected answers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        setQuestions(response.data);
      } catch (err) {
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: value // Store the selected answer for the current question
    });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="Testwindow">
      <h1 className="h1-test">Assessment</h1>
      <div className="proper-align">
        <Aiproctor className="webcam1" />
        <div className="container-test">
          {currentQuestion && (
            <>
              <h5 className="h5-test">Q.No: {currentQuestionIndex + 1}</h5>
              <div className="question">
                <p>{currentQuestion.questionText}</p>
                <ul className="answers">
                  {currentQuestion.options.map((option, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        name={`q${currentQuestion._id}`} // Use question ID for unique name
                        value={option} // Store the option value
                        className="bullet"
                        checked={selectedAnswers[currentQuestionIndex] === option} // Check if this option is selected
                        onChange={handleOptionChange}
                      />
                      {option}
                    </li>
                  ))}
                </ul>
                {selectedAnswers[currentQuestionIndex] !== undefined && (
                  <p className="selected-answer">
                    Selected Answer: {selectedAnswers[currentQuestionIndex]}
                  </p>
                )}
              </div>
            </>
          )}
          <br />
          <div className="buttons">
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
          {currentQuestionIndex === questions.length - 1 && (
            <button className="btn-submit">
              <a href="Thankyou">
                End test
              </a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}