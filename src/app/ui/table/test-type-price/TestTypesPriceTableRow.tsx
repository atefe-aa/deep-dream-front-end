import { FC } from "react";
import { KTIcon } from "../../../../_metronic/helpers";

interface TestTypeArray {
  testName: string;
  description: string;
  testPrice: number;
  testExtraPrice: number;
}

type Props = {
  testTypeData: TestTypeArray;
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
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-start flex-column">
            <a
              href="#"
              className="text-gray-900 fw-bold text-hover-primary fs-6"
            >
              {testTypeData.testName}
            </a>
          </div>
        </div>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.testPrice.toLocaleString()}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.testExtraPrice.toLocaleString()}
        </a>
      </td>  <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {testTypeData.description}
        </a>
      </td>
    
      <td>
        <div className="d-flex justify-content-end flex-shrink-0">
          <a
            href="#"
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <KTIcon iconName="pencil" className="fs-3" />
          </a>
          <a
            href="#"
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
          >
            <KTIcon iconName="trash" className="fs-3" />
          </a>
        </div>
      </td>
    </tr>
  );
};

export { TestTypesPriceTableRow };
