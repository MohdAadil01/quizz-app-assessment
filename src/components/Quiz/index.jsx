import React, { useEffect, useState } from "react";

function Quiz({ QuestionData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentQuestion");
    return savedIndex ? parseInt(savedIndex) : 0;
  });
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    localStorage.setItem("currentQuestion", currentQuestionIndex.toString());
  }, [currentQuestionIndex]);

  const handleSelectAnswer = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    setSelectedAnswer("");
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) =>
      Math.min(prev + 1, QuestionData.length - 1)
    );
    setSelectedAnswer("");
  };

  if (!QuestionData || QuestionData.length === 0) {
    return <div>No questions available</div>;
  }

  const question = QuestionData[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-2 w-full">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">{question.qNo}</h1>
        <h2 className="text-xl mb-6">{question.question}</h2>
        <div>
          <ul>
            {question.options.map((option, index) => (
              <li
                key={index}
                className="mb-2 w-46 h-16 bg-indigo-800 rounded-3xl shadow-lg flex items-center justify-center cursor-pointer hover:bg-indigo-700"
                onClick={() =>
                  handleSelectAnswer({ target: { value: option } })
                }
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  className="mr-2 cursor-pointer"
                  checked={selectedAnswer === option}
                  onChange={() => {}} // No need for onChange, as we handle selection on click
                />
                <label className="flex items-center text-white cursor-pointer">
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === QuestionData.length - 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
