import { FC } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { CustomDropdown } from "../../../ui/dropdown/CustomDropdown";
import { Dropdown } from "react-bootstrap";

type Props = {
  img?: string;
};

const TestsTableDropdown: FC<Props> = ({ img }) => {
  return (
    <>
      <CustomDropdown>
        <Dropdown.Item
          data-bs-toggle="modal"
          // data-bs-target={`#edit_info${labData.id}`}
        >
          <KTIcon iconName="pencil" className="fs-3 me-3" />
          Edit Info
        </Dropdown.Item>
        <Dropdown.Item
          data-bs-toggle="modal"
          // data-bs-target={`#edit_media${labData.id}`}
        >
          <KTIcon iconName="printer" className="fs-3 me-3" />
          Print Label
        </Dropdown.Item>
        <Dropdown.Item
          data-bs-toggle="modal"
          // data-bs-target={`#edit_media${labData.id}`}
        >
          <a href={img} className="text-gray-900  text-hover-primary fs-6" >
            <KTIcon iconName="eye" className="fs-3 me-3" />
            View Image
          </a>
        </Dropdown.Item>
        <Dropdown.Item
          data-bs-toggle="modal"
          // data-bs-target={`#edit_media${labData.id}`}
        >
          <KTIcon iconName="document" className="fs-3 me-3" />
          Download Report
        </Dropdown.Item>{" "}
        <Dropdown.Item
          data-bs-toggle="modal"
          // data-bs-target={`#edit_media${labData.id}`}
        >
          <KTIcon iconName="picture" className="fs-3 me-3" />
          View Slide Image
        </Dropdown.Item>
        <Dropdown.Item
          className="text-danger "
          data-bs-toggle="modal"
          // data-bs-target={`#confirm_delete${labData.id}`}
        >
          <KTIcon iconName="trash" className="fs-3 me-3" />
          Delete Test
        </Dropdown.Item>
      </CustomDropdown>
    </>
  );
};

export { TestsTableDropdown };
