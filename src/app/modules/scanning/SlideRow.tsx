import React from "react";
import { KTIcon } from "../../../_metronic/helpers";
import { RegionSelector } from "./RegionSelector";

interface DataType {
  slide: number;
  testNumber: number;
  testType: string;
  progress: string;
  image: string;
}

type Props = {
  data: DataType;
  isScanning: boolean;
  formik: any;
  handleCheckboxChange: Function;
};

const SlideRow: React.FC<Props> = ({
  data,
  isScanning,
  formik,
  handleCheckboxChange,
}) => {
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
        <div className="form-check form-check-sm form-check-custom form-check-solid">
          <input
            {...formik.getFieldProps("selectedCheckboxes")}
            checked={
              formik.values.selectAll ||
              formik.values.selectedCheckboxes.includes(data.slide)
            }
            onChange={handleCheckboxChange}
            className="form-check-input widget-9-check"
            type="checkbox"
            value={data.slide}
            id={`slide${data.slide}`}
          />
        </div>
      </td>
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
      <td className="ms-4 text-end">
        <div
          className="d-flex flex-column me-2"
          style={{ width: "320px" }}
        >
          <RegionSelector image={data.image} />
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
        {/* Actions */}
        <div className="d-flex justify-content-end flex-shrink-0">
          {/* Start Action */}
          {data?.progress === "ready" && (
            <button
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_scanning_slide"
              disabled={isScanning}
              className="btn btn-icon  btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <i className="las la-play"></i>
            </button>
          )}

          {/* View Action */}
          {data?.progress === "scanned" && (
            <button className="btn btn-icon  btn-bg-light btn-active-color-primary btn-sm me-1">
              <KTIcon iconName="eye" className="fs-3" />
            </button>
          )}

          {/* Try Again Action */}
          {data?.progress === "failed" && (
            <button
              disabled={isScanning}
              className="btn btn-icon  btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <i className="las la-redo-alt"></i>
            </button>
          )}

          {/* Scanning State */}
          {data?.progress === "scanning" && (
            <button className="btn btn-icon  btn-bg-light btn-active-color-primary btn-sm me-1">
              <span className="spinner-border spinner-border-sm align-middle"></span>
            </button>
          )}

          {data.progress === "scanning" ? (
            // stop Action
            <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
              <i className="las la-ban"></i>
            </button>
          ) : (
            // Delete Action
            <button className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
              <KTIcon iconName="trash" className="fs-3" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export { SlideRow };
