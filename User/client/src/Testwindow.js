import React, { useState, useEffect } from "react";
import './Testwindow.css';
import Aiproctor from "./Ai_proctor"; // Assuming Aiproctor is a component you have
import axios from 'axios';

export default function TestWindow() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWarning, setShowWarning] = useState(false); // State for warning visibility

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

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setShowWarning(true); // Show warning when tab is hidden
      } else {
        // Do not hide the warning automatically; it will remain until closed
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange); // Clean up the event listener
    };
  }, []);

  const closeWarning = () => {
    setShowWarning(false); // Function to close the warning
  };

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
      [currentQuestionIndex]: value
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
                        name={`q${currentQuestion._id}`}
                        value={option}
                        className="bullet"
                        checked={selectedAnswers[currentQuestionIndex] === option}
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
      {showWarning && (
        <div className="popup-warning">
          <h2>Warning!</h2>
          <p>Do not switch tabs!</p>
          <button onClick={ closeWarning}>Close</button>
        </div>
      )}
    </div>
  );
}