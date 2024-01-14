import React from "react";
import { KTIcon } from "../../../_metronic/helpers";
import { RegionSelector } from "./RegionSelector";
import clsx from "clsx";

interface TimeType {
  magnification?: string;
  id?: number;
  duration?: number;
}

interface DataType {
  slide: number;
  testNumber: number;
  testType: string;
  progress: string;
  image: string;
  laboratory: string;
  durations?: TimeType[];
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
  const totalDuration = data.durations?.reduce(
    (acc, item) => acc + (item.duration ? item.duration : 0),
    0
  );

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
      <td className="text-center">
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
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.slide}
          </a>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          {data?.testNumber ? (
            <a
              href="#"
              className="text-gray-900 fw-bold text-hover-primary fs-6"
            >
              {data.testNumber}
            </a>
          ) : (
            <input
              type="number"
              min={0}
              autoComplete="off"
              placeholder="Enter Test Number"
              {...formik.getFieldProps("testNumber")}
              className={clsx(
                "p-2 rounded text-center w-80px bg-transparent",
                {
                  "is-invalid":
                    formik.touched.testNumber && formik.errors.testNumber,
                },
                {
                  "is-valid":
                    formik.touched.testNumber && !formik.errors.testNumber,
                }
              )}
            />
          )}
          {formik.touched.testNumber && formik.errors.testNumber && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.testNumber}</span>
              </div>
            </div>
          )}
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.testType}
          </a>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.laboratory}
          </a>
        </div>
      </td>
      <td className="text-center">
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

      {/* start::Durations */}
      <td className="text-center">
        <div className="d-flex flex-column text-gray-900 fw-bold text-hover-primary fs-6">
         {data?.durations && <div className="d-flex justify-content-between">
            <span>Total: </span>
            <span>{totalDuration}</span>
          </div>
}
          {data.durations &&
            data.durations.map((item) => (
              <div key={item.id} className="d-flex justify-content-between">
                <span className="text-muted fs-7">{item.magnification}: </span>
                <span className="text-muted fs-7">{item.duration}</span>
              </div>
            ))}
        </div>
      </td>
      {/* end::Durations */}

      <td className="text-center">
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
             <KTIcon iconName="to-left" className="fs-3" />
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
               <KTIcon iconName="arrows-circle" className="fs-3" />
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

      <td className="text-center">
        <div className="d-flex flex-column" style={{ width: "320px" }}>
          {data?.image ? (
            <RegionSelector image={data.image} />
          ) : (
            <h6 className="text-muted">No image yet.</h6>
          )}
        </div>
      </td>
    </tr>
  );
};

export { SlideRow };
