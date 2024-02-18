import { FC } from "react";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { PriceModel } from "../../core/_models";
import { ConfirmModal } from "../../../../../ui/modals/ConfirmModal";
import { CustomDropdown } from "../../../../../ui/dropdown/CustomDropdown";
import { Dropdown } from "react-bootstrap";
import { useDeletePrice } from "../hooks/useDeletePrice";


type Props = {
  priceData: PriceModel;
  index: number;
};

const TestTypesPriceTableRow: FC<Props> = ({ priceData, index }) => {

  const { isDeleting, deletePrice } = useDeletePrice();
  function handleDelete() {
    if(priceData.id)
    deletePrice(priceData.id);
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
            {priceData.testName}
          </a>
        </div>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {priceData.price && priceData.price.toLocaleString()}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {priceData.extraPrice && priceData.extraPrice.toLocaleString()}
        </a>
      </td>
      <td>
        <a
          href="#"
          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
        >
          {priceData.description}
        </a>
      </td>
      <td>
        <div className="d-flex justify-content-end flex-shrink-0">
        <CustomDropdown>
            <Dropdown.Item
              data-bs-toggle="modal"
              data-bs-target={`#edit_price_info${priceData.id}`}
            >
              <KTIcon iconName="pencil" className="fs-3 me-3" />
              Edit Info
            </Dropdown.Item>

            <Dropdown.Item
              className="text-danger "
              data-bs-toggle="modal"
              data-bs-target={`#confirm_delete_price${priceData.id}`}
            >
              <KTIcon iconName="trash" className="fs-3 me-3" />
              Delete Price
            </Dropdown.Item>
          </CustomDropdown>

            {/* modals */}
            <ConfirmModal
            actionName={`delete_price${priceData.id}`}
            onConfirm={handleDelete}
            isLoading={isDeleting}
            message={`Are you sure, you want to delete the price for ${priceData.testName}?`}
          />
        </div>
      </td>
    </tr>
  );
};

export { TestTypesPriceTableRow };
