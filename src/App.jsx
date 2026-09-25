import React, { useState } from 'react';
import './App.css';
import Answers from "./components/answers/Answers";
import Quiz from "./components/quiz/Quiz";

export default function App() {
  const [view, setView] = useState('home');

  return (
    <div className="app-container">
      <main className="main">
        {/* 1. Landing Screen */}
        {view === 'home' && (
          <div className="home-card">
            <h1>Syllabus Squares</h1>
            <p>Choose an option to get started:</p>
            
            <div className="button-group">
              <button onClick={() => setView('quiz')}>
                Take Quiz
              </button>
              
              <button onClick={() => setView('answers')}>
                View Answers
              </button>
            </div>
          </div>
        )}

        {/* 2. Quiz Mode Screen */}
        {view === 'quiz' && (
          <Quiz onHome={() => setView('home')} />
        )}

        {/* 3. Answer Key Screen */}
        {view === 'answers' && (
          <div>
            <div className="view-header">
              <button className="btn-small" onClick={() => setView('home')}>
                Back to Home
              </button>
              <h3>Justin Baker's PSYCH&200 Syllabus Squares</h3>
            </div>
            <Answers />
          </div>
        )}
      </main>
    </div>
  );
}