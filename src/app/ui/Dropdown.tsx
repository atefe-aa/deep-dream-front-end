import { FC } from "react";
import { KTIcon } from "../../_metronic/helpers";

const Dropdown: FC = () => {
  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <a href="#" className="menu-link px-3">
          <KTIcon iconName="pencil" className="fs-3 me-3" />
          Edit Info
        </a>
      </div>

      <div className="menu-item px-3">
        <a href="#" className="menu-link px-3">
          <KTIcon iconName="document" className="fs-3 me-3" />
          Download Report
        </a>
      </div>

      <div className="menu-item px-3">
        <a
          href="http://cytomine.local/#/project/3609/image/4107/slice/4108?viewer=izoeau5m2"
          className="menu-link px-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <KTIcon iconName="eye" className="fs-3 me-3" />
          View Image
        </a>
      </div>

      <div className="menu-item px-3 my-1">
        <a
          href="#"
          className="menu-link px-3 text-danger "
          data-bs-toggle="tooltip"
          title="Delete Test"
        >
          <KTIcon iconName="trash" className="fs-3 me-3" />
          Delete Test
        </a>
      </div>
    </div>
  );
};

export { Dropdown };
