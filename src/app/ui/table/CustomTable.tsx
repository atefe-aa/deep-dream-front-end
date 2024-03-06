import { FC } from "react";
import { KTIcon } from "../../../_metronic/helpers";

type Props = {
  className: string;
  children: React.ReactNode;
  modalId?: string;
  tableTitle?: string;
};

const CustomTable: FC<Props> = ({
  tableTitle,
  className,
  children,
  modalId,
}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h4>{tableTitle}</h4>
        {modalId && (
          <div
            className="card-toolbar"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-trigger="hover"
            title="Click to add a new row"
          >
            <a
              href="#"
              className="btn btn-sm btn-light-primary"
              data-bs-toggle="modal"
              // data-bs-target="#kt_modal_add_new_test_type"
              data-bs-target={`#${modalId}`}
            >
              <KTIcon iconName="plus" className="fs-3" />
              Add New
            </a>
          </div>
        )}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        {/* <div className="table-responsive"> */}
        <div>
          {/* begin::Table */}
          <table className="table text-center table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {children}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  );
};

export { CustomTable };
