import React from "react";

type Props = {
  className: string;
  children: React.ReactNode;
};

const SlidesTable: React.FC<Props> = ({ className, children}) => {
 
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
                <th className="min-w-50px">Slide</th>
                <th className="min-w-50px">Number</th>
                <th className="min-w-0px">Test Type</th>
                <th className="min-w-50px">Status</th>
                <th className="min-w-50px text-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
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

export { SlidesTable };
