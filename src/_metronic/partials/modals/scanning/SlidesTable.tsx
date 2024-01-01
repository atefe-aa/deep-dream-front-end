import React, { useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { SlideRow } from "./SlideRow";

type Props = {
  className: string;
};

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
    progress: "scanning",
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
const SlidesTable: React.FC<Props> = ({ className }) => {
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
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-50px">Slide</th>
                <th className="min-w-50px">Number</th>
                <th className="min-w-0px">Test Type</th>
                <th className="min-w-50px">Status</th>
                <th className="min-w-50px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {fakeData.map((data, _index) => (
                <SlideRow key={_index} data={data} isScanning={isScanning} />
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { SlidesTable };
