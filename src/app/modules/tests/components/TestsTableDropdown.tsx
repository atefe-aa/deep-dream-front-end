import { FC } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { DropDownButton } from "../../../ui/dropdown/DropDownButton";

const TestsTableDropdown: FC = () => {
  return (
    <DropDownButton>
      <div className="menu-item px-3">
        <a href="#" className="menu-link px-3">
          <KTIcon iconName="pencil" className="fs-3 me-3" />
          Edit Info
        </a>
      </div>

      <div className="menu-item px-3">
        <a href="#" className="menu-link px-3">
          <KTIcon iconName="printer" className="fs-3 me-3" />
          Print Label
        </a>
      </div>

      <div className="menu-item px-3">
        <a
          href="http://magic.deepdream.ir/#/project/161/image/15163/slice/15164?viewer=6y64q4v83"
          className="menu-link px-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <KTIcon iconName="eye" className="fs-3 me-3" />
          View Image
        </a>
      </div>

      <div className="menu-item px-3">
        <a href="#" className="menu-link px-3">
          <KTIcon iconName="document" className="fs-3 me-3" />
          Download Report
        </a>
      </div>

      <div className="menu-item px-3">
        <a href="#" className="menu-link px-3">
          <KTIcon iconName="picture" className="fs-3 me-3" />
          View Slide Image
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
    </DropDownButton>
  );
};

export { TestsTableDropdown };
