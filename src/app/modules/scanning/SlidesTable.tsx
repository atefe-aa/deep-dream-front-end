import React from "react";

type Props = {
  className: string;
  children: React.ReactNode;
  handleSelectAllChange: Function;
  formik: any;
};

const SlidesTable: React.FC<Props> = ({
  className,
  children,
  handleSelectAllChange,
  formik,
}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-50px text-center">
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input
                      {...formik.getFieldProps("selectAll")}
                      className="form-check-input"
                      type="checkbox"
                      id="checkAll"
                      onChange={handleSelectAllChange}
                    />
                  </div>
                </th>
                <th className="min-w-50px text-center">Slide</th>
                <th className="min-w-80px text-center">Number</th>
                <th className="min-w-50px text-center">Test Type</th>
                <th className="min-w-50px text-center">Laboratory</th>
                <th className="min-w-50px text-center">Status</th>
                <th className="min-w-50px text-center">Actions</th>
                <th className="min-w-50px text-center">Slide Preview</th>
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
  );
};

export { SlidesTable };
