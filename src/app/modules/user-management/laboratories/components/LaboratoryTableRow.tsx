import { FC } from "react";
import { KTIcon } from "../../../../../_metronic/helpers";
import { TestTypesPriceTableRow } from "../test-type-price-setting/components/TestTypesPriceTableRow";
import { LabsModel } from "../core/_models";
import clsx from "clsx";
import { randomState } from "../../../../utils/helper";
import { LABS_TESTS_DATA } from "../../../../utils/constants";
import { Dropdown } from "react-bootstrap";
import { CustomDropdown } from "../../../../ui/dropdown/CustomDropdown";
import { CustomTable } from "../../../../ui/table/CustomTable";
import { EditInfo } from "./modals/EditInfo";
import { EditMedia } from "./modals/EditMedia";

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
            <div className="me-2" data-bs-toggle="tooltip" title="Test info">
              <h2
                className="accordion-header"
                id={`heading_labsPanel_${labData.labName.toLowerCase()}`}
              >
                <button
                  className=" btn text-center btn-active-color-primary btn-bg-light btn-sm  btn-icon collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#kt_modal_add_new_test_price_${labData.labName.toLowerCase()}`}
                  aria-expanded="true"
                  aria-controls={`kt_modal_add_new_test_price_${labData.labName.toLowerCase()}`}
                >
                  <KTIcon iconName="plus" className="fs-3" />
                </button>
              </h2>
            </div>
            <CustomDropdown>
              <Dropdown.Item
                data-bs-toggle="modal"
                data-bs-target={`#edit_info${labData.id}`}
              >
                <KTIcon iconName="pencil" className="fs-3 me-3" />
                Edit Info
              </Dropdown.Item>
              <Dropdown.Item
                data-bs-toggle="modal"
                data-bs-target={`#edit_media${labData.id}`}
              >
                <KTIcon iconName="picture" className="fs-3 me-3" />
                Edit Media
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger "
                data-bs-toggle="modal"
                data-bs-target={`#confirm_delete${labData.id}`}
              >
                <KTIcon iconName="trash" className="fs-3 me-3" />
                Delete Laboratory
              </Dropdown.Item>
            </CustomDropdown>

            {/* modals */}
            <EditMedia labData={labData} />
            <EditInfo labData={labData} />
          </div>
        </td>
      </tr>

      <tr
        id={`labsPanel_${labData.id}`}
        className="accordion-collapse collapse "
      >
        <td className="" colSpan={7}>
          <CustomTable
            modalId={`kt_modal_add_new_test_price_${labData.labName.toLowerCase()}`}
            columns={[
              "Title",
              "Price(R)",
              "Extra Slides Price(R)",
              "Description",
            ]}
            className="bg-light border-info"
            tableTitle={labData.labName}
          >
            {LABS_TESTS_DATA[0].tests.map((test, index) => (
              <TestTypesPriceTableRow
                testTypeData={test}
                key={test.id}
                index={index + 1}
              />
            ))}
          </CustomTable>
        </td>
      </tr>
    </>
  );
};

export { LaboratoryTableRow };
