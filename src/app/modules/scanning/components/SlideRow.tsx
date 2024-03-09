import React, { useEffect, useState } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { RegionSelector } from "./RegionSelector";
import { DropDownButton } from "../../../ui/dropdown/DropDownButton";

import { useScan } from "../hooks/useScan";
import { Dropdown, Spinner } from "react-bootstrap";
import { AreaModel, ScanModel, SlideModel } from "../core/_models";
import { usePusher } from "../../hooks/usePusher";
import { getProgressUI } from "../../../utils/helper";
import useHandleUpdateScan from "../hooks/useHandleUpdateScan";
import Timer from "./Timer";
import { CustomDropdown } from "../../../ui/dropdown/CustomDropdown";

const initialScanData = {
  testId: 0,
  slideNumber: 0,
  id: 0,
};
type Props = {
  slide: SlideModel;
  formik: any;
  scan: ScanModel;
  handleCheckboxChange: Function;
  handleSetAreas: (scanId: number, regions: AreaModel[]) => void;
};

const SlideRow: React.FC<Props> = ({
  slide,
  formik,
  scan, // This might be undefined if no matching scan is found
  handleSetAreas,
  handleCheckboxChange,
}) => {
  // Safely handle potentially undefined scan object
  const safeScanId = scan?.id || 0; // Use 0 or some safe fallback value if scan is undefined

  const { handleUpdateScan, isUpdating } = useHandleUpdateScan(
    slide.nth,
    safeScanId, // Use the safe ID
    initialScanData
  );

  const { scan: liveScan } = usePusher(`scan.${safeScanId}`, "ScanUpdated"); // Use the safe ID
  const [tableData, setTableData] = useState<ScanModel>();

  useEffect(() => {
    if (scan && safeScanId !== 0 && liveScan === undefined) {
      setTableData(scan);
    }
  }, [scan, liveScan]);

  useEffect(() => {
    if (liveScan !== undefined && !isEqual(liveScan, tableData)) {
      setTableData(liveScan);
    }
  }, [liveScan]);

  function isEqual<T>(obj1: T, obj2: T): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  const { progressBg, progressPercent } = getProgressUI(
    tableData?.progress || ""
  );
  
  return (
    <tr>
      <td className="text-center">
        <div className="form-check form-check-sm form-check-custom form-check-solid">
          <input
            {...formik.getFieldProps("selectedCheckboxes")}
            checked={
              (!scan || !scan.id) &&
              (formik.values.selectAll ||
                formik.values.selectedCheckboxes.includes(slide.nth))
            }
            onChange={handleCheckboxChange}
            disabled={scan && safeScanId !== 0}
            className="form-check-input widget-9-check"
            type="checkbox"
            value={slide.nth}
            id={`slide${slide.nth}`}
          />
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          <div className="text-gray-900 fw-bold text-hover-primary fs-6">
            {slide.nth}
          </div>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          {scan && tableData?.testNumber ? (
            <div className="text-gray-900 fw-bold text-hover-primary fs-6">
              {tableData?.testNumber}
            </div>
          ) : (
            scan &&
            scan.id &&
            !tableData?.testNumber &&
            tableData?.progress === "2x-scanned" && (
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
          {scan && tableData?.slideNumber ? (
            <div className="text-gray-900 fw-bold text-hover-primary fs-6">
              {tableData?.slideNumber}
            </div>
          ) : (
            scan &&
            scan.id &&
            !tableData?.testNumber &&
            tableData?.progress === "2x-scanned" && (
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
          <div className="text-gray-900 fw-bold text-hover-primary fs-6">
            {scan && tableData?.testType}
          </div>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          <div className="text-gray-900 fw-bold text-hover-primary fs-6">
            {scan && tableData?.laboratory}
          </div>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex flex-column w-100 me-2">
          <div className="d-flex flex-stack mb-2">
            <span className="text-muted me-2 fs-7 fw-semibold">
              {tableData?.progress?.replace(/-/g, " ")}
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
      {/* start::Time Left */}
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          {tableData &&
            tableData?.secondsLeft &&
            tableData?.progress === "scanning" && (
              <Timer secondsLeft={tableData?.secondsLeft} />
            )}
        </div>
      </td>
      {/* end::Time Left */}
      {/* start::Durations */}
      <td className="text-center">
        <div className="d-flex justify-content-start flex-column">
          <div className="text-gray-900 fw-bold text-hover-primary fs-6">
            {tableData?.duration && Math.round(tableData?.duration / 60)}
          </div>
        </div>
      </td>
      {/* end::Durations */}
      <td className="text-center">
        {/* Actions */}
        <div className="d-flex justify-content-end flex-shrink-0">
          <CustomDropdown>
            {tableData?.progress === "ready" && (
              <Dropdown.Item>
                <div className="text-gray-900  text-hover-primary fs-6">
                  <KTIcon iconName="to-right" className="fs-3 me-3" />
                  Start Scanning
                </div>
              </Dropdown.Item>
            )}
            {tableData?.progress === "scanned" && (
              <Dropdown.Item onClick={() => window.open("http://magic.deepdream.ir/#/storage", "_blank")}>
              <div className="text-gray-900  text-hover-primary fs-6">
                <KTIcon iconName="exit-up" className="fs-3 me-3" />
                Upload Images
              </div>
            </Dropdown.Item>
            )}
            {/* Try Again Action */}
            {tableData?.progress === "failed" && (
              <Dropdown.Item>
                <KTIcon iconName="arrows-circle" className="fs-3 me-3" />
                Try Again
              </Dropdown.Item>
            )}

            <Dropdown.Item>
              <div
                className="text-danger "
                data-bs-toggle="tooltip"
                title="Delete Test Price"
              >
                <KTIcon iconName="trash" className="fs-3 me-3" />
                Delete Slide
              </div>
            </Dropdown.Item>
          </CustomDropdown>
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex flex-column " style={{ width: "max-content" }}>
          {tableData?.slideImage ? (
            <RegionSelector
              handleSetAreas={handleSetAreas}
              scan={scan}
              image={tableData.slideImage}
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
