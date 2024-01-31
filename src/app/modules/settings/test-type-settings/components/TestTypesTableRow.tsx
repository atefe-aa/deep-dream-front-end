import { FC } from "react";
import { KTIcon } from "../../../../../_metronic/helpers";
import { title } from "process";
import { DropDownButton } from "../../../../ui/dropdown/DropDownButton";
import { TestTypesModel } from "../core/_models";


type Props = {
  testTypeData: TestTypesModel;
  index: number;
};

const TestTypesTableRow: FC<Props> = ({ testTypeData, index }) => {
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
          <DropDownButton>
            <div className="menu-item px-3">
              <a href="#" className="menu-link px-3">
                <KTIcon iconName="pencil" className="fs-3 me-3" />
                Edit Info
              </a>
            </div>
            <div className="menu-item px-3 my-1">
              <a
                href="#"
                className="menu-link px-3 text-danger "
                data-bs-toggle="tooltip"
                title="Delete Test Type"
              >
                <KTIcon iconName="trash" className="fs-3 me-3" />
                Delete Test Type
              </a>
            </div>
          </DropDownButton>
        </div>
      </td>
    </tr>
  );
};

export { TestTypesTableRow };
