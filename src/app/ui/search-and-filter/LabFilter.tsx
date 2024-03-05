import { useEffect, useState } from "react";
import { useLaboratories } from "../../modules/user-management/laboratories/hooks/useLaboratories";
import { LabsModel } from "../../modules/user-management/laboratories/core/_models";
import { useFilterChart } from "./FilterChartProvider";
import toast from "react-hot-toast";
import { SelectAll } from "./SelectAll";
import { CHART_LIMIT } from "../../utils/constants";
import { ComponentName } from "./_models";
import { areArraysEqual } from "../../utils/helper";

type Props = {
  componentName: ComponentName;
};

const LabFilter: React.FC<Props> = ({ componentName }) => {
  const { state, updateState } = useFilterChart();
  const relevantState = state[componentName];

  const { isLoading: isLoadingLaboratories, laboratories: labsList } =
    useLaboratories("noPaginate=true");

  const [laboratories, setLaboratories] = useState<Array<number>>(
    relevantState.laboratories
  );

  const [isSelectedAll, setIsSelectedAll] = useState(false);

  useEffect(() => {
    if (!isLoadingLaboratories && labsList) {
      setIsSelectedAll(
        areArraysEqual(
          labsList.map((lab: LabsModel) => lab.id),
          laboratories
        )
      );
    }
  }, [labsList, laboratories, isLoadingLaboratories, setIsSelectedAll]);

  function HandleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const { name, checked } = e.target;
    if (checked && laboratories.length >= CHART_LIMIT) {
      toast.error(`You can select up to ${CHART_LIMIT} laboratories.`);
      return laboratories;
    }
    let newLabs = [...laboratories];
    setLaboratories((prevlaboratories) => {
      if (checked) {
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
                <SelectAll
                  setList={setLaboratories}
                  allList={labsList.map((lab: LabsModel) => lab.id)}
                  isSelectedAll={isSelectedAll}
                  setIsSelectedAll={setIsSelectedAll}
                />
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
