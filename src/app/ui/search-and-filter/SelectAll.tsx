import { Dispatch, SetStateAction, useState } from "react";
import { CHART_LIMIT } from "../../utils/constants";

type Props = {
  allList: any[];
  isSelectedAll: boolean;
  setList: Dispatch<SetStateAction<number[]>>;
  setIsSelectedAll: Dispatch<SetStateAction<boolean>>;
};

const SelectAll: React.FC<Props> = ({
  isSelectedAll,
  setIsSelectedAll,
  allList,
  setList,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (allList.length > CHART_LIMIT) return;

    setIsSelectedAll(e.target.checked);

    if (e.target.checked) {
      setList(allList);
    } else {
      setList([]);
    }
  };

  return (
    <>
      <div className="d-flex">
        <div className="form-check form-check-custom form-check-solid">
          <label className="form-label fw-bolder text-gray-800 fs-6">
            <input
              className="form-check-input me-3"
              type="checkbox"
              checked={isSelectedAll}
              onChange={handleChange}
              name="allLabs"
              disabled={allList.length > CHART_LIMIT}
            />
            Select All
          </label>
        </div>
      </div>
      <hr />
    </>
  );
};

export { SelectAll };
