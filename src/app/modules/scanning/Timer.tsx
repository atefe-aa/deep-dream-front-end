import { useState } from "react";

function Timer() {
  const [timer, setTimer] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  const start = () => {
    if (timer !== null) {
      clearInterval(timer);
    }
    const newTimer = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimer(newTimer);
  };

  return (
    <div>
      <button className="btn btn-success ms-4 me-4" onClick={start}>
        Scan All
      </button>
      <span className="fs-2">
        {String(Math.floor(time / 3600)).padStart(2, "0")}
      </span>
      <span className="fs-2">:</span>
      <span className="fs-2">
        {String(Math.floor((time % 3600) / 60)).padStart(2, "0")}
      </span>
      <span className="fs-2">:</span>
      <span className="fs-2">{String(time % 60).padStart(2, "0")}</span>
    </div>
  );
}

export default Timer;
