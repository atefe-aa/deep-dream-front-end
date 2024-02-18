
import { FC } from "react";
import {
  toAbsoluteUrl,
} from "../../../../_metronic/helpers";
import { SystemPane } from "./SystemPane";
import { AnnotationsPane } from "./AnnotationsPane";

type Props = {
  backgrounUrl: string;
};

const NotificationsMenu: FC<Props> = ({ backgrounUrl }) => {
 

  return (
    <div
      className="menu menu-sub  menu-sub-dropdown menu-column w-350px w-lg-375px"
      data-kt-menu="true"
    >
      <div
        className="d-flex flex-column bgi-no-repeat rounded-top"
        style={{ backgroundImage: `url('${toAbsoluteUrl(backgrounUrl)}')` }}
      >
        <h3 className="text-white fw-bold px-9 mt-10 mb-6">
          Notifications <span className="fs-8 opacity-75 ps-3">24 reports</span>
        </h3>

        <ul className="nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9">
          <li className="nav-item">
            <a
              className="nav-link text-white opacity-75 opacity-state-100 pb-4"
              data-bs-toggle="tab"
              href="#annotations"
            >
              Annotations
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-white opacity-75 opacity-state-100 pb-4 active"
              data-bs-toggle="tab"
              href="#systems"
            >
              System Alerts
            </a>
          </li>
        </ul>
      </div>

      <div className="tab-content">
      <SystemPane />
       <AnnotationsPane />
      </div>
    </div>
  );
};

export { NotificationsMenu };
