import React, { useState, useEffect } from "react";

function Timer() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("timeLeft");
    return savedTime ? parseInt(savedTime) : 600;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("timeLeft", timeLeft.toString());
    if (timeLeft === 0) {
      alert("Time is up");
    }
  }, [timeLeft]);

  const minuteLeft = Math.floor(timeLeft / 60);
  const secondLeft = timeLeft % 60;
  const formattedTime =
    (minuteLeft < 10 ? "0" : "") +
    minuteLeft +
    ":" +
    (secondLeft < 10 ? "0" : "") +
    secondLeft;

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md text-lg">
        {formattedTime}
      </div>
    </div>
  );
}

export default Timer;
