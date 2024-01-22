import { FC } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { DropDownButton } from "../../../../ui/dropdown/DropDownButton";
import { CustomTable } from "../../../../ui/table/CustomTable";
import { TestTypesPriceTableRow } from "../test-type-price-setting/components/TestTypesPriceTableRow";
import { LabsModel } from "../core/_models";
import clsx from "clsx";
import { randomState } from "../../../../utils/helper";

type Props = {
  labData: LabsModel;
  index: number;
};

const LaboratoryTableRow: FC<Props> = ({ labData, index }) => {
  const avatarState = randomState();

  return (
    <>
      <tr className="accordion-item">
        <td>
          <div className="form-check form-check-sm form-check-custom form-check-solid">
            {index}
          </div>
        </td>
        <td>
          <div className="d-flex align-items-center">
            {/* begin:: Avatar */}
            <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
              <a href="#">
                {labData.avatar ? (
                  <div className="symbol-label">
                    <img
                      src={labData.avatar}
                      alt={labData.labName}
                      className="w-100"
                    />
                  </div>
                ) : (
                  <div
                    className={clsx(
                      "symbol-label fs-3",
                      `bg-light-${avatarState}`,
                      `text-${avatarState}`
                    )}
                  >
                    {labData.labName[0]}
                  </div>
                )}
              </a>
            </div>
            <div className="d-flex flex-column">
              <a href="#" className="text-gray-800 text-hover-primary mb-1">
                {labData.labName}
              </a>
              <span>{labData.fullName}</span>
            </div>
          </div>
        </td>
        <td>
          <a href="#" className="badge badge-light fw-bolder">
            {labData.username}
          </a>
        </td>
        <td>
          <a
            href="#"
            className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
          >
            {labData.phone}
          </a>
        </td>
        <td>
          <a
            href="#"
            className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
          >
            {labData.address}
          </a>
        </td>
        <td>
          <a
            href="#"
            className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
          >
            {labData.description}
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
                  Delete Laboratory
                </a>
              </div>
            </DropDownButton>
          </div>
        </td>
      </tr>

      <tr
        id={`labsPanel_${labData.id}`}
        className="accordion-collapse collapse "
      >
        <td className="" colSpan={7}>
          {/* <CustomTable
            modalId={`kt_modal_add_new_test_price_${labData.labName.toLocaleLowerCase()}`}
            columns={[
              "Title",
              "Price(R)",
              "Extra Slides Price(R)",
              "Description",
            ]}
            className="bg-light border-info"
            tableTitle={labData.labName}
          >
            {labData.tests.map((test, index) => (
              <TestTypesPriceTableRow
                testTypeData={test}
                key={test.id}
                index={index + 1}
              />
            ))}
          </CustomTable> */}
        </td>
      </tr>
    </>
  );
};

export { LaboratoryTableRow };
