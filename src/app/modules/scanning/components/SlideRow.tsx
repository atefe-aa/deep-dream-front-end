import React, { useEffect, useState } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { RegionSelector } from "./RegionSelector";
import { DropDownButton } from "../../../ui/dropdown/DropDownButton";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useScan } from "../hooks/useScan";
import { useUpdateScan } from "../hooks/useUpdateScan";
import { Spinner } from "react-bootstrap";
import { AreaModel, SlideModel } from "../core/_models";
declare global {
  interface Window {
    Echo: Echo;
    Pusher: typeof Pusher;
  }
}
window.Pusher = Pusher;

type Props = {
  slide: SlideModel;
  formik: any;
  handleCheckboxChange: Function;
  handleSetAreas: (scanId: number, regions: AreaModel[]) => void;
};

const SlideRow: React.FC<Props> = ({
  slide,
  formik,
  handleSetAreas,
  handleCheckboxChange,
}) => {
  const { scan, isLoading } = useScan(slide.nth);
  const [scanData, setScanData] = useState({
    testId: 0,
    slideNumber: 0,
    id: scan?.id,
  });
  const { updateScan, isUpdating } = useUpdateScan(slide.nth);

  function handleUpdateScan(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    const numericValue = parseInt(value, 10); // Convert value to a number
    if (name === "testId" || name === "slideNumber") {
      setScanData((prev) => ({ ...prev, [name]: numericValue, id: scan?.id }));
    }
  }

  useEffect(() => {
    if (scanData.slideNumber > 0 && scanData.testId > 0) {
      updateScan(scanData);
    }
  }, [scanData, updateScan]);

  // const [scanningStatus, setScanningStatus] = useState("");
  // usePusher(`slides.${slide.nth}`, 'FullSlideScanned', (data: any) => {
  //   setScanningStatus(data.data.error);
  // });

  let progressPercent = 0;
  let progressBg = "info";
  if (!isLoading && scan) {
    switch (scan.progress) {
      case "ready":
        progressPercent = 5;
        progressBg = "warning";
        break;
      case "scanning":
        progressPercent = 50;
        progressBg = "primary";
        break;
      case "2x-scanned":
        progressPercent = 50;
        progressBg = "success";
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
  }
  if (isLoading) {
    return (
      <tr>
        <td colSpan={20} className="text-center">
          <span className="text-muted"> Loading...</span>
          <Spinner animation="border" size="sm" />
        </td>
      </tr>
    ); // Or any other loading indicator
  }
  return (
    <tr>
      <td className="text-center">
        <div className="form-check form-check-sm form-check-custom form-check-solid">
          <input
            {...formik.getFieldProps("selectedCheckboxes")}
            checked={
              ((!isLoading && !scan) || !scan.id) &&
              (formik.values.selectAll ||
                formik.values.selectedCheckboxes.includes(slide.nth))
            }
            onChange={handleCheckboxChange}
            disabled={!isLoading && scan && scan.id}
            className="form-check-input widget-9-check"
            type="checkbox"
            value={slide.nth}
            id={`slide${slide.nth}`}
          />
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {slide.nth}
          </a>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          {scan && scan?.testNumber ? (
            <a
              href="#"
              className="text-gray-900 fw-bold text-hover-primary fs-6"
            >
              {scan.testNumber}
            </a>
          ) : (
            scan &&
            scan.id &&
            !scan.testNumber && scan.progress === '2x-scanned' && (
              <input
                type="number"
                min={0}
                autoComplete="off"
                placeholder="Enter Test Number"
                onBlur={handleUpdateScan}
                disabled={isUpdating}
                name="testId"
                className="p-2 rounded text-center w-80px bg-transparent"
              />
            )
          )}
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          {scan && scan?.slideNumber ? (
            <a
              href="#"
              className="text-gray-900 fw-bold text-hover-primary fs-6"
            >
              {scan.slideNumber}
            </a>
          ) : (
            scan &&
            scan.id &&
            !scan.testNumber && scan.progress === '2x-scanned' && (
              <input
                type="number"
                min={0}
                autoComplete="off"
                placeholder="Enter Slide Number"
                onBlur={handleUpdateScan}
                disabled={isUpdating}
                name="slideNumber"
                className="p-2 rounded text-center w-80px bg-transparent"
              />
            )
          )}
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {scan && scan.testType}
          </a>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {scan && scan.laboratory}
          </a>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex flex-column w-100 me-2">
          <div className="d-flex flex-stack mb-2">
            <span className="text-muted me-2 fs-7 fw-semibold">
              {scan && scan.progress}
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
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {scan && scan.duration}
          </a>
        </div>
      </td>
      {/* end::Durations */}
      <td className="text-center">
        {/* Actions */}
        <div className="d-flex justify-content-end flex-shrink-0">
          <DropDownButton>
            {/* Start Action */}
            {scan && scan?.progress === "ready" && (
              <div className="menu-item px-3">
                <a href="#" className="menu-link px-3">
                  <KTIcon iconName="to-right" className="fs-3 me-3" />
                  Start Scanning
                </a>
              </div>
            )}

            {/* View Action */}
            {scan && scan?.progress === "scanned" && (
              <div className="menu-item px-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={scan.image}
                  className="menu-link px-3"
                >
                  <KTIcon iconName="eye" className="fs-3 me-3" />
                  View Image
                </a>
              </div>
            )}

            {/* Try Again Action */}
            {scan && scan?.progress === "failed" && (
              <div className="menu-item px-3">
                <a href="#" className="menu-link px-3">
                  <KTIcon iconName="arrows-circle" className="fs-3 me-3" />
                  Try Again
                </a>
              </div>
            )}

            <div className="menu-item px-3 my-1">
              <a
                href="#"
                className="menu-link px-3 text-danger "
                data-bs-toggle="tooltip"
                title="Delete Test Price"
              >
                <KTIcon iconName="trash" className="fs-3 me-3" />
                Delete Slide
              </a>
            </div>
          </DropDownButton>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex flex-column " style={{ width: "max-content" }}>
          {scan && scan?.slideImage ? (
            <RegionSelector
              handleSetAreas={handleSetAreas}
              scanId={scan.id}
              image={scan.slideImage}
            />
          ) : (
            <h6 className="text-muted">No image yet.</h6>
          )}
        </div>
      </td>
    </tr>
  );
};

export { SlideRow };
