import { FC } from "react";
import { DropDownButton } from "../../../../../ui/dropdown/DropDownButton";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { PriceModel } from "../../core/_models";


type Props = {
  testTypeData: PriceModel;
  index: number;
};

const TestTypesPriceTableRow: FC<Props> = ({ testTypeData, index }) => {
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
            {testTypeData.testName}
          </a>
        </div>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.price.toLocaleString()}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.extraPrice.toLocaleString()}
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
                title="Delete Test Price"
              >
                <KTIcon iconName="trash" className="fs-3 me-3" />
                Delete Test Price
              </a>
            </div>
          </DropDownButton>
        </div>
      </td>
    </tr>
  );
};

export { TestTypesPriceTableRow };
