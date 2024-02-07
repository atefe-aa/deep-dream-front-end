type Props = {
  label: string;
  type: string;
  placeHolder: string;
  inputName: string;
  formik?: any;
  required?: boolean;
  value?: number;
  unit?: string;
  isLoading?: boolean;
  handleBlur?: Function;
  id?: number;
};

const SettingFormGroup: React.FC<Props> = ({
  required = true,
  label,
  type,
  placeHolder,
  inputName,
  formik,
  value,
  unit,
  isLoading,
  handleBlur,
  id,
}) => {
  let inputProps = {
    ...(formik && formik.getFieldProps(inputName)), // Spread formik props if formik is provided
    ...(value !== undefined && { defaultValue:value }), // Only add value prop if value is provided
    type: type,
    disabled: isLoading,
    className: "form-control mb-3 mb-lg-0",
    placeholder: placeHolder,
    name: inputName,
    id: inputName,
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

      <div className="col-lg-7 col-9">
        <div className="row">
          <div className="fv-row">
            <input
              {...inputProps}
              onBlur={(e: any) => handleBlur && handleBlur(e, id)}
            />{" "}
            {/* Use inputProps here */}
            {formik?.touched[inputName] && formik?.errors[inputName] && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors[inputName]}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-form-label col-3 col-lg-2 fw-bold fs-8">{unit}</div>
    </div>
  );
};

export default SettingFormGroup;
