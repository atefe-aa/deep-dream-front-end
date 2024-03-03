import { FC } from "react";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { LabDataModel, LabsModel, PriceModel } from "../../core/_models";
import { ConfirmModal } from "../../../../../ui/modals/ConfirmModal";
import { CustomDropdown } from "../../../../../ui/dropdown/CustomDropdown";
import { Dropdown, Spinner } from "react-bootstrap";
import { useDeletePrice } from "../hooks/useDeletePrice";
import { EditPrice } from "./UpdatePrice";
import { usePrice } from "../hooks/usePrice";

type Props = {
  priceId: number;
  index: number;
  labData: LabsModel;
};

const TestTypesPriceTableRow: FC<Props> = ({ priceId, index, labData }) => {
  const { isLoading, price: priceData } = usePrice(priceId);
  const { isDeleting, deletePrice } = useDeletePrice();
  function handleDelete() {
    if (priceId) deletePrice(priceId);
  }
  return (
    <>
      {isLoading && (
        <tr>
          <td colSpan={20} className="text-center">
            <span className="text-muted"> Loading...</span>
            <Spinner animation="border" size="sm" />
          </td>
        </tr>
      )}
      {!isLoading && priceData && (
        <tr>
          <td>
            <div className="form-check form-check-sm form-check-custom form-check-solid">
              {index}
            </div>
          </td>
          <td>
            <div className="d-flex justify-content-start flex-column">
              <div className="text-gray-900 fw-bold text-hover-primary fs-6">
                {priceData.testName}
              </div>
            </div>
          </td>
          <td>
            <div className="text-gray-900 fw-bold text-hover-primary d-block fs-6">
              {priceData.price && priceData.price.toLocaleString()}
            </div>
          </td>
          <td>
            <div className="text-gray-900 fw-bold text-hover-primary d-block fs-6">
              {priceData.extraPrice && priceData.extraPrice.toLocaleString()}
            </div>
          </td>
          <td>
            <div className="text-gray-900 fw-bold text-hover-primary d-block fs-6">
              {priceData.description}
            </div>
          </td>
          <td>
            <div className="d-flex justify-content-end flex-shrink-0">
              <CustomDropdown>
                <Dropdown.Item
                  data-bs-toggle="modal"
                  data-bs-target={`#edit_price_info${priceId}`}
                >
                  <KTIcon iconName="pencil" className="fs-3 me-3" />
                  Edit Info
                </Dropdown.Item>

                <Dropdown.Item
                  className="text-danger "
                  data-bs-toggle="modal"
                  data-bs-target={`#confirm_delete_price${priceId}`}
                >
                  <KTIcon iconName="trash" className="fs-3 me-3" />
                  Delete Price
                </Dropdown.Item>
              </CustomDropdown>

              {/* modals */}
              <ConfirmModal
                actionName={`delete_price${priceId}`}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                message={`Are you sure, you want to delete the price for ${priceData.testName}?`}
              />
              <EditPrice priceId={priceId} labData={labData} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export { TestTypesPriceTableRow };
