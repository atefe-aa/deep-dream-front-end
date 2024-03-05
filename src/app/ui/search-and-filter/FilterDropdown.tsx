import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { useState } from "react";
import type { Value } from "react-multi-date-picker";
import { LABS_TESTS_DATA, TEST_TYPES } from "../../utils/constants";
import { FilterState } from "./_models";
import { useLaboratories } from "../../modules/user-management/laboratories/hooks/useLaboratories";
import { useTestTypes } from "../../modules/settings/test-type-settings/hooks/useTestTypes";
import { useAuth } from "../../modules/auth";
import { hasRole } from "../../utils/helper";
import { TestTypesModel } from "../../modules/settings/test-type-settings/core/_models";
import { LabsModel } from "../../modules/user-management/laboratories/core/_models";
import { useFilterChart } from "./FilterChartProvider";
import toast from "react-hot-toast";
import { LabFilter } from "./LabFilter";
import { TestTypeFilter } from "./TestTypeFilter";
import { DateRangeFilter } from "./DateRangeFilter";

type Props = {
  filterTypes: Array<string>;
  componentName: ComponentName;
  onSubmit: (filters: FilterState) => void;
};

type ComponentName = "lineChart" | "radarChart" | "barChart";

const FilterDropdown: React.FC<Props> = ({
  filterTypes = [],
  componentName,
  onSubmit,
}) => {
  const { state, updateState } = useFilterChart();
  const relevantState = state[componentName];

  const { currentUser } = useAuth();

  const handleSubmit = () => {
    const savedState = localStorage.getItem("entityFilterState");
    const newFilter= savedState ? JSON.parse(savedState)[componentName] : relevantState;
    
    onSubmit(newFilter);

  };

  const handleReset = () => {
    const filters = {
      fromDate: "",
      toDate: "",
      laboratories: [],
      testTypes: [],
    };
    onSubmit(filters);
    updateState(componentName, filters);
  };

  return (
    <div
      className="menu menu-sub menu-sub-dropdown w-250px w-md-300px"
      data-kt-menu="true"
    >
      <div className="px-7 py-5">
        <div className="fs-5 text-gray-900 fw-bolder">Filter Options</div>
      </div>

      <div className="separator border-gray-200"></div>

      <div className="px-7 py-5">
        {currentUser &&
          hasRole(currentUser, ["superAdmin"]) &&
          filterTypes.find((filter) => filter === "lab") && (
            <LabFilter componentName={componentName} />
          )}

        {filterTypes.find((filter) => filter === "testType") &&
          currentUser &&
          hasRole(currentUser, "superAdmin") && (
            <TestTypeFilter componentName={componentName} />
          )}

        {filterTypes.find((filter) => filter === "date") && (
          <DateRangeFilter componentName={componentName} />
        )}

        <div className="d-flex justify-content-end">
          <button
            type="reset"
            className="btn btn-sm btn-light btn-active-light-primary me-2"
            data-kt-menu-dismiss="true"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            onClick={() => handleSubmit()}
            type="button"
            className="btn btn-sm btn-primary"
            data-kt-menu-dismiss="true"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
export { FilterDropdown };
