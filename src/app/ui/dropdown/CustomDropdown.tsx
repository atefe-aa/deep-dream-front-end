import React, { ReactNode } from "react";
import { Dropdown } from "react-bootstrap";

interface Props {
  children: ReactNode;
}

const CustomDropdown: React.FC<Props> = ({ children }) => {
  return (
    <div className="me-0">
      <Dropdown>
        <Dropdown.Toggle
         data-bs-toggle="tooltip" title="More Options"
          bsPrefix="none"
          className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
          variant="none"
          id="dropdown-basic"
        >
          <i className="bi bi-three-dots fs-3"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu flip={true} className=" fw-bold w-200px py-3">
          {children}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export  {CustomDropdown};
