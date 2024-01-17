import { KTIcon } from "../../../_metronic/helpers";

function ManualSettings() {
  return (
    <div className="col-lg-4 col-lx-3 h-100 d-flex ">
      <div className="card h-100 w-100">
        {/* begin:: X Y Z axis settings */}
        <div className="d-flex align-items-center justify-content-around border rounded m-2  p-2">
          <div>
            <div className="d-flex justify-content-center mb-2">
              <div className="btn btn-icon btn-sm btn-primary btn-active-light">
                {/* <KTIcon iconName="arrow-up" className="fs-5 text-lg-1" /> */}
                +Z
              </div>
            </div>
            <div className=" ">
              <div className="btn py-6 border btn-active-light d-flex flex-column fs-8 ">
                <span>Z : 20</span>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <div className="btn btn-icon btn-sm btn-primary btn-active-light">
                {/* <KTIcon iconName="arrow-down" className="fs-5 text-lg-1" /> */}
                -Z
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-center mb-2">
              <div className="btn btn-icon btn-sm btn-success btn-active-light">
                {/* <KTIcon iconName="arrow-up" className="fs-5 text-lg-1" /> */}
                +Y
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between ">
              <div className="me-2 ">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  -X
                  {/* <KTIcon iconName="arrow-left" className="fs-5 text-lg-1" /> */}
                </div>
              </div>
              <div className=" ">
                <div className="btn border btn-active-light d-flex flex-column fs-8 ">
                  <span>X : 20</span>
                  <span>Y : 0</span>
                </div>
              </div>
              <div className="ms-2 ">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  +X
                  {/* <KTIcon iconName="arrow-right" className="fs-5 text-lg-1" /> */}
                </div>
              </div>
            </div>
            <div className="d-flex  justify-content-center mt-2">
              <div className="btn btn-icon btn-sm btn-success btn-active-light">
                -Y
                {/* <KTIcon iconName="arrow-down" className="fs-5 text-lg-1" /> */}
              </div>
            </div>
          </div>
        </div>
        {/* end:: X Y Z axis settings */}

        {/* begin:: magnifications and condenseur settings */}
        <div className="d-flex align-items-center justify-content-around border rounded m-2 p-2">
          <div>
            <div className="d-flex justify-content-center mb-2">
              <div className="btn btn-icon btn-sm btn-primary btn-active-light">
                {/* <KTIcon iconName="arrow-up" className="fs-5 text-lg-1" /> */}
                +B
              </div>
            </div>
            <div className=" ">
              <div className="btn py-6 border btn-active-light d-flex flex-column fs-8 ">
                <span>B : 20</span>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <div className="btn btn-icon btn-sm btn-primary btn-active-light">
                {/* <KTIcon iconName="arrow-down" className="fs-5 text-lg-1" /> */}
                -B
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-center mb-2">
              <div className="btn btn-icon btn-sm btn-info btn-active-light">
                {/* <KTIcon iconName="arrow-up" className="fs-5 text-lg-1" /> */}
                2X
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between ">
              <div className="me-2 ">
                <div className="btn btn-icon btn-sm btn-success btn-active-light">
                  10X
                  {/* <KTIcon iconName="arrow-left" className="fs-5 text-lg-1" /> */}
                </div>
              </div>
              <div className=" ">
                <div className="btn border py-6 btn-active-light d-flex flex-column fs-8 ">
                  <span>2X</span>
                </div>
              </div>
              <div className="ms-2 ">
                <div className="btn btn-icon btn-sm btn-danger btn-active-light">
                  100X
                  {/* <KTIcon iconName="arrow-right" className="fs-5 text-lg-1" /> */}
                </div>
              </div>
            </div>
            <div className="d-flex  justify-content-center mt-2">
              <div className="btn btn-icon btn-sm btn-warning btn-active-light">
                40X
                {/* <KTIcon iconName="arrow-down" className="fs-5 text-lg-1" /> */}
              </div>
            </div>
          </div>
        </div>
        {/* end::magnifications and condenseur settings */}

        {/* begin:: form ranges settings */}
        <div className="d-flex flex-column align-items-center justify-content-around border rounded m-2 p-4">
          <div className="d-flex">
            <label htmlFor="xymicrostep" className="form-label min-w-150px">
              X & Y microstep
            </label>
            <input
              type="range"
              className="form-range "
              min="0"
              max="5"
              step="0.5"
              id="xymicrostep"
              name="xymicrostep"
            />
          </div>
          <div className="d-flex">
            <label htmlFor="xymicrostep" className="form-label min-w-150px">
              Z microstep
            </label>
            <input
              type="range"
              className="form-range "
              min="0"
              max="5"
              step="0.5"
              id="xymicrostep"
              name="xymicrostep"
            />
          </div>
          <div className="d-flex">
            <label htmlFor="xymicrostep" className="form-label min-w-150px">
              B microstep
            </label>
            <input
              type="range"
              className="form-range "
              min="0"
              max="5"
              step="0.5"
              id="xymicrostep"
              name="xymicrostep"
            />
          </div>
        </div>
        {/* end::form ranges settings */}

        {/* begin::Brightness settings */}
        <div className="d-flex flex-column align-items-center justify-content-around border rounded m-2  p-4">
          <div className="d-flex align-items-center ">
            <label className="form-label me-4" htmlFor="brightness">
              Brightness
            </label>
            <input
              type="number"
              className="form-control form-control-sm "
              id="brightness"
              name="brightness"
              placeholder="Enter Brightness %"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualSettings;
