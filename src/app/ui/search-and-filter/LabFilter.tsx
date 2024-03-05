import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { useEffect, useState } from "react";
import type { Value } from "react-multi-date-picker";
import { LABS_TESTS_DATA, TEST_TYPES } from "../../utils/constants";
import { FilterState } from "./_models";
import { useLaboratories } from "../../modules/user-management/laboratories/hooks/useLaboratories";
import { useTestTypes } from "../../modules/settings/test-type-settings/hooks/useTestTypes";
import { useAuth } from "../../modules/auth";
import { areArraysEqual, hasRole } from "../../utils/helper";
import { TestTypesModel } from "../../modules/settings/test-type-settings/core/_models";
import { LabsModel } from "../../modules/user-management/laboratories/core/_models";
import { useFilterChart } from "./FilterChartProvider";
import toast from "react-hot-toast";

type Props = {
  componentName: ComponentName;
};
type ComponentName = "lineChart" | "radarChart" | "barChart";

const LabFilter: React.FC<Props> = ({ componentName }) => {
  const { state, updateState } = useFilterChart();
  const relevantState = state[componentName];

  const { isLoading: isLoadingLaboratories, laboratories: labsList } =
    useLaboratories("noPaginate=true");

  const [laboratories, setLaboratories] = useState<Array<number>>(
    relevantState.laboratories
  );

  const [isAllLabs, setIsAllLabs] = useState(
    areArraysEqual(labsList, laboratories)
  );

  function HandleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const { name, checked } = e.target;
    if (laboratories.length >= 10) {
      toast.error("You can select up to 10 laboratories.");
      return laboratories;
    }
    const inArray = laboratories.includes(Number(name));

    let newLabs = [...laboratories];
    setLaboratories((prevlaboratories) => {
      if (!inArray) {
        newLabs = [...prevlaboratories, Number(name)];
      } else {
        newLabs = prevlaboratories.filter((item) => item !== Number(name));
      }
      return newLabs;
    });
  }
  useEffect(() => {
    const updatedFilters = {
      ...state,
      [componentName]: {
        ...relevantState,
        laboratories,
      },
    };
    localStorage.setItem("entityFilterState", JSON.stringify(updatedFilters));
  }, [laboratories]);

  function handleSelectAllLabs() {
    const allLabsIds = labsList.map((lab: LabsModel) => lab.id);

    setLaboratories(isAllLabs ? [] : allLabsIds);
    setIsAllLabs((isAll) => !isAll);
  }
  return (
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
              {!isLoadingLaboratories && labsList && (
                <div className="d-flex">
                  <div className="form-check form-check-custom form-check-solid">
                    <label className="form-label fw-bolder text-gray-800 fs-6">
                      <input
                        className="form-check-input me-3"
                        type="checkbox"
                        checked={isAllLabs}
                        onChange={handleSelectAllLabs}
                        name="allLabs"
                      />
                      Select All
                    </label>
                  </div>
                </div>
              )}
              {!isLoadingLaboratories &&
                labsList &&
                labsList.map((lab: LabsModel) => (
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
  );
};
export { LabFilter };
