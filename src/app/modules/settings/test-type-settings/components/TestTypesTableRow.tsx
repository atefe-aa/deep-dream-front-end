import { FC } from "react";
import { KTIcon } from "../../../../../_metronic/helpers";
import { title } from "process";
import { DropDownButton } from "../../../../ui/dropdown/DropDownButton";
import { TestTypesModel } from "../core/_models";
import { useDeleteTestType } from "../hooks/useDeleteTestType";
import { CustomDropdown } from "../../../../ui/dropdown/CustomDropdown";
import { Dropdown } from "react-bootstrap";
import { ConfirmModal } from "../../../../ui/modals/ConfirmModal";
import { EditTestType } from "./EditTestType";


type Props = {
  testTypeData: TestTypesModel;
  index: number;
};

const TestTypesTableRow: FC<Props> = ({ testTypeData, index }) => {
  const { isDeleting, deleteTestType } = useDeleteTestType();
  function handleDelete() {
    deleteTestType(testTypeData.id);
  }

  return (
    <tr>
      <td>
        <div className="">
          {index}
        </div>
      </td>
      <td>
        <div className="">
          <div className="d-flex justify-content-start flex-column">
            <a
              href="#"
              className="text-gray-900 fw-bold text-hover-primary fs-6"
            >
              {testTypeData.title}
            </a>
          </div>
        </div>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.code}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.gender}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.type}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.numberOfLayers}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.z  || "default"}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.condenser || "default"}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.brightness  || "default"}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.magnification}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.description}
        </a>
      </td>
      <td>
        <div className="d-flex justify-content-end flex-shrink-0">
        <CustomDropdown>
            <Dropdown.Item
              data-bs-toggle="modal"
              data-bs-target={`#edit_test_type_info${testTypeData.id}`}
            >
              <KTIcon iconName="pencil" className="fs-3 me-3" />
              Edit Info
            </Dropdown.Item>

            <Dropdown.Item
              className="text-danger "
              data-bs-toggle="modal"
              data-bs-target={`#confirm_delete_test_type${testTypeData.id}`}
            >
              <KTIcon iconName="trash" className="fs-3 me-3" />
              Delete Test Type
            </Dropdown.Item>
          </CustomDropdown>

            {/* modals */}
            <ConfirmModal
            actionName={`delete_test_type${testTypeData.id}`}
            onConfirm={handleDelete}
            isLoading={isDeleting}
            message={`Are you sure, you want to delete ${testTypeData.title}?`}
          />
          <EditTestType testTypeId={testTypeData.id} />
        </div>
      </td>
    </tr>
  );
};

export { TestTypesTableRow };
