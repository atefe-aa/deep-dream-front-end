import { useState } from "react";
import { SelectedRegion } from "../../../pages/scanning/ScanningPage";
import { useStartRegionScanning } from "../hooks/useStartRegionScanning";
interface TimerProps {
  selectedRegions: SelectedRegion[];
}

const Timer: React.FC<TimerProps> = ({ selectedRegions }) => {
  const [timer, setTimer] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const { isStarting, startRegionScanning } = useStartRegionScanning();

  const start = () => {
    console.log(selectedRegions);
    
    startRegionScanning(selectedRegions);
    if (timer !== null) {
      clearInterval(timer);
    }
    if (!isStarting) {
      const newTimer = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimer(newTimer);
    }
  };

  return (
    <div>
      <button
        className="btn btn-success ms-4 me-4"
        disabled={isStarting}
        onClick={start}
      >
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
};

export default Timer;
