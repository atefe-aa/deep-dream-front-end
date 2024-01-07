import React from "react";
import { KTIcon } from "../../../_metronic/helpers";
import { DropDownButton } from "../buttons/DropDownButton";
import { ShareMenu } from "../ShareMenu";

interface DataType {
  name: string;
  date: string;
  number: number;
  labNumber: string;
  testType: string;
  age: number;
  price: number;
  sex: string;
  description: string;
  laboratory: string;
  progress: string;
}

type Props = {
  data: DataType;
  index: number;
};

const TablesWidget9Row: React.FC<Props> = ({ data, index }) => {
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
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.number}
          </a>
          <span className="text-muted fw-semibold text-muted d-block fs-7">
            {data.labNumber}
          </span>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.name}
          </a>
          <span className="text-muted fw-semibold text-muted d-block fs-7">
            {data.age} , {data.sex}
          </span>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.price.toLocaleString()}
          </a>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.date}
          </a>
        </div>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {data.laboratory}
        </a>
        <span className="text-muted fw-semibold text-muted d-block fs-7">
          {data.testType}
        </span>
      </td>
      <td className="text-end">
        <div className="d-flex flex-column w-100 me-2">
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
        <div className="d-flex justify-content-end flex-shrink-0">
          <a
            href="#"
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
          </a>
          <ShareMenu backgrounUrl="/media/misc/pattern-1.jpg" />
          <DropDownButton />
        </div>
      </td>
    </tr>
  );
};

export { TablesWidget9Row };
