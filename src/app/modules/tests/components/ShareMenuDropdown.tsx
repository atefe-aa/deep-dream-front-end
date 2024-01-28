import { FC, ReactNode } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { Dropdown } from "react-bootstrap";


type Props = {
  children: ReactNode;
};

const ShareMenuDropdown: FC<Props> = ({ children }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        data-bs-toggle="tooltip"
        title="More Options"
        bsPrefix="none"
        className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary me-2"
        variant="none"
        id="dropdown"
      >
        <KTIcon iconName="share" className="fs-3" />
      </Dropdown.Toggle>

      <Dropdown.Menu flip={true} className=" fw-bold mh-360px  fw-bold  w-350px w-lg-375px">
        {children}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { ShareMenuDropdown };
