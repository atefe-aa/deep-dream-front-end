import { FC } from "react";
import { DropDownButton } from "../../../../ui/dropdown/DropDownButton";
import { KTIcon } from "../../../../../_metronic/helpers";
import { CounsellorModel } from "../core/_models";
import { useDeleteCounsellor } from "../hooks/useDeleteCounsellor";
import { ConfirmModal } from "../../../../ui/modals/ConfirmModal";
import { CustomDropdown } from "../../../../ui/dropdown/CustomDropdown";
import { Dropdown } from "react-bootstrap";
import { EditCounsellor } from "./EditCounsellor";

type Props = {
  counsellorData: CounsellorModel;
  index: number;
};

const CounsellorTableRow: FC<Props> = ({ counsellorData, index }) => {
  const { isDeleting, deleteCounsellor } = useDeleteCounsellor();
  function handleDelete() {
    if(counsellorData.id)
    deleteCounsellor(counsellorData.id);
  }
  return (
    <tr>
      <td>
        <div className="form-check form-check-sm form-check-custom form-check-solid">
          {index}
        </div>
      </td>
      <td>
        <div className="d-flex flex-column">
          <div  className="text-gray-800 text-hover-primary mb-1">
            {counsellorData.name}
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex flex-column">
          <div  className="text-gray-800 text-hover-primary mb-1">
            {counsellorData.labName}
          </div>
        </div>
      </td>
      <td>
        <div
          
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {counsellorData.phone}
        </div>
      </td>
      <td>
        <div
          
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {counsellorData.description}
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-end flex-shrink-0">
        <CustomDropdown>
            <Dropdown.Item
              data-bs-toggle="modal"
              data-bs-target={`#edit_counsellor_info${counsellorData.id}`}
            >
              <KTIcon iconName="pencil" className="fs-3 me-3" />
              Edit Info
            </Dropdown.Item>

            <Dropdown.Item
              className="text-danger "
              data-bs-toggle="modal"
              data-bs-target={`#confirm_delete_counsellor${counsellorData.id}`}
            >
              <KTIcon iconName="trash" className="fs-3 me-3" />
              Delete Counsellor
            </Dropdown.Item>
          </CustomDropdown>

            {/* modals */}
            <ConfirmModal
            actionName={`delete_counsellor${counsellorData.id}`}
            onConfirm={handleDelete}
            isLoading={isDeleting}
            message={`Are you sure, you want to delete ${counsellorData.name}?`}
          />
          <EditCounsellor counsellorData={counsellorData} />
        </div>
      </td>
    </tr>
  );
};

export { CounsellorTableRow };
