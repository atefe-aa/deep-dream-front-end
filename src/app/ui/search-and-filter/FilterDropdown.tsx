import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { useState } from "react";
import type { Value } from "react-multi-date-picker";
import { LABS_TESTS_DATA, TEST_TYPES } from "../../utils/constants";

type Props = {
  filters: Array<string>;
};

const FilterDropdown: React.FC<Props> = ({ filters = [] }) => {
  const [value, setValue] = useState<Value>();
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(value);
  }
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
        {filters.find((filter) => filter === "lab") && (
          <div className="mb-10">
            <label className="form-label fw-bold">Laboratory:</label>

            <div>
              <select
                className="form-select "
                data-kt-select2="true"
                data-placeholder="Select option"
                data-allow-clear="true"
                defaultValue={"1"}
              >
                <option>Choose Laboratory</option>
                {LABS_TESTS_DATA.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    {lab.labName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {filters.find((filter) => filter === "testType") && (
          <div className="mb-10">
            <label className="form-label fw-bold">Test Type:</label>

            <select className="form-select " aria-label="Select test type">
              <option>Choose test type</option>
              {TEST_TYPES.map((test) => (
                <option value={test.id} key={test.id}>
                  {test.code} - {test.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {filters.find((filter) => filter === "date") && (
          <div className="mb-10">
            <label className="form-label fw-bold">Date Range:</label>
            <DatePicker
              value={value}
              onChange={(date, options) => {
                setValue(options.validatedValue);
              }}
              calendar={persian}
              locale={persian_en}
              range
              calendarPosition="bottom-right"
            />
          </div>
        )}

        <div className="d-flex justify-content-end">
          <button
            type="reset"
            className="btn btn-sm btn-light btn-active-light-primary me-2"
            data-kt-menu-dismiss="true"
          >
            Reset
          </button>

          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
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
