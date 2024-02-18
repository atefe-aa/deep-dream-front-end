import { FC } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { CustomDropdown } from "../../../ui/dropdown/CustomDropdown";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TestsModel } from "../core/_models";

type Props = {
  data: TestsModel;
};

const TestsTableDropdown: FC<Props> = ({ data }) => {
  const queryStr = `?project=${data.project}&image=${data.img}`;
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
        {data.img && data.project && (
          <Dropdown.Item>
            <Link
              to={`/image${queryStr}`}
              className="text-gray-900  text-hover-primary fs-6"
            >
              <KTIcon iconName="eye" className="fs-3 me-3" />
              View Image
            </Link>
          </Dropdown.Item>
        )}
        <Dropdown.Item
          data-bs-toggle="modal"
          // data-bs-target={`#edit_media${labData.id}`}
        >
          <KTIcon iconName="document" className="fs-3 me-3" />
          Download Report
        </Dropdown.Item>
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
          data-bs-target={`#confirm_delete_test${data.id}`}
        >
          <KTIcon iconName="trash" className="fs-3 me-3" />
          Delete Test
        </Dropdown.Item>
      </CustomDropdown>
    </>
  );
};

export { TestsTableDropdown };
