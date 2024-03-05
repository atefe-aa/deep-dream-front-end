import { useEffect, useState } from "react";
import { useTestTypes } from "../../modules/settings/test-type-settings/hooks/useTestTypes";
import { areArraysEqual } from "../../utils/helper";
import { TestTypesModel } from "../../modules/settings/test-type-settings/core/_models";
import { useFilterChart } from "./FilterChartProvider";
import toast from "react-hot-toast";

type Props = {
  componentName: ComponentName;
};
type ComponentName = "lineChart" | "radarChart" | "barChart";
const TestTypeFilter: React.FC<Props> = ({ componentName }) => {
  const { state, updateState } = useFilterChart();
  const relevantState = state[componentName];

  const { isLoading, testTypes: testTypesList } =
    useTestTypes("noPaginate=true");

  const [testTypes, setTestTypes] = useState<number[]>(relevantState.testTypes);

  const [isAllTestTypes, setIsAllTestTypes] = useState(
    areArraysEqual(testTypesList, testTypes)
  );

  function HandleTestTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const { name, checked } = e.target;
    if (testTypes.length >= 10) {
      toast.error("You can select up to 10 test types.");
      return testTypes;
    }

    setTestTypes((prevtestTypes) => {
      if (checked) {
        return [...prevtestTypes, Number(name)];
      } else {
        return prevtestTypes.filter((item) => item !== Number(name));
      }
    });
  }
  useEffect(() => {
    const updatedFilters = {
      ...state,
      [componentName]: {
        ...relevantState,
        testTypes,
      },
    };
    
    localStorage.setItem("entityFilterState", JSON.stringify(updatedFilters));
  }, [testTypes]);

  function handleSelectAllTestTypes() {
    const allTestTypesIds = testTypesList.map((lab: TestTypesModel) => lab.id);

    setTestTypes(isAllTestTypes ? [] : allTestTypesIds);
    setIsAllTestTypes((isAll) => !isAll);
  }
  return (
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
              {!isLoading && testTypesList && (
                <div className="d-flex">
                  <div className="form-check form-check-custom form-check-solid">
                    <label className="form-label fw-bolder text-gray-800 fs-6">
                      <input
                        className="form-check-input me-3"
                        type="checkbox"
                        checked={isAllTestTypes}
                        onChange={handleSelectAllTestTypes}
                        name="allTestTypes"
                      />
                      Select All
                    </label>
                  </div>
                </div>
              )}

              {!isLoading &&
                testTypesList &&
                testTypesList.map((test: TestTypesModel) => (
                  <div className="d-flex" key={test.id}>
                    <div className="form-check form-check-custom form-check-solid">
                      <label className="form-label fw-bolder text-gray-800 fs-6">
                        <input
                          className="form-check-input me-3"
                          type="checkbox"
                          checked={testTypes.includes(test.id)}
                          onChange={HandleTestTypeChange}
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
  );
};
export { TestTypeFilter };
