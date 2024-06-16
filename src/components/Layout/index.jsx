import React, { useState, useEffect } from "react";
import Quiz from "../Quiz";
import Timer from "./Timer";
import QuestionData from "../../data/question.json";

function Layout() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [fullscreenEnabled, setFullscreenEnabled] = useState(false);

  const handleExitQuiz = () => {
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("timeLeft");
    window.location.reload();
  };

  const handleSubmitQuiz = () => {
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("timeLeft");
    window.location.reload();
  };

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setFullscreenEnabled(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
    };
  }, []);

  const handleFullscreenRequest = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setQuizStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center">
      {!quizStarted ? (
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-blue-600">
            Welcome to the Quiz
          </h1>
          <button
            onClick={handleFullscreenRequest}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
          {fullscreenEnabled ? (
            <>
              <div className="flex flex-col items-center space-y-4">
                <Timer />
                <Quiz QuestionData={QuestionData} />
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={handleExitQuiz}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none"
                >
                  Exit Quiz
                </button>
                <button
                  onClick={handleSubmitQuiz}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-8 bg-white shadow-lg rounded-lg">
              <p className="mb-4 text-gray-700">
                Quizzes are only available in full screen mode. Please enter
                full screen mode to start the quiz.
              </p>
              <button
                onClick={handleFullscreenRequest}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Enter Full Screen
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Layout;
