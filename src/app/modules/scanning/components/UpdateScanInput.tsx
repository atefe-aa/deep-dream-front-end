import React, { useEffect, useState } from "react";
import { useUpdateScan } from "../hooks/useUpdateScan";

type Props = {
  scanId: number;
  nthSlide: number;
  inputName: string;
  label: string;
};

const UpdateScanInput: React.FC<Props> = ({ scanId, nthSlide, inputName, label }) => {
  const [scanData, setScanData] = useState({
    testId: 0,
    slideNumber: 0,
    id: scanId,
  });
  const { updateScan, isUpdating } = useUpdateScan(nthSlide);

  function handleUpdateScan(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    const numericValue = parseInt(value, 10); // Convert value to a number
    if (name === "testId" || name === "slideNumber") {
      setScanData((prev) => ({ ...prev, [name]: numericValue, id: scanId }));
    }
  }

  useEffect(() => {
    console.log(scanData);
    
    if (scanData.slideNumber > 0 && scanData.testId > 0) {
      updateScan(scanData);
    }
  }, [scanData, updateScan]);

  return (
    <input
      type="number"
      min={0}
      autoComplete="off"
      placeholder={label}
      onBlur={handleUpdateScan}
      disabled={isUpdating}
      name={inputName}
      className="p-2 rounded text-center w-80px bg-transparent"
    />
  );
};

export { UpdateScanInput };
