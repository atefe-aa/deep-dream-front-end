import React, { useEffect, useState } from "react";
import { SlidesTable } from "./SlidesTable";
import { SlideRow } from "./SlideRow";

const fakeData = [
  {
    slide: 1,
    testNumber: 550035,
    testType: "CC",
    progress: "ready",
  },
  {
    slide: 2,
    testNumber: 550036,
    testType: "CC",
    progress: "scanned",
  },
  {
    slide: 3,
    testNumber: 550037,
    testType: "CC",
    progress: "scanned",
  },
  {
    slide: 4,
    testNumber: 550038,
    testType: "CC",
    progress: "ready",
  },
  {
    slide: 5,
    testNumber: 550039,
    testType: "CC",
    progress: "scanned",
  },
  {
    slide: 6,
    testNumber: 550040,
    testType: "CC",
    progress: "failed",
  },
  {
    slide: 7,
    testNumber: 550041,
    testType: "CC",
    progress: "ready",
  },
  {
    slide: 8,
    testNumber: 550042,
    testType: "CC",
    progress: "ready",
  },
  {
    slide: 9,
    testNumber: 550043,
    testType: "CC",
    progress: "ready",
  },
  {
    slide: 10,
    testNumber: 550044,
    testType: "CC",
    progress: "ready",
  },
];
type Props = {
  startAction: Function;
};

const ScanningLabels: React.FC<Props> = ({ startAction }) => {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(
    function () {
      fakeData.map(
        (data) => data.progress === "scanning" && setIsScanning(true)
      );
    },
    [fakeData]
  );

  return (
    <div className=" w-100">
      <SlidesTable className="">
        {fakeData.map((data, _index) => (
          <SlideRow key={_index} data={data} isScanning={isScanning} />
        ))}
      </SlidesTable>
    </div>
  );
};

export { ScanningLabels };
