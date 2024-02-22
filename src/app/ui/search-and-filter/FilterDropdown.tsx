import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { useState } from "react";
import type { Value } from "react-multi-date-picker";
import { LABS_TESTS_DATA, TEST_TYPES } from "../../utils/constants";
import { FilterState } from "./_models";

type Props = {
  filterTypes: Array<string>;
  componentName: string;
  onSubmit: (filters: FilterState) => void;
};

const FilterDropdown: React.FC<Props> = ({
  filterTypes = [],
  componentName,
  onSubmit,
}) => {
  const [dateRange, setDateRange] = useState<Value>();
  const [laboratories, setLaboratories] = useState<Array<number>>([]);
  const [testTypes, setTestTypes] = useState<number[]>([]);

  let filters = {
    fromDate: "",
    toDate: "",
    laboratories,
    testTypes,
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Array.isArray(dateRange) && dateRange.length === 2) {
      const [fromDate, toDate] = dateRange;

      filters = {
        ...filters,
        fromDate: fromDate.toString(),
        toDate: toDate.toString(),
      };
    }
    console.log(filters);
    onSubmit(filters);

    localStorage.setItem(componentName, JSON.stringify(filters));
  };

  function HandleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const { name, checked } = e.target;

    setLaboratories((prevlaboratories) => {
      if (checked) {
        return [...prevlaboratories, Number(name)];
      } else {
        return prevlaboratories.filter((item) => item !== Number(name));
      }
    });
  }

  function HandleTestTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const { name, checked } = e.target;

    setTestTypes((prevtestTypes) => {
      if (checked) {
        return [...prevtestTypes, Number(name)];
      } else {
        return prevtestTypes.filter((item) => item !== Number(name));
      }
    });
  }

  const handleReset = () => {
    // Reset the states
    setDateRange([]);
    setLaboratories([]);
    setTestTypes([]);
    filters = {
      fromDate: "",
      toDate: "",
      laboratories: [],
      testTypes: [],
    };
    onSubmit(filters);
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
        {filterTypes.find((filter) => filter === "lab") && (
          <div className="mb-10">
            <label className="form-label fw-bold">Laboratory:</label>
            <div className="accordion" id={`accordion_filter_labs`}>
              <div className="accordion-item">
                <h2 className="accordion-header " id={`heading_filter_labs`}>
                  <button
                    className="accordion-button h-30px collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse_filter_labs`}
                    aria-expanded="true"
                    aria-controls={`collapse_filter_labs`}
                  >
                    Laboratories List
                  </button>
                </h2>
                <div
                  id={`collapse_filter_labs`}
                  className="accordion-collapse collapse h-150px scroll-y"
                  aria-labelledby={`heading_filter_labs`}
                  data-bs-parent={`#accordion_filter_labs`}
                >
                  <div className="accordion-body">
                    {LABS_TESTS_DATA.map((lab) => (
                      <div className="d-flex" key={lab.id}>
                        <div className="form-check form-check-custom form-check-solid">
                          <label className="form-label fw-bolder text-gray-800 fs-6">
                            <input
                              className="form-check-input me-3"
                              type="checkbox"
                              checked={laboratories.includes(lab.id)}
                              onChange={HandleOnChange}
                              name={lab.id.toString()}
                            />
                            {lab.labName}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {filterTypes.find((filter) => filter === "testType") && (
          <div className="mb-10">
            <label className="form-label fw-bold">Test Type:</label>

            <div className="accordion" id={`accordion_filter_test_type`}>
              <div className="accordion-item">
                <h2
                  className="accordion-header "
                  id={`heading_filter_test_type`}
                >
                  <button
                    className="accordion-button h-30px collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse_filter_test_type`}
                    aria-expanded="true"
                    aria-controls={`collapse_filter_test_type`}
                  >
                    Test Types List
                  </button>
                </h2>
                <div
                  id={`collapse_filter_test_type`}
                  className="accordion-collapse collapse h-150px scroll-y"
                  aria-labelledby={`heading_filter_test_type`}
                  data-bs-parent={`#accordion_filter_test_type`}
                >
                  <div className="accordion-body">
                    {TEST_TYPES.map((test) => (
                      <div className="d-flex" key={test.id}>
                        <div className="form-check form-check-custom form-check-solid">
                          <label className="form-label fw-bolder text-gray-800 fs-6">
                            <input
                              className="form-check-input me-3"
                              type="checkbox"
                              checked={testTypes.includes(test.id)}
                              onChange={HandleOnChange}
                              name={test.id.toString()}
                            />
                            {test.title}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {filterTypes.find((filter) => filter === "date") && (
          <div className="mb-10">
            <label className="form-label fw-bold">Date Range:</label>
            <DatePicker
              value={dateRange}
              onChange={(date, options) => {
                setDateRange(options.validatedValue);
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
            onClick={handleReset}
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
