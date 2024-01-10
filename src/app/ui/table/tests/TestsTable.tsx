import React from "react";
import { TablesWidget9Row } from "./TableWidget9Row";

type Props = {
  className: string;
  testsData: TestsData[];
};

type TestsData = {
  name: string;
  date: string;
  number: number;
  labNumber: string;
  testType: string;
  age: number;
  sex: string;
  description: string;
  laboratory: string;
  progress: string;
  price: number;
};

const TestsTable: React.FC<Props> = ({ className = "", testsData }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Tests Statistics</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="w-25px">#</th>
                <th className="min-w-15px">Number</th>
                <th className="min-w-150px">Patient</th>
                <th className="min-w-130px">Price(R)</th>
                <th className="min-w-150px">Date & Time</th>
                <th className="min-w-140px">Laboratory</th>
                <th className="min-w-120px">Progress</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {testsData.map((data, _index) => (
                <TablesWidget9Row key={_index} data={data} index={_index + 1} />
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

export { TestsTable };
