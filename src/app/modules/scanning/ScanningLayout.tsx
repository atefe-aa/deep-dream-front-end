import React, { FC, useState } from "react";
import { KTIcon } from "../../../helpers";


import { ScanningLabels } from "./ScanningLabels";
import { ScanningSlide } from "./ScanningSlide";
import { SelectSlides } from "./SelectSlides";

const ScanningLayout: FC = () => {
  const [scanningLabels, setScanningLabels] = useState(false);
  const [startAction, setStartAction] = useState(false);
  return (
    <>
      <div
        className="modal fade"
        id="kt_modal_start_scanning"
        aria-hidden="true"
      >
        <div className="modal-dialog mw-650px">
          <div className="modal-content">
            <div className="modal-header pb-0 border-0 justify-content-end">
              <div
                className="btn btn-sm btn-icon btn-active-color-primary"
                data-bs-dismiss="modal"
              >
                <KTIcon iconName="cross" className="fs-1" />
              </div>
            </div>

            <div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
              <div className="text-center mb-13">
                <h1 className="mb-3">Scanning Proccess</h1>

                <div className="text-muted fw-bold fs-5">
                  If you need more info, please check out
                  <a href="#" className="link-primary fw-bolder">
                    {" "}
                    FAQ Page
                  </a>
                  .
                </div>
              </div>
              {scanningLabels ? (
                <ScanningLabels startAction={() => setStartAction(true)} />
              ) : (
                <SelectSlides start={() => setScanningLabels(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
      <ScanningSlide start={() => setScanningLabels(true)} />
    </>
  );
};

export { ScanningLayout };
