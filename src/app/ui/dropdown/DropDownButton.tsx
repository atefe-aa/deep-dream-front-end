import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DropDownButton: React.FC<Props> = ({ children }) => {

  return (
    <div className="me-0" data-bs-toggle="tooltip" title="More Options">
      <div
        className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="top-end"
      >
        <i className="bi bi-three-dots fs-3"></i>
      </div>
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3"
        data-kt-menu="true"
      >
        {children}
      </div>
    </div>
  );
};

export { DropDownButton };
