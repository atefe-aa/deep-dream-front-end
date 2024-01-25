import { FC } from "react";
import { KTIcon } from "../../../_metronic/helpers";
import { QueryRequestProvider } from "./QueryRequestProvider";
import { CustomHeader } from "./CustomHeader";
import { Search } from "../search-and-filter/Search";

type Props = {
  className: string;
  children: React.ReactNode;
  columns: Array<string>;
  modalId?: string;
  tableTitle?: string;
  accordionId?: string;
};

const CustomTable: FC<Props> = ({
  tableTitle,
  className,
  children,
  columns,
  modalId,
  accordionId,
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
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table text-center table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="w-25px">
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    #
                  </div>
                </th>
                {columns.map((col) => (
                  // <th key={col} className="min-w-50px">
                  //   {col}
                  // </th>
                  <CustomHeader
                    key={col}
                    className=""
                    title={col.toLocaleUpperCase()}
                    elementId={col.replace(" ", "-")}
                  />
                ))}
                <th className="min-w-100px text-center">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody
              className={accordionId ? "accordion" : ""}
              id={accordionId || undefined}
            >
              {children}
            </tbody>
            {/* end::Table body */}
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
