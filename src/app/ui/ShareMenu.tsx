import { FC } from "react";
import { toAbsoluteUrl, useIllustrationsPath } from "../../_metronic/helpers";

type Props = {
  backgrounUrl: string;
};

const ShareMenu: FC<Props> = ({ backgrounUrl }) => (
  <div
    className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px"
    data-kt-menu="true"
  >
    <div
      className="d-flex flex-column bgi-no-repeat rounded-top"
      style={{ backgroundImage: `url('${toAbsoluteUrl(backgrounUrl)}')` }}
    >
      <h3 className="text-white fw-bold px-9 mt-10 mb-6">
        Share with your colleagues
      </h3>
    </div>

    <div className="tab-content">
      <div
        className="tab-pane fade show active"
        id="kt_topbar_notifications_2"
        role="tabpanel"
      >
        <div className="d-flex flex-column px-9">
          <div className="pt-10 pb-0">
            <h3 className="text-gray-900 text-center fw-bolder">
              Select a colleage
            </h3>

            <div className="text-center text-gray-600 fw-bold pt-1">
              Select a colleage to send a link to this test.
            </div>

            <select className="form-select my-6">
              <option disabled>Select a colleague</option>
              <option>Dr. Ahmadi</option>
              <option>Dr. Nasr</option>
              <option>Dr. Mansouri</option>
              <option>Dr. Soltani</option>
            </select>
            <div className="text-center mt-5 mb-9">
              <a
                href="#"
                className="btn btn-sm btn-primary px-6"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_upgrade_plan"
              >
                Send
              </a>
            </div>
          </div>

          <div className="text-center px-4">
            <img
              className="mw-100 mh-200px"
              alt="metronic"
              src={useIllustrationsPath("1.png")}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { ShareMenu };
