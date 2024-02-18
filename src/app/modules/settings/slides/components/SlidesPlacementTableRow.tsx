import { FC } from "react";
import { KTIcon } from "../../../../../_metronic/helpers";
import { CustomDropdown } from "../../../../ui/dropdown/CustomDropdown";
import { Dropdown } from "react-bootstrap";
import { ConfirmModal } from "../../../../ui/modals/ConfirmModal";
import { useDeleteSlide } from "../hooks/useDeleteSlide";
import { EditSlide } from "./EditSlide";
import { SlideModel } from "../../../scanning/core/_models";

type Props = {
  data: SlideModel;
  index: number;
};

const SlidesPlacementTableRow: FC<Props> = ({ data, index }) => {
  const { isDeleting, deleteSlide } = useDeleteSlide();
  function handleDelete() {
    deleteSlide(data.id);
  }
  return (
    <tr>
      <td>
        <div className="form-check form-check-sm form-check-custom form-check-solid">
          {index}
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-start flex-column">
          <a href="#" className="text-gray-900 fw-bold text-hover-primary fs-6">
            {data.nth}
          </a>
        </div>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {data.sw_x}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {data.sw_y}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {data.ne_x}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {data.ne_y}
        </a>
      </td>
      <td>
        <div className="d-flex justify-content-end flex-shrink-0">
          <CustomDropdown>
            <Dropdown.Item
              data-bs-toggle="modal"
              data-bs-target={`#edit_slide_info${data.id}`}
            >
              <KTIcon iconName="pencil" className="fs-3 me-3" />
              Edit Info
            </Dropdown.Item>

            <Dropdown.Item
              className="text-danger "
              data-bs-toggle="modal"
              data-bs-target={`#confirm_delete_slide${data.id}`}
            >
              <KTIcon iconName="trash" className="fs-3 me-3" />
              Delete Slide
            </Dropdown.Item>
          </CustomDropdown>

          {/* modals */}
          <ConfirmModal
            actionName={`delete_slide${data.id}`}
            onConfirm={handleDelete}
            isLoading={isDeleting}
            message={`Are you sure, you want to delete Slide ${data.nth}?`}
          />
          <EditSlide slideData={data} />
        </div>
      </td>
    </tr>
  );
};

export { SlidesPlacementTableRow };
