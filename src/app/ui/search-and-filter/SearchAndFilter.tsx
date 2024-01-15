import { FC } from "react";
import { useLayout } from "../../../_metronic/layout/core";
import { Dropdown1, Search } from "../../../_metronic/partials";
import { KTIcon } from "../../../_metronic/helpers";
import { FilterDropdown } from "./FilterDropdown";

const SearchAndFilter: FC = () => {
  return (
    <div className="row mt-5">
      <div className="d-flex col col-12 col-md-4">
        {/* Full width on mobile, 25% on desktop */}
        <Search />
        {/* begin::Filter */}
        <div className="flex-shrink-0 ms-2">
          {/* begin::Menu toggle */}
          <button
            type="button"
            className="btn btn-icon btn-bg-light btn-active-icon-primary btn-color-gray-500"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
          >
            <KTIcon iconName="filter" className="fs-2" />
          </button>
          {/* end::Menu toggle */}
          <FilterDropdown filters={['date','lab','testType']} />
        </div>
        {/* end::Filter */}
      </div>
    </div>
  );
};

export { SearchAndFilter };
