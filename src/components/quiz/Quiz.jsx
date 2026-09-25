import React, { useState, useEffect } from 'react';
import { QuizQuestions } from '../../data/questions';

// Helper function to shuffle questions array on load
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Quiz({ onHome }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Randomize questions whenever the quiz starts/restarts
  useEffect(() => {
    restartQuiz();
  }, []);

  const restartQuiz = () => {
    setQuestions(shuffleArray(QuizQuestions));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const handleSelect = (option) => {
    if (isSubmitted) return; // Freeze selection after submission
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  // Final Score View
  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-finished">
        <h2>Quiz Complete!</h2>
        <div className="score-box">
          <p>
            You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
          </p>
          <p className="percentage">{percentage}%</p>
        </div>
        <div className="button-group-row">
          <button onClick={restartQuiz}>Retake Quiz</button>
          <button onClick={onHome}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Top Header */}
      <div className="view-header">
        <span className="quiz-progress">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <button className="btn-small" onClick={onHome}>
          Home
        </button>
      </div>

      {/* Question Text */}
      <h2 className="quiz-question">{currentQuestion.question}</h2>

      {/* Options List */}
      <div className="options-list">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === currentQuestion.answer;

          let btnClass = "quiz-option";
          if (isSubmitted) {
            if (isCorrect) {
              btnClass += " correct";
            } else if (isSelected && !isCorrect) {
              btnClass += " wrong";
            } else {
              btnClass += " disabled";
            }
          } else if (isSelected) {
            btnClass += " selected";
          }

          return (
            <button
              key={idx}
              className={btnClass}
              onClick={() => handleSelect(option)}
              disabled={isSubmitted}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation banner after submitting */}
      {isSubmitted && currentQuestion.explanation && (
        <div className="explanation-box">
          <strong>Explanation:</strong> {currentQuestion.explanation}
        </div>
      )}

      {/* Submit / Next Controls */}
      <div className="quiz-footer">
        {!isSubmitted ? (
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            Submit Answer
          </button>
        ) : (
          <button className="btn-primary" onClick={handleNext}>
            {currentIndex + 1 === questions.length ? "See Final Score" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}