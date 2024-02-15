import React, { useEffect, useState } from "react";

interface TimerProps {
  secondsLeft: number;
}

const Timer: React.FC<TimerProps> = ({ secondsLeft }) => {
  const [time, setTime] = useState(secondsLeft);

  useEffect(() => {
    // Reset the timer whenever the secondsLeft prop changes
    setTime(secondsLeft);
  }, [secondsLeft]);

  useEffect(() => {
    // Start the countdown only if time is greater than 0
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((currentTime) => currentTime - 1);
      }, 1000);

      // Clear the interval when the component unmounts or time runs out
      return () => clearInterval(timerId);
    }
  }, [time]);

  // Format the time into HH:MM:SS
  const formatTime = (time: number) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <span
        className="fs-4 text-muted"
        style={{
          minWidth: "30px",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        {String(Math.floor(time / 3600)).padStart(2, "0")}
      </span>
      <span className="fs-4 text-muted">:</span>
      <span
        className="fs-4 text-muted"
        style={{
          minWidth: "30px",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        {String(Math.floor((time % 3600) / 60)).padStart(2, "0")}
      </span>
      <span className="fs-4 text-muted">:</span>
      <span
        className="fs-4 text-muted"
        style={{
          minWidth: "30px",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        {String(time % 60).padStart(2, "0")}
      </span>
    </div>
  );
};

export default Timer;
