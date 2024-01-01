import React from "react";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";

interface DataType {
  slide: number;
  testNumber: number;
  testType: string;
  progress: string;
}

type Props = {
  data: DataType;
  isScanning: boolean;
};

const SlideRow: React.FC<Props> = ({ data, isScanning }) => {
  let progressPercent = 0;
  let progressBg = "info";
  switch (data.progress) {
    case "ready":
      progressPercent = 5;
      progressBg = "warning";
      break;
    case "scanning":
      progressPercent = 50;
      progressBg = "primary";
      break;
    case "scanned":
      progressPercent = 100;
      progressBg = "success";
      break;

    case "failed":
      progressPercent = 100;
      progressBg = "danger";
      break;
  }
  return (
    <tr>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.slide}
          </a>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.testNumber}
          </a>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.testType}
          </a>
        </div>
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
          {data?.progress === "ready" && (
            <button
              disabled={isScanning}
              className="btn btn-icon  btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <i className="las la-play"></i>
            </button>
          )}
          {data?.progress === "scanned" && (
            <button className="btn btn-icon  btn-bg-light btn-active-color-primary btn-sm me-1">
              <KTIcon iconName="eye" className="fs-3" />
            </button>
          )}{" "}
          {data?.progress === "failed" && (
            <button
              disabled={isScanning}
              className="btn btn-icon  btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <i className="las la-redo-alt"></i>
            </button>
          )}{" "}
          {data?.progress === "scanning" && (
            <button className="btn btn-icon  btn-bg-light btn-active-color-primary btn-sm me-1">
              <span className="spinner-border spinner-border-sm align-middle"></span>
            </button>
          )}
          {data.progress === 'scanning' ?  <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
          <i className="las la-ban"></i>
          </button> :  <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
            <KTIcon iconName="trash" className="fs-3" />
          </button>}
         
        </div>
      </td>
    </tr>
  );
};

export { SlideRow };
