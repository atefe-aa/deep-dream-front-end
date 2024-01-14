import { FC } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { AddNewTestPrice } from "../../../modules/settings/AddNewTestPrice";

type Props = {
  className: string;
  tableTitle: string;
  children: React.ReactNode;
};

const TestTypesPriceTable: FC<Props> = ({
  className,
  children,
  tableTitle,
}) => {
  return (
    <>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">{tableTitle}</span>
          </h3>
          <div
            className="card-toolbar"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-trigger="hover"
            title="Click to add a user"
          >
            <a
              href="#"
              className="btn btn-sm btn-light-primary"
              data-bs-toggle="modal"
              data-bs-target={`#kt_modal_add_new_test_price_${tableTitle.toLowerCase()}`}
            >
              <KTIcon iconName="plus" className="fs-3" />
              New Test Price
            </a>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className="card-body py-3">
          {/* begin::Table container */}
          <div className="table-responsive">
            {/* begin::Table */}
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bold text-muted">
                  <th className="w-25px">
                    <div className="form-check form-check-sm form-check-custom form-check-solid">
                      #
                    </div>
                  </th>
                  <th className="min-w-100px">Title</th>
                  <th className="min-w-100px">Price(R)</th>
                  <th className="min-w-100px">Extra Slides Price(R)</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>{children}</tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </>
  );
};

export { TestTypesPriceTable };
