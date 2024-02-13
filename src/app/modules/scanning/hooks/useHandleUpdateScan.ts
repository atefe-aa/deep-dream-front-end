// hooks/useHandleUpdateScan.js
import { useState, useEffect } from 'react';
import { useUpdateScan } from './useUpdateScan';

interface ScanData {
    testId: number,
    slideNumber: number,
    id: number,
  }
const useHandleUpdateScan = (nthSlide:number,scanId:number, initialData:ScanData) => {
  const [scanData, setScanData] = useState(initialData);
  const { updateScan, isUpdating } = useUpdateScan(nthSlide);

  // Function to handle changes and initiate updates
  const handleUpdateScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const numericValue = parseInt(value, 10); // Convert value to a number
    if (name === "testId" || name === "slideNumber") {
      setScanData((prev) => ({ ...prev, [name]: numericValue, id: scanId}));
    }
  };

  // Effect to perform the update when scanData changes
  useEffect(() => {
    if (scanData.slideNumber > 0 && scanData.testId > 0) {
        
      updateScan(scanData);
    }
  }, [scanData, updateScan]);

  return { scanData, handleUpdateScan, isUpdating };
};

export default useHandleUpdateScan;
