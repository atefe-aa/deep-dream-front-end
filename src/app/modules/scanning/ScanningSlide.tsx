import React, { FC } from "react";
import { RegionSelector } from "./RegionSelector";

type Props = {
  start: Function;
};

const ScanningSlide: React.FC<Props> = ({ start }) => {
  return (
    <div className="card-body scroll-y  pt-0 pb-15">
      <div className="text-center mb-5">
        <h3 className="mb-3">Select Scanning Area</h3>
      </div>
      <div className=" text-center">
        {/* begin::Action */}
        <div className=" mb-5">
          <button onClick={() => start()} className="btn btn-sm btn-primary">
            <span className="indicator-label">Confirm</span>
          </button>
        </div>
        {/* end::Action */}
        <div className="">

        <RegionSelector />
        </div>
      </div>
    </div>
  );
};

export { ScanningSlide };
