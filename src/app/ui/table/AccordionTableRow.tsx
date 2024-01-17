import { FC } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import { DropDownButton } from "../dropdown/DropDownButton";
import { TestTypesPriceTable } from "./test-type-price/TestTypesPriceTable";

interface TableDataArray {
  id: number;
  labName: string;
  fullName: string;
  phone: string;
  address: string;
  description: string;
  username: string;
  picture: string;
}

type Props = {
  tableData: TableDataArray[];
  index: number;
};

const AccordionTableRow: FC<Props> = ({ tableData, index }) => {
  return (
    <>
  
    <tr>
      <td>
        <div className="form-check form-check-sm form-check-custom form-check-solid">
          {index}
        </div>
      </td>
      {tableData.map((data) => (
        <td>
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column">
              <a href="#" className="text-gray-800 text-hover-primary mb-1">
                {data.labName}
              </a>
            </div>
          </div>
        </td>
      ))}

      <td>
        <div className="d-flex justify-content-end flex-shrink-0">
          <div className="me-0" data-bs-toggle="tooltip" title="More Options">
            <button
              className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
            >
              <KTIcon iconName="plus" className="fs-3 me-3" />
            </button>
          </div>

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
                Delete Laboratory
              </a>
            </div>
          </DropDownButton>
        </div>
      </td>
    </tr> 
    <tr>
        <td colSpan={7}>
<TestTypesPriceTable className="" tableTitle="Price List">

</TestTypesPriceTable>
        </td>
    </tr>
     </>
  );
};

export { AccordionTableRow };
