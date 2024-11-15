import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/QuizApp.css";
import { GET} from "../api";

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isStampVisible, setIsStampVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quizReport, setQuizReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET('/api/quiz/getquestions');
        setQuestions(response.data);
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", !showResults);
  }, [showResults]);

  const handleOptionClick = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
      setIsTransitioning(false);
    }, 500);
  };

  const handlePreviousQuestion = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestion((prev) => Math.max(prev - 1, 0));
      setIsTransitioning(false);
    }, 500);
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    const reportData = questions.map((question, index) => {
      const isCorrect = selectedAnswers[index] === question.answer;
      if (isCorrect) calculatedScore++;
      return {
        question: question.questions,
        selectedAnswer: selectedAnswers[index],
        correctAnswer: question.answer,
        isCorrect,
        options: [question.optionA, question.optionB, question.optionC, question.optionD],
        isAttempted: selectedAnswers[index] !== null,
      };
    });

    setScore(calculatedScore);
    setQuizReport(reportData);
    setIsStampVisible(true);
    setShowResults(true);
  };

  if (!questions.length) {
    return <div>Loading...</div>;
  }

  if (showResults) {
    return (
      <div className="quiz-results">
        <h2>Quiz Results</h2>
        <div className={`score-circle ${isStampVisible ? "stamp-animation" : ""}`}>
          <span>{score}</span> / {questions.length}
        </div>

        {/* Quiz Report Section */}
        <div className="quiz-report">
          <h3>Your Answers:</h3>
          {quizReport.map((item, index) => (
            <div key={index} className="report-item">
              <p>Question {index + 1}: {item.question}</p>
              <div className="options-report">
                {item.options.map((option, optIndex) => (
                  <p
                    key={optIndex}
                    className={`option-report ${
                      option === item.selectedAnswer
                        ? item.isCorrect ? "correct-answer" : "wrong-answer"
                        : option === item.correctAnswer ? "correct-answer" 
                        : !item.isAttempted ? "not-attempted" 
                        : ""
                    }`}
                  >
                    {option}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        
       
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className={`quiz-app ${isTransitioning ? "fade-out" : "fade-in"}`}>
      <h1 className="title">News Quiz</h1>
      <div className="question-section">
        <h2>Question {currentQuestion + 1}</h2>
        <p>{currentQuestionData.questions}</p>
        <div className="options">
          {["A", "B", "C", "D"].map((label) => (
            <button
              key={label}
              className={`option ${selectedAnswers[currentQuestion] === currentQuestionData[`option${label}`] ? "selected" : ""}`}
              onClick={() => handleOptionClick(currentQuestionData[`option${label}`])}
            >
              {currentQuestionData[`option${label}`]}
            </button>
          ))}
        </div>
      </div>
      <div className="navigation">
        {currentQuestion > 0 && (
          <button className="nav-button" onClick={handlePreviousQuestion}>
            Previous
          </button>
        )}
        {currentQuestion < questions.length - 1 && (
          <button className="nav-button" onClick={handleNextQuestion}>
            Next
          </button>
        )}
        {currentQuestion === questions.length - 1 && (
          <button className="submit-button" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
