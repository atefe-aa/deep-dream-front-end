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

  const [counsellors, setCounsellors] = useState<number[]>([]);

  // function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   console.log(counsellors);
  // }

  function HandleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;

    setCounsellors((prevCounsellors) => {
      if (checked) {
        return [...prevCounsellors, Number(name)];
      } else {
        return prevCounsellors.filter((item) => item !== Number(name));
      }
    });
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
            <div className="accordion" id={`accordion_filter`}>
                <div className="accordion-item">
                  <h2 className="accordion-header " id={`heading_filter`}>
                    <button
                      className="accordion-button h-30px collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse_filter`}
                      aria-expanded="true"
                      aria-controls={`collapse_filter`}
                    >
                      Laboratories List
                    </button>
                  </h2>
                  <div
                    id={`collapse_filter`}
                    className="accordion-collapse collapse h-150px scroll-y"
                    aria-labelledby={`heading_filter`}
                    data-bs-parent={`#accordion_filter`}
                  >
                    <div className="accordion-body">
                      {LABS_TESTS_DATA.map((lab) => (
                        <div
                          className="d-flex"
                          key={lab.id}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="form-check form-check-custom form-check-solid">
                            <label className="form-label fw-bolder text-gray-800 fs-6">
                              <input
                                className="form-check-input me-3"
                                type="checkbox"
                                checked={counsellors.includes(lab.id)}
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

        {filters.find((filter) => filter === "testType") && (
          <div className="mb-10">
            <label className="form-label fw-bold">Test Type:</label>

            <div className="accordion" id={`accordion_filter_test_type`}>
                <div className="accordion-item">
                  <h2 className="accordion-header " id={`heading_filter_test_type`}>
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
                        <div
                          className="d-flex"
                          key={test.id}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="form-check form-check-custom form-check-solid">
                            <label className="form-label fw-bolder text-gray-800 fs-6">
                              <input
                                className="form-check-input me-3"
                                type="checkbox"
                                checked={counsellors.includes(test.id)}
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
