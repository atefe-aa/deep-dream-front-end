import React from "react";
import { useLocation } from "react-router-dom";
import { Dropdown } from "../Dropdown";

const DropDownButton: React.FC = () => {
  const location = useLocation();

  return (
    <div className="me-0" data-bs-toggle="tooltip" title="More Options">
      <button
        className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="top-end"
      >
        <i className="bi bi-three-dots fs-3"></i>
      </button>
      <Dropdown />
    </div>
  );
};

export { DropDownButton };
