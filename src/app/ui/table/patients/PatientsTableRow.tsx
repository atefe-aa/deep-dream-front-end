import React from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { ShareMenu } from "../../ShareMenu";
import { TestsTableDropdown } from "../../dropdown/TestsTableDropdown";

interface DurationArray {
  id?: number;
  magnification?: string;
  duration?: number;
}

interface DataType {
  name: string;
  date: string;
  number: number;
  labNumber: string;
  testType: string;
  age: number;
  price: number;
  numberOfSlides: number;
  sex: string;
  description: string;
  laboratory: string;
  progress: string;
  durations?: DurationArray[];
}

type Props = {
  data: DataType;
  index: number;
};

const PatientsTableRow: React.FC<Props> = ({ data, index }) => {
  const totalDuration = data.durations?.reduce(
    (acc, item) => acc + (item?.duration || 0),
    0
  );

  let progressPercent = 0;
  let progressBg = "danger";
  switch (data.progress.toLowerCase()) {
    case "new":
      progressPercent = 20;
      progressBg = "danger";
      break;
    case "scanning":
      progressPercent = 40;
      progressBg = "warning";
      break;
    case "scanned":
      progressPercent = 60;
      progressBg = "info";
      break;
    case "answered":
      progressPercent = 80;
      progressBg = "success";
      break;
    case "confirmed":
      progressPercent = 100;
      progressBg = "primary";
      break;
    case "deleted":
      progressPercent = 0;
      progressBg = "danger";
      break;
  }
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <div className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.number}
          </div>
          <span className="text-muted fw-semibold text-muted d-block fs-7">
            {data.labNumber}
          </span>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <div className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.name}
          </div>
          <span className="text-muted fw-semibold text-muted d-block fs-7">
            {data.age} , {data.sex}
          </span>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <div className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.price.toLocaleString()}
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <div className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.numberOfSlides}
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <div className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.date}
          </div>
        </div>
      </td>
      <td>
        <div className="text-gray-900 fw-bold text-hover-primary d-block fs-6">
          {data.laboratory}
        </div>
        <span className="text-muted fw-semibold text-muted d-block fs-7">
          {data.testType}
        </span>
      </td>
      <td>
        {data.durations ? (
          <>
            <div className="d-flex justify-content-around text-gray-900 fw-bold text-hover-primary d-block fs-6">
              <span>Total: </span>
              {totalDuration}
            </div>
            {data.durations.map((item) => (
              <span
                key={item?.id}
                className="d-flex justify-content-around text-muted fw-semibold text-muted d-block fs-7"
              >
                <span>{item?.magnification}: </span>
                {item?.duration}
              </span>
            ))}
          </>
        ) : (
          "-"
        )}
      </td>
      <td className="text-end">
        <div className="d-flex flex-column">
          <div className="d-flex flex-stack mb-2">
            <span className="text-muted me-2 fs-7 fw-semibold">
              {data.progress}
            </span>
          </div>
          <div className="progress h-6px w-100">
            <div
              className={`progress-bar bg-${progressBg}`}
              role="progressbar"
              style={{ width: progressPercent + "%" }}
            ></div>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-center flex-shrink-0">
        <div className="me-0" data-bs-toggle="tooltip" title="Share Options">
      <button
        className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="top-end"
      >
       <KTIcon iconName="share" className="fs-3" />
      </button>
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded  fw-bold  w-350px w-lg-375px"
        data-kt-menu="true"
      >
       <ShareMenu backgrounUrl="/media/misc/pattern-1.jpg"  />
      </div>
    </div>
          {/* <div
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            data-bs-toggle="tooltip"
            title="Share"
            data-kt-menu-trigger="click"
            data-kt-menu-overflow="true"
            data-kt-menu-placement="bottom-end"
            data-bs-placement="right"
            data-bs-dismiss="click"
          >
            <KTIcon iconName="share" className="fs-3" />
          </div> */}
          {/* <ShareMenu backgrounUrl="/media/misc/pattern-1.jpg" /> */}
          <TestsTableDropdown />
        </div>
      </td>
    </tr>
  );
};

export { PatientsTableRow };
