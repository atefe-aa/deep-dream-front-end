import React from "react";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { TablesWidget9Row } from "./rows/TableWidget9Row";

type Props = {
  className: string;
};

const fakeData = [
  {
    name: "ana",
    date: "1402-10-10 10:50",
    number: 6988,
    labNumber: 50423,
    testType: "CC",
    age: 20,
    sex: "female",
    description: "this is a test discription",
    laboratory: "Milad",
    progress: "new",
    price: 250000,
  },
  {
    name: "ana",
    date: "1402-10-10 10:50",
    number: 50424,
    labNumber: 6988,
    testType: "CC",
    age: 20,
    sex: "female",
    description: "this is a test discription",
    laboratory: "Milad",
    progress: "scanning",
    price: 250000,
  },
  {
    name: "ana",
    date: "1402-10-10 10:50",
    number: 50424,
    labNumber: 6988,
    testType: "CC",
    age: 20,
    sex: "female",
    description: "this is a test discription",
    laboratory: "Milad",
    progress: "scanned",
    price: 250000,
  },
  {
    name: "ana",
    date: "1402-10-10 10:50",
    number: 50424,
    labNumber: 6988,
    testType: "CC",
    age: 20,
    sex: "female",
    description: "this is a test discription",
    laboratory: "Milad",
    progress: "answered",
    price: 250000,
  },
  {
    name: "ana",
    date: "1402-10-10 10:50",
    number: 50424,
    labNumber: 6988,
    testType: "CC",
    age: 20,
    sex: "female",
    description: "this is a test discription",
    laboratory: "Milad",
    progress: "confirmed",
    price: 250000,
  },
  {
    name: "ana",
    date: "1402-10-10 10:50",
    number: 50424,
    labNumber: 6988,
    testType: "CC",
    age: 20,
    sex: "female",
    description: "this is a test discription",
    laboratory: "Milad",
    progress: "deleted",
    price: 250000,
  },
];

const TablesWidget9: React.FC<Props> = ({ className }) => {
  const totalNumberOfTests = fakeData.length;
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Tests Statistics</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Over {totalNumberOfTests} tests
          </span>
        </h3>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <a
            href="#"
            className="btn btn-sm btn-light-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_new_test"
          >
            <KTIcon iconName="plus" className="fs-3" />
            New Test
          </a>
        </div>
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
                <th className="min-w-150px">Clients</th>
                <th className="min-w-130px">Price</th>
                <th className="min-w-150px">Date</th>
                <th className="min-w-140px">Laboratory</th>
                <th className="min-w-120px">Progress</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {fakeData.map((data, _index) => (
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

export { TablesWidget9 };
