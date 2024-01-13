import { KTIcon } from "../../../_metronic/helpers";

function ManualModePage() {
  return (
    <div className="row gy-5 g-xxl-8 ">
      {/* begin::Col */}
      <div className="col-lg-8 col-lx-9">
        <div className="card  h-500px d-flex align-items-center justify-content-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              className="w-100px"
              src="media\img\camera-off.png"
              alt="Camera Off"
            />
            <span className="fs-2 text-muted">Camera is off.</span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-lx-3">
        <div className="card ">
          {/* begin:: X axis settings */}
          <div className="d-flex align-items-center justify-content-between border rounded m-2 p-2">
            <div>
              <span className="fs-5 fw-bold me-3">X :</span>
              <span className="fs-5">20 cm</span>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center me-3">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-left" className="fs-5 text-lg-1" />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-right" className="fs-5 text-lg-1" />
                </div>
              </div>
            </div>
          </div>
          {/* end:: X axis settings */}

          {/* begin:: Y axis settings */}
          <div className="d-flex align-items-center justify-content-between border rounded m-2 p-2">
            <div>
              <span className="fs-5 fw-bold me-3">Y :</span>
              <span className="fs-5">0 cm</span>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center me-3">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-up" className="fs-5 text-lg-1" />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-down" className="fs-5 text-lg-1" />
                </div>
              </div>
            </div>
          </div>
          {/* end:: Y axis settings */}

          {/* begin:: Z axis settings */}
          <div className="d-flex align-items-center justify-content-between border rounded m-2 p-2">
            <div>
              <span className="fs-5 fw-bold me-3">Z :</span>
              <span className="fs-5">10 cm</span>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center me-3">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-up" className="fs-5 text-lg-1" />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-down" className="fs-5 text-lg-1" />
                </div>
              </div>
            </div>
          </div>
          {/* end:: Z axis settings */}

          {/* begin:: Condenseur settings */}
          <div className="d-flex align-items-center justify-content-between border rounded m-2 p-2">
            <div>
              <span className="fs-5 fw-bold me-3">Condenseur :</span>
              <span className="fs-5">20 cm</span>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center me-3">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-up" className="fs-5 text-lg-1" />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-down" className="fs-5 text-lg-1" />
                </div>
              </div>
            </div>
          </div>
          {/* end:: Condenseur settings */}

          {/* begin::2X Field lense settings */}
          <div className="d-flex align-items-center justify-content-between border rounded m-2 p-2">
            <div>
              <span className="fs-5 fw-bold me-3">2X :</span>
              <span className="fs-5">20 degree</span>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center me-3">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-up" className="fs-5 text-lg-1" />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-down" className="fs-5 text-lg-1" />
                </div>
              </div>
            </div>
          </div>
          {/* end::2X Field lense settings */}

          {/* begin::10X Field lense settings */}
          <div className="d-flex align-items-center justify-content-between border rounded m-2 p-2">
            <div>
              <span className="fs-5 fw-bold me-3">10X :</span>
              <span className="fs-5">20 degree</span>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center me-3">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-up" className="fs-5 text-lg-1" />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-down" className="fs-5 text-lg-1" />
                </div>
              </div>
            </div>
          </div>
          {/* end::10x Field lense settings */}

          {/* begin::40x Field lense settings */}
          <div className="d-flex align-items-center justify-content-between border rounded m-2 p-2">
            <div>
              <span className="fs-5 fw-bold me-3">40X :</span>
              <span className="fs-5">20 degree</span>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center me-3">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-up" className="fs-5 text-lg-1" />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-down" className="fs-5 text-lg-1" />
                </div>
              </div>
            </div>
          </div>
          {/* end::40x Field lense settings */}

          {/* begin::100x Field lense settings */}
          <div className="d-flex align-items-center justify-content-between border rounded m-2 p-2">
            <div>
              <span className="fs-5 fw-bold me-3">100X :</span>
              <span className="fs-5">20 degree</span>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center me-3">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-up" className="fs-5 text-lg-1" />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="btn btn-icon btn-sm btn-info btn-active-light">
                  <KTIcon iconName="arrow-down" className="fs-5 text-lg-1" />
                </div>
              </div>
            </div>
          </div>
          {/* end::100x Field lense settings */}
        </div>
      </div>

      {/* end::Col */}
    </div>
  );
}

export default ManualModePage;
