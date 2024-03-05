import { useEffect, useState } from "react";
import { useTestTypes } from "../../modules/settings/test-type-settings/hooks/useTestTypes";
import { TestTypesModel } from "../../modules/settings/test-type-settings/core/_models";
import { useFilterChart } from "./FilterChartProvider";
import toast from "react-hot-toast";
import { CHART_LIMIT } from "../../utils/constants";
import { SelectAll } from "./SelectAll";
import { ComponentName } from "./_models";
import { areArraysEqual } from "../../utils/helper";

type Props = {
  componentName: ComponentName;
};

const TestTypeFilter: React.FC<Props> = ({ componentName }) => {
  const { state, updateState } = useFilterChart();
  const relevantState = state[componentName];

  const { isLoading, testTypes: testTypesList } =
    useTestTypes("noPaginate=true");

  const [testTypes, setTestTypes] = useState<number[]>(relevantState.testTypes);

  function HandleTestTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const { name, checked } = e.target;
    if (testTypes.length >= CHART_LIMIT) {
      toast.error(`You can select up to ${CHART_LIMIT} test types.`);
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

  const [isSelectedAll, setIsSelectedAll] = useState(false);

  useEffect(() => {
    if (!isLoading && testTypesList) {
      setIsSelectedAll(
        areArraysEqual(
          testTypesList.map((lab: TestTypesModel) => lab.id),
          testTypes
        )
      );
    }
  }, [testTypes, testTypesList, isLoading, setIsSelectedAll]);

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

  return (
    <div className="mb-10">
      <label className="form-label fw-bold">Test Type:</label>

      <div className="accordion" id={`accordion_filter_test_type_${componentName}`}>
        <div className="accordion-item">
          <h2 className="accordion-header " id={`heading_filter_test_type_${componentName}`}>
            <button
              className="accordion-button h-30px collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse_filter_test_type_${componentName}`}
              aria-expanded="true"
              aria-controls={`collapse_filter_test_type_${componentName}`}
            >
              Test Types List
            </button>
          </h2>
          <div
            id={`collapse_filter_test_type_${componentName}`}
            className="accordion-collapse collapse h-150px scroll-y"
            aria-labelledby={`heading_filter_test_type_${componentName}`}
            data-bs-parent={`#accordion_filter_test_type_${componentName}`}
          >
            <div className="accordion-body">
              {!isLoading && testTypesList && (
                <SelectAll
                  setList={setTestTypes}
                  allList={testTypesList.map((test: TestTypesModel) => test.id)}
                  isSelectedAll={isSelectedAll}
                  setIsSelectedAll={setIsSelectedAll}
                />
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
