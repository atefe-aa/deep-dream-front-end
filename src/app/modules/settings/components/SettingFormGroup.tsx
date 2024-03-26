import toast from "react-hot-toast";
import { KTIcon } from "../../../../_metronic/helpers";
import { useSettings } from "../machine-settings/hooks/useSettings";
import { useUpdateSetting } from "../machine-settings/hooks/useUpdateSetting";
import { useState } from "react";

type Props = {
  label: string;
  type: string;
  placeHolder: string;
  inputName: string;
  required?: boolean;
  value?: number;
  unit?: string;
  id: number;
};

const SettingFormGroup: React.FC<Props> = ({
  required = true,
  label,
  type,
  placeHolder,
  inputName,
  value,
  unit,
  id,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const { isUpdating, updateSetting } = useUpdateSetting();
  function handleUpdateSetting(e: any) {
    e.preventDefault();

    if (!inputValue) return;

    if (unit === "%" && (Number(inputValue) > 100 || Number(inputValue) < 0)) {
      toast.error("Percentage must be a number between 0 and 100.");
      return;
    }

    updateSetting({ value: inputValue, id });
  }

  let inputProps = {
    type: type,
    // disabled: isUpdating,
    className: "form-control mb-3 mb-lg-0",
    placeholder: placeHolder,
    name: inputName,
    id: inputName,
    step: "any",
  };
  return (
    <div className="row mb-6">
      <label
        htmlFor={inputName}
        className={`col-lg-3 col-form-label  fw-bold fs-6 ${
          required ? "required" : ""
        }`}
      >
        {label}
      </label>

      <div className="col-lg-7 col-6">
        <div className="row">
          <div className="fv-row">
            <input
              {...inputProps}
              defaultValue={inputValue}
              inputMode="numeric"
              onChange={(e) => setInputValue(Number(e.target.value))}
              onBlur={(e) => handleUpdateSetting(e)}
            />
          </div>
        </div>
      </div>
      <div className="col-form-label col-3 col-lg-1 fw-bold fs-8">{unit}</div>
      {/* <button
        className=" btn col-1 col-lg-1 fw-bold"
        onClick={(e: any) => handleUpdateSetting(e)}
      >
        <KTIcon className="fs-1  text-primary " iconName="check-circle" />
      </button> */}
    </div>
  );
};

export default SettingFormGroup;
